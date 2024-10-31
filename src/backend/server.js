require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  console.log("클라이언트가 연결되었습니다.");

  socket.on("codeChange", async (data) => {
    try {
      console.log("코드 변경 감지:", data);

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "파이썬 코드 자동 완성 도우미입니다. 코드 제안 시 다음 규칙을 따르세요:\n1. 실행 가능한 파이썬 코드만 제시\n2. 설명이 필요한 경우 파이썬 주석(#)으로 표시\n3. ```python 같은 마크다운 표시는 제외\n4. 코드와 관련된 설명은 모두 주석으로 처리",
          },
          {
            role: "user",
            content: `전체 코드 컨텍스트:
${data.code}

현재 라인:
${data.line}

다음 코드를 제안해주세요.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.3,
      });

      let suggestion = completion.choices[0].message.content.trim();

      // ```python 등의 마크다운 표시 제거
      suggestion = suggestion.replace(/```python\n?|```\n?/g, "");

      console.log("제안할 코드:", suggestion);
      socket.emit("codeSuggestion", suggestion);
    } catch (error) {
      console.error("OpenAI API 에러:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 종료했습니다.");
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행중입니다`);
});
