import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import { PiTrashDuotone } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { IoTerminal } from "react-icons/io5";
import { VscRunAll } from "react-icons/vsc";
import Terminal from "./Terminal";

const slideDown = keyframes`

 from {

 transform: translateY(100%);

 }

 to {

 transform: translateY(0);

 }

`;

const slideUp = keyframes`

 from {

 transform: translateY(0);

 }

 to {

 transform: translateY(100%);

 }

`;

const Container = styled.div`

 width: 37.5%;

 height: 100%;

 display: flex;

 flex-direction: column;

 background-color: white;

 border-radius: 10px;

`;

const Header = styled.div`

 width: 100%;

 height: 15%;

 display: flex;

 padding: 2%;

`;

const HeaderLeft = styled.div`

 width: 50%;

 height: 100%;

 display: flex;

 align-items: center;

 font-size: 45px;

 font-weight: bold;

`;

const HeaderRight = styled.div`

 width: 50%;

 height: 100%;

 display: flex;

 align-items: center;

 justify-content: flex-end;

`;

const Main = styled.div`

 width: 100%;

 height: 85%;

 position: relative;

 overflow: hidden;

`;

const EditorWrapper = styled.div`

 width: 100%;

 height: 100%;

 position: relative;

`;

const TerminalWrapper = styled.div`

 width: 100%;

 height: 30%;

 position: absolute;

 bottom: 0;

 left: 0;

 right: 0;

 animation: ${props => props.isOpen ? slideDown : slideUp} 0.3s ease-out forwards;

 display: ${props => props.isVisible ? 'block' : 'none'};

 z-index: 10;

`;

const IconButton = styled.div`

 cursor: pointer;

 margin-right: 3%;

 display: flex;

 align-items: center;

 justify-content: center;

 &:hover {

 opacity: 0.7;

 }

`;

const EditorArea = ({ fileContent, setFileContent }) => {
  const [editorContent, setEditorContent] = useState('');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const language = useSelector((state) => state.language);


  // fileContent가 변경될 때마다 에디터 내용 업데이트
  useEffect(() => {
    console.log('EditorArea: Received fileContent:', fileContent);
    if (fileContent !== undefined && fileContent !== null) {
      setEditorContent(fileContent);
    }
  }, [fileContent]);


  useEffect(() => {
    if (terminalOpen) {
      setTerminalVisible(true);
    } else {
      const timer = setTimeout(() => setTerminalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [terminalOpen]);

  const getEditorMode = () => {
    switch (language.toLowerCase()) {
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'javascript':
        return 'javascript';
      default:
        return 'text';
    }
  };

  const handleChange = (newValue) => {
    console.log('EditorArea: Content changed:', newValue);
    setEditorContent(newValue);
    if (setFileContent && typeof setFileContent === 'function') {
      setFileContent(newValue);
    }
  };


  return (
    <Container>
      <Header>
        <HeaderLeft>
          <span>{'Untitled'}</span>
          <MdOutlineEdit style={{margin: "2% 0 0 2%"}} fontSize={40}/>
        </HeaderLeft>
        <HeaderRight>
          <VscRunAll
            fontSize={50}
            color="green"
            style={{cursor: 'pointer', marginRight:"3%"}}
          />
          <IoTerminal 
            fontSize={50}
            style={{cursor: 'pointer', marginRight:"3%"}}
            onClick={() => setTerminalOpen(!terminalOpen)}
          />
          <PiTrashDuotone fontSize={50}/>
        </HeaderRight>
      </Header>
      <Main>
        <EditorWrapper>
          <AceEditor
            mode={getEditorMode()}
            theme="textmate"
            name="editor"
            fontSize={16}
            value={editorContent}  // fileContent가 아닌 editorContent 사용
            onChange={handleChange}
            width="100%"
            height="100%"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            editorProps={{ $blockScrolling: true }}
          />
          {terminalVisible && (
            <TerminalWrapper isOpen={terminalOpen} isVisible={terminalVisible}>
              <Terminal />
            </TerminalWrapper>
          )}
        </EditorWrapper>
      </Main>
    </Container>
  );
};

export default EditorArea;