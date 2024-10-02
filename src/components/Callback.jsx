import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Callback() {
  const navigate = useNavigate();

  const exchangeCodeForToken = useCallback(async (code, signal) => {
    try {
      const response = await axios.post('http://localhost:8000/api/github-login', { code }, { signal });
      const { access_token } = response.data;
      localStorage.setItem('github_token', access_token);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error exchanging code for token:', error);
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      exchangeCodeForToken(code, controller.signal);
    }
    return () => controller.abort();
  }, [exchangeCodeForToken]);

  return <div>GitHub 로그인 처리 중...</div>;
}

export default Callback;