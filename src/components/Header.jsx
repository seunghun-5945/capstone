import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #374D5A;
  padding: 0% 2% 0% 2%;
`;

const SideMenuBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
`;

const IconArea = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h2 {
    color: gray;
  }
`;

const Header = () => {
  return (
    <Container>
      <SideMenuBox>
        <IconArea>
          <img 
            style={{width: "60%"}}
            src="https://cdn-icons-png.flaticon.com/128/8275/8275061.png" 
          />
        </IconArea>
        <TextArea>
          <h1>W:IDE</h1>
          <h2>Simple Develop Web IDE</h2>
        </TextArea>
      </SideMenuBox>
      <SideMenuBox style={{width: "8%", display: "flex", justifyContent: "space-around"}}>
        <h2>signup</h2>
        <h2> / </h2>
        <h2>signin</h2>
      </SideMenuBox>
    </Container>
  );
};

export default Header;