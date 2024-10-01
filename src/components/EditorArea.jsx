import React, { useState } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";  // 자동완성 기능을 위한 확장 도구
import Terminal from 'react-console-emulator';
import { PiTrashDuotone } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { IoTerminal } from "react-icons/io5";

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
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TerminalWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.isVisible ? '30%' : '0'};
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 0px 0px 10px 10px;
  z-index: 1000;
`;

const EditorArea = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);

  const commands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
  };

  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <span>main.py</span>
          <MdOutlineEdit 
            style={{border: "", margin: "2% 0 0 2%"}}
            fontSize={40}/>
        </HeaderLeft>
        <HeaderRight>
          <IoTerminal 
            fontSize={50}
            onClick={toggleTerminal}
            style={{cursor: 'pointer'}}
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
            mode="python"  // 파이썬 모드 활성화
            theme="monokai"
            enableBasicAutocompletion={true}  // 기본 자동완성 기능 활성화
            enableLiveAutocompletion={true}   // 실시간 자동완성 기능 활성화
            enableSnippets={true}             // 코드 스니펫 기능 활성화
            editorProps={{ $blockScrolling: true }}
          />
        </EditorWrapper>
        <TerminalWrapper isVisible={isTerminalVisible}>
          <Terminal
            commands={commands}
            welcomeMessage={'W:IDE 터미널에 오신것을 환영합니다. 도움말은 help 를 입력하세요'}
            promptLabel={'user@react-terminal:~$'}
            style={{width: '100%', height: '100%', borderRadius:"0 0 0 0"}}
          />
        </TerminalWrapper>
      </Main>
    </Container>
  );
};

export default EditorArea;
