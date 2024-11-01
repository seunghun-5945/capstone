import React, { useState, useCallback } from "react";
import DirectoryArea from "./components/DirectoryArea";
import EditorArea from "./components/EditorArea";

const App = () => {
  const [fileContent, setFileContent] = useState("");

  const handleFileContentChange = useCallback((content) => {
    console.log("App: Setting file content:", content);
    setFileContent(content);
  }, []);

  console.log("App: Current fileContent:", fileContent); // 디버깅용

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      padding: '20px',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <DirectoryArea onFileSelect={handleFileContentChange} />
      <EditorArea 
        fileContent={fileContent} 
        setFileContent={handleFileContentChange} 
      />
    </div>
  );
};

export default App;