import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFileAddFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import LanguageSelection from "./LanguageSelection";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/languageSlice";

const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  background-color: white;
`;

const LeftSide = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid red;
`;

const RightSide = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 2%;
  padding-right: 2%;
  border: 2px solid yellow;
`;

const ButtonArea = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MenuBar = () => {

  useEffect(() => {
    console.log();
  }, [])

  return (
    <Container>
      <LeftSide>
        <LanguageSelection />
      </LeftSide>
      <Center>
        <ButtonArea>
          <FaPython 
            fontSize={50}
          />
          Python
        </ButtonArea>
        <ButtonArea>
          <FaJava
            fontSize={50}
          />
          Java
        </ButtonArea>
        <ButtonArea>
          <RiJavascriptFill 
            fontSize={50}
          />
          JavaScript
        </ButtonArea>
      </Center>
      <RightSide>
        <ButtonArea>
          <FaCodePullRequest 
            fontSize={50}
            cursor={"pointer"}  
          />PULL
        </ButtonArea>
        <ButtonArea>
          <AiOutlineDownload 
            fontSize={50}
            cursor={"pointer"}    
          />SAVE
        </ButtonArea>
        <ButtonArea>
          <IoSettingsSharp 
            fontSize={50}
            cursor={"pointer"}    
          />SETTING
        </ButtonArea>
        <ButtonArea>
          <RiFileAddFill 
            fontSize={50}
            cursor={"pointer"}    
          />ADD
        </ButtonArea>
      </RightSide>
    </Container>
  );
};

export default MenuBar;