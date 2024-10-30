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
              "You are a Python code completion assistant. Provide only the code suggestion without any explanation or markdown formatting.",
          },
          {
            role: "user",
            content: `Complete this Python code: ${data}`,
          },
        ],
        max_tokens: 50,
        temperature: 0.7,
      });

      const suggestion = completion.choices[0].message.content.trim();
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
