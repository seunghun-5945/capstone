import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TerminalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000;
  color: #00ff00;
  font-family: monospace;
  padding: 10px;
  overflow-y: auto;
  border-radius: 0  0 10px 10px;
`;

const MessageLine = styled.div`
  white-space: pre-wrap; // 줄바꿈이 HTML에서 제대로 표시되도록 설정
  font-weight: 500; // 글씨체 굵게 설정
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center; // 수평으로 중앙 정렬
`;

const Prompt = styled.span`
  margin-right: 5px;
  color: #00ff00; // 프롬프트 색상
`;

const Input = styled.input`
  background-color: #000;
  color: #00ff00;
  border: none;
  width: 100%;
  padding: 10px;
  font-family: monospace;
  outline: none; // 기본 테두리 제거
  caret-color: #00ff00; // 커서 색상을 초록색으로 설정
  box-shadow: none; // 클릭 시 상자 그림자 제거
`;

const Terminal = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false); // 메시지 전송 상태 관리

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/terminal");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        event.data.replace(/\n/g, "<br />"),
      ]);
      setIsSending(false); // 메시지 수신 후 전송 상태 해제
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      setIsSending(false); // 에러 시 전송 상태 해제
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      setIsSending(true); // 메시지 전송 중
      socket.send(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        `> ${input}`.replace(/\n/g, "<br />"),
      ]);
      setInput("");
    }
  };

  return (
    <TerminalContainer>
      {messages.map((message, index) => (
        <MessageLine
          key={index}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ))}
      <InputContainer>
        <Prompt>$</Prompt> {/* 프롬프트 추가 */}
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSending) {
              sendMessage();
            }
          }}
          disabled={isSending} // 메시지 전송 중일 때 입력 비활성화
        />
      </InputContainer>
    </TerminalContainer>
  );
};

export default Terminal;