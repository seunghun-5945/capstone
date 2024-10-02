import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      fetchUserRepos();
    }
  }, [token]);

  const fetchUserRepos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user-repos', {
        params: { token }
      });
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching user repos:', error);
    }
  };

  const handleRepoSelect = async (repo) => {
    setSelectedRepo(repo);
    try {
      const response = await axios.get('http://localhost:8000/api/repo-contents', {
        params: { token, repo_name: repo }
      });
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching repo contents:', error);
    }
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    try {
      const response = await axios.get('http://localhost:8000/api/file-content', {
        params: { token, repo_name: selectedRepo, file_path: file }
      });
      setFileContent(response.data.content);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const handleUpdateFile = async () => {
    if (!commitMessage) {
      alert('커밋 메시지를 입력해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/update-file', {
        token,
        repo_name: selectedRepo,
        file_path: selectedFile,
        content: fileContent,
        branch: 'main', // Assuming 'main' as the default branch
        commit_message: commitMessage
      });
      alert('File updated successfully');
      setCommitMessage('');
    } catch (error) {
      console.error('Error updating file:', error);
      alert('Failed to update file');
    }
  };

  const handleCreateFile = async () => {
    if (!commitMessage) {
      alert('커밋 메시지를 입력해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/create-file', {
        token,
        repo_name: selectedRepo,
        file_name: newFileName,
        content: newFileContent,
        branch: 'main', // Assuming 'main' as the default branch
        commit_message: commitMessage
      });
      alert('File created successfully');
      setNewFileName('');
      setNewFileContent('');
      setCommitMessage('');
    } catch (error) {
      console.error('Error creating file:', error);
      alert('Failed to create file');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setToken(null);
    setUser(null);
    setRepos([]);
    setSelectedRepo('');
    setFiles([]);
    setSelectedFile('');
    setFileContent('');
    navigate('/');
  };

  return (
    <div>
      <h1>GitHub Repository Manager</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <h2>레포지토리 선택</h2>
      <select onChange={(e) => handleRepoSelect(e.target.value)}>
        <option value="">레포지토리 선택</option>
        {repos.map(repo => (
          <option key={repo} value={repo}>{repo}</option>
        ))}
      </select>
      {selectedRepo && (
        <>
          <h2>파일 목록</h2>
          <select onChange={(e) => handleFileSelect(e.target.value)}>
            <option value="">파일 선택</option>
            {files.map(file => (
              <option key={file.path} value={file.path}>{file.name}</option>
            ))}
          </select>
        </>
      )}
      {selectedFile && (
        <>
          <h2>파일 내용 수정</h2>
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            rows={10}
            cols={50}
          />
          <br />
          <input
            type="text"
            placeholder="커밋 메시지"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
          />
          <br />
          <button onClick={handleUpdateFile}>변경 사항 커밋</button>
        </>
      )}
      <h2>새 파일 추가</h2>
      <input
        type="text"
        placeholder="파일 이름"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="파일 내용"
        value={newFileContent}
        onChange={(e) => setNewFileContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <input
        type="text"
        placeholder="커밋 메시지"
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
      />
      <br />
      <button onClick={handleCreateFile}>파일 생성 및 커밋</button>
    </div>
  );
}

export default Dashboard;