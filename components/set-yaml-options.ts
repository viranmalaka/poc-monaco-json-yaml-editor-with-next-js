import {Environment, editor, languages, Uri} from "monaco-editor";
import {setDiagnosticsOptions} from "monaco-yaml";
import {getOpenAPI30Schema} from "./schema-config";
import Yaml from "yaml";
import IModel = editor.IModel;
import ITextModel = editor.ITextModel;

let stripJson = {
  openapi: '3.0.0',
  info: {
    title: 'my new spec',
    version: '1.0',
    description: 'this is something new',
  },
  paths: {
    "/v1/3d_secure": {
      post: {
        responses: {}
      }
    }
  }
}

declare global {
  interface Window {
    MonacoEnvironment: Environment;
  }
}

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
      case 'json':
        return new Worker(
          new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url),
        );
      case 'yaml':
        return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url));
      default:
        throw new Error(`Unknown label ${label}`);
    }
  },
};

export const modals = {
  json: editor.createModel(JSON.stringify(stripJson, null, 2), 'json', Uri.parse('a://b/open-api3.json')),
  yaml: editor.createModel(Yaml.stringify(stripJson), 'yaml', Uri.parse('a://b/open-api3.yaml')),
}

export const updateAndGetModal = (type: keyof typeof modals) => {
  try {
    if (type === 'json') {
      modals.json.setValue(JSON.stringify(stripJson, null, 2));
      return modals.json;
    }
    modals.yaml.setValue(Yaml.stringify(stripJson));
    return modals.yaml;
  } catch (e) {
    console.log('failed to parse')
  }
}

languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: getOpenAPI30Schema(modals.json.uri.toString()),
});


setDiagnosticsOptions({
  validate: true,
  enableSchemaRequest: true,
  format: true,
  hover: true,
  completion: true,
// @ts-ignore
  schemas: getOpenAPI30Schema(modals.yaml.uri.toString()),
});

export const onModelContentChange = (modal: ITextModel | null, content: string) => {
  try {
    if (modal === modals.yaml) {
      stripJson = Yaml.parse(content);
    } else if (modal === modals.json) {
      stripJson = JSON.parse(content);
    }
  } catch (e) {
    console.log('failed to parase');
  }
}