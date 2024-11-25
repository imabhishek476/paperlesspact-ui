'use client';
import React, { useEffect, useRef, useState } from 'react';
import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import ToolbarPlugin from '../Lexical/ToolbarPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import PlaygroundEditorTheme from '../Lexical/themes/PlaygroundEditorTheme';
import PlaygroundNodes from '../Lexical/PlaygroundNodes';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import LinkPlugin from '../Lexical/LinkPlugin';

const LexicalEditor = ({ editorRef ,initialConfig, handleOnChange}) => {
  const text = 'Enter some text...';
  const placeholder = text;
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  // const editorRef = useRef(null)
  // console.log(editorRef)


  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
    });
  }
  // function MyCustomAutoFocusPlugin() {

  //     const [editor] = useLexicalComposerContext();
  //     useEffect(() => {
  //         // Focus the editor when the effect fires!
  //         editor.focus();
  //     }, [editor]);

  //     return null;
  // }
  return (
    <div className="lg:py-20 py-10">
      <div className="container !w-full relative">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable className="p-5" />
                </div>
              </div>
            }
            placeholder={
              <div className="absolute top-5 left-5">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <EditorRefPlugin editorRef={editorRef} />
          <OnChangePlugin onChange={handleOnChange} />
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <LinkPlugin />

          {/* <MyCustomAutoFocusPlugin /> */}
        </LexicalComposer>
      </div>
    </div>
  );
};

export default LexicalEditor;
