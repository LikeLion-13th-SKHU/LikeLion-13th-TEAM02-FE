import React,{useState} from "react";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import styled from "styled-components";
import axios from "axios";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! Neezy입니다! 창업 및 상권 관련 궁금한 점을 질문해 주세요."},
  ]);
  const [input, setInput] =useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newMessages = [...messages, {sender: "user", text: input}];
    setMessages(newMessages);

    try {
      const res = await axios.post(
        `https://junyeong.store/api/chat`,
        {message: input},
        {
          headers: { 
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
        },
       }
      );

      const botReply = res?.data?.reply || "챗봇 응답이 없습니다.";
      setMessages([...newMessages, {sender: "bot", text:botReply }]);
    } catch (err) {
      setMessages([...newMessages, {sender: "bot", text: "챗봇 응답 오류" }]);
      console.error(err);
    }

    setInput("");
  };

  return (
    <>
      <Header />
      <Container>
          <ChatWindow>
            {messages.map((msg, i) => (
              <Message key={i} $sender={msg.sender}>
                <b>{msg.sender === "user" ? "나" : "챗봇"}:</b>{msg.text}
              </Message>
            ))}
          </ChatWindow>
          <InputArea>
            <ChatInput 
              placeholder="메시지를 입력하세요..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
              />
            <SendButton onClick={sendMessage}>전송</SendButton>
          </InputArea>
      </Container>
      <Nav />
    </>
  );
}


const Container =styled.div`
  border: 2px solid #f97316;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;
  padding-bottom: 10px;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;


const Message = styled.div`
  margin: 5px 0;
  display: inline-block;
  text-align: left;
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #f97316;
  margin: 5px 0;
  word-wrap: break-word;

  background-color: ${(props) => 
    props.$sender === "user" ? "#f97316" : "#f1f1f1"};
    color: ${(props) => (props.$sender === "user" ? "white" : "block")};

    align-self: ${(props) =>
    props.$sender === "user" ? "flex-end" : "flex-start"};
`;

const InputArea =styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  padding: 8px;
  background-color: #fff;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 12px;
  padding: 8px;
`;

const SendButton = styled.button`
  background-color: #f97316;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
`;