import React from "react";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import styled from "styled-components";

export default function ChatBot() {
  return (
    <>
      <Header />
      <Container>
          <ChatWindow>

          </ChatWindow>
          <InputArea>
            <ChatInput placeholder="메시지를 입력하세요..." />
            <SendButton>전송</SendButton>
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