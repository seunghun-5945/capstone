import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
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

const EditorArea = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [fileContent, setFileContent] = useState(''); // 파일 내용 상태 추가

  useEffect(() => {
    if (terminalOpen) {
      setTerminalVisible(true);
    } else {
      const timer = setTimeout(() => setTerminalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [terminalOpen]);

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <span>main.py</span>
          <MdOutlineEdit 
            style={{margin: "2% 0 0 2%"}}
            fontSize={40}/>
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
          <PiTrashDuotone 
            fontSize={50}/>
        </HeaderRight>
      </Header>
      <Main>
        <EditorWrapper>
          <AceEditor
            fontSize={16}
            style={{width: "100%", height: "100%", borderRadius: "0 0 10px 10px"}}
            mode="python"
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            editorProps={{ $blockScrolling: true }}
            value={fileContent} // AceEditor에 파일 내용 설정
            onChange={(newValue) => setFileContent(newValue)} // 내용 변경 시 상태 업데이트
          />
          {terminalVisible && 
            <TerminalWrapper isOpen={terminalOpen} isVisible={terminalVisible}>
              <Terminal />
            </TerminalWrapper>
          }
        </EditorWrapper>
      </Main>
    </Container>
  );
};

export default EditorArea;
