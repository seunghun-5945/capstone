import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import EditorArea from "../components/EditorArea";
import OutPutArea from "../components/OutPutArea";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #374D5A;
`;

const Frame = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #374D5A;
`;

const Center = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #374D5A;
  border-radius: 15px;
`;

const DirectoryTab = styled.div`
  width: 22.5%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <MenuBar />
      <Frame>
        <Center>
          <DirectoryTab />
          <EditorArea>
          </EditorArea>
          <OutPutArea />
        </Center>
      </Frame>
      <Footer/>
    </Container>
  );
};

export default Home;