import openApi3 from './schema/open-api-3.1.1.json';
// import {editor} from "monaco-editor/esm/vs/editor/editor.api";
// import ITextModel = editor.ITextModel;

export const getOpenAPI30Schema = (modelUri: string) => [
  {
    uri: 'http://myserver/foo-schema.json', // id of the first schema
    fileMatch: [modelUri], // associate with our model
    schema: openApi3,
  },
];
