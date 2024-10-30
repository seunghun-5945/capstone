import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import io from "socket.io-client";
import { MdOutlineEdit } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import { IoTerminal } from "react-icons/io5";
import { PiTrashDuotone } from "react-icons/pi";
import Terminal from "react-console-emulator";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";

const Container = styled.div`
  width: 37.5%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  background-color: #f5f5f5;
  border-radius: 10px 10px 0 0;
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
  background-color: #2d2d2d;
  border-radius: 0 0 10px 10px;
`;

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.isTerminalVisible ? "70%" : "100%")};
`;

const SuggestionText = styled.div`
  position: absolute;
  color: #666;
  opacity: 0.8;
  pointer-events: none;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 16px;
  white-space: pre;
  background: transparent;
  padding: 0 4px;
  z-index: 100;
`;

const TerminalWrapper = styled.div`
  width: 100%;
  height: 30%;
  background-color: black;
  border-radius: 0 0 10px 10px;
`;

const EditorArea = () => {
  const [code, setCode] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ row: 0, column: 0 });
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    console.log("소켓 연결 시도...");
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("소켓 연결 성공!");
    });

    socketRef.current.on("codeSuggestion", (suggestionText) => {
      console.log("코드 제안 받음:", suggestionText);
      setSuggestion(suggestionText);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && suggestion) {
      const editor = editorRef.current.editor;
      const session = editor.getSession();
      const position = editor.getCursorPosition();

      // 가상의 마커 생성
      const marker = {
        type: "text",
        value: suggestion,
        position: position,
        inFront: true,
      };

      session.addDynamicMarker(marker, true);

      // Tab 키 커맨드 추가
      editor.commands.addCommand({
        name: "acceptSuggestion",
        bindKey: { win: "Tab", mac: "Tab" },
        exec: function (editor) {
          if (suggestion) {
            session.insert(position, suggestion);
            setSuggestion("");
          }
        },
      });
    }
  }, [suggestion]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (socketRef.current && socketRef.current.connected) {
        const editor = editorRef.current.editor;
        const position = editor.getCursorPosition();
        const session = editor.getSession();
        const currentLine = session.getLine(position.row);

        console.log("코드 제안 요청 전송");
        socketRef.current.emit("codeChange", {
          code: newCode,
          line: currentLine,
          position: position,
        });
      }
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab" && suggestion) {
      event.preventDefault();

      const editor = editorRef.current.editor;
      const session = editor.getSession();
      const position = editor.getCursorPosition();

      // 제안된 코드 삽입
      session.insert(position, suggestion);

      // 상태 업데이트
      setCode(session.getValue());
      setSuggestion("");

      // 포커스 유지
      editor.focus();
    }
  };

  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };

  const commands = {
    echo: {
      description: "Echo a passed string.",
      usage: "echo <string>",
      fn: (...args) => args.join(" "),
    },
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <span>main.py</span>
          <MdOutlineEdit style={{ margin: "2% 0 0 2%" }} fontSize={40} />
        </HeaderLeft>
        <HeaderRight>
          <VscRunAll
            fontSize={50}
            color="green"
            onClick={toggleTerminal}
            style={{ cursor: "pointer", marginRight: "3%" }}
          />
          <IoTerminal
            fontSize={50}
            onClick={toggleTerminal}
            style={{ cursor: "pointer", marginRight: "3%" }}
          />
          <PiTrashDuotone fontSize={50} />
        </HeaderRight>
      </Header>
      <Main>
        <EditorWrapper isTerminalVisible={isTerminalVisible}>
          <AceEditor
            ref={editorRef}
            mode="python"
            theme="monokai"
            value={code}
            onChange={handleCodeChange}
            onCursorChange={(selection) => {
              setCursorPosition(selection.cursor);
            }}
            onKeyDown={handleKeyDown}
            name="editor"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0 0 10px 10px",
            }}
            fontSize={16}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              useSoftTabs: true,
            }}
            editorProps={{ $blockScrolling: true }}
          />
          {suggestion && (
            <SuggestionText
              style={{
                top: `${cursorPosition.row * 19 + 4}px`,
                left: `${cursorPosition.column * 8 + 50}px`,
              }}
            >
              {suggestion}
            </SuggestionText>
          )}
        </EditorWrapper>
        <TerminalWrapper isVisible={isTerminalVisible}>
          <Terminal
            commands={commands}
            style={{
              height: "100%",
              overflow: "auto",
              backgroundColor: "black",
              borderRadius: "0 0 10px 10px",
            }}
          />
        </TerminalWrapper>
      </Main>
    </Container>
  );
};

export default EditorArea;
