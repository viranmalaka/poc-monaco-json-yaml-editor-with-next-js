import {editor} from "monaco-editor";
import {modals, onModelContentChange, updateAndGetModal} from "./set-yaml-options";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import React from "react";

export let editorInstance: IStandaloneCodeEditor;

export default function MonacoEditor() {
  return (
    <div className="d-flex" style={{width: '100%'}}>
      <div className="flex">
        <div
          id="editor" style={{width: 800, height: '90vh', border: '1px solid #d9d9d9'}}
          ref={(node) => {
            editorInstance = editor.create(node!, {
              fontSize: 15,
              model: modals.json,
            });
            editorInstance.onDidChangeModelContent(event => {
              onModelContentChange(editorInstance.getModel(), editorInstance.getValue())
            });
          }}
        />
      </div>
      <div className="flex">
        <button onClick={() => {
          editorInstance.setModel(updateAndGetModal('yaml'))
        }}>set yaml</button>
        <button onClick={() => {
          editorInstance.setModel(updateAndGetModal('json'));
        }}>set json</button>
      </div>
    </div>

  )
}