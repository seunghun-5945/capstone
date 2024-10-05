import React from "react";
import styled from "styled-components";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";

const Container = styled.div`
  width: 37.5%;
  height: 100%;
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
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.div`
  width: 90%;
  height: 15%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 2%;
  padding-right: 2%;
`;

const TextBox = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  font-size: 20px;
  outline: none;
  margin-left: 2%;
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: orange;
  cursor: pointer;
`;

const OutPutArea = () => {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <span>AI Support</span>
        </HeaderLeft>
        <HeaderRight>
          <HiOutlineClipboardCopy 
            fontSize={50}
            style={{cursor: 'pointer', marginRight:"3%"}}
          />
          <IoCopyOutline 
            fontSize={50}
          />
        </HeaderRight>
      </Header>
      <Main>
        <TextArea>
          <TextBox />
          <SendButton>
            <LuSend 
              fontSize={30}
            />
          </SendButton>
        </TextArea>
      </Main>
    </Container>
  );
};

export default OutPutArea;