import React, { useState } from "react";
import styled from "styled-components";
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';

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
  margin-bottom: 20px;
  border-radius: 4px;
`;

const FileList = styled.div`
  width: 90%;
  overflow-y: auto;
  max-height: 85%;
`;

const FileItem = styled.div`
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: ${props => props.$level * 16}px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ItemName = styled.span`
  margin-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TreeNode = ({ item, level, onFileSelect }) => {  // onFolderSelect 제거
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState([]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (item.isDirectory) {
      if (!isExpanded) {
        const filesData = await window.electronAPI.readDirectory(item.path);
        setChildren(filesData);
      }
      setIsExpanded(!isExpanded);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!item.isDirectory) {
      onFileSelect(item.path);
    }
  };

  return (
    <>
      <FileItem 
        $level={level}
        onClick={handleClick}  // 수정된 부분
      >
        {item.isDirectory ? (
          <>
            <span onClick={handleToggle}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <Folder size={16} color="#FFB84C" />
          </>
        ) : (
          <>
            <span style={{ width: 16 }} />
            <FileText size={16} color="#374D5A" />
          </>
        )}
        <ItemName>{item.name}</ItemName>
      </FileItem>

      {isExpanded && children.map((child) => (
        <TreeNode
          key={child.path}
          item={child}
          level={level + 1}
          onFileSelect={onFileSelect}
        />
      ))}
    </>
  );
};

const DirectoryArea = ({ onFileSelect }) => {  // props 이름 변경
  const [files, setFiles] = useState([]);

  const handleOpenDirectory = async () => {
    try {
      const directoryPath = await window.electronAPI.openDirectory();
      if (directoryPath) {
        const filesData = await window.electronAPI.readDirectory(directoryPath);
        setFiles(filesData);
      }
    } catch (error) {
      console.error('Error opening directory:', error);
    }
  };

  const handleFileSelect = async (filePath) => {
    try {
      console.log('DirectoryArea: Reading file:', filePath);
      const content = await window.electronAPI.readFile(filePath);
      console.log('DirectoryArea: File content read:', content);
      if (onFileSelect && typeof onFileSelect === 'function') {
        onFileSelect(content);
      } else {
        console.error('DirectoryArea: onFileSelect is not a function:', onFileSelect);
      }
    } catch (error) {
      console.error('DirectoryArea: Failed to read file:', error);
    }
  };


  return (
    <Container>
      <AddFileBtn onClick={handleOpenDirectory}>Add File</AddFileBtn>
      <FileList>
        {files.map((file) => (
          <TreeNode
            key={file.path}
            item={file}
            level={0}
            onFileSelect={handleFileSelect}
          />
        ))}
      </FileList>
    </Container>
  );
};

export default DirectoryArea;