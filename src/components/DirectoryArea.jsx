import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 22.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  padding-bottom: 2%;
  align-items: center;
  background-color: white;
  border-radius: 10px;
`;

const AddFileBtn = styled.button`
  width: 80%;
  height: 10%;
  background-color: #374D5A;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border: none;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DirectoryArea = ({ setFileContent }) => {
  const [files, setFiles] = useState([]); // 파일 목록 상태

  const handleOpenDirectory = async () => {
    const folderFiles = await window.electronAPI.openDirectory();
    setFiles(folderFiles); // 선택한 폴더의 파일 목록 설정
  };

  const handleFileSelect = async (filePath) => {
    const fs = require('fs'); // fs 모듈 불러오기
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error('Failed to read file:', err);
        return;
      }
      setFileContent(content); // AceEditor에 내용을 설정
    });
  };
  

  return (
    <Container>
      <AddFileBtn onClick={handleOpenDirectory}>Add File</AddFileBtn>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index} onClick={() => handleFileSelect(file)}>
            {file}
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
};

export default DirectoryArea;
