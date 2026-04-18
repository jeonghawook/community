import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import ConversationMessages from "../conversationMessages";

const Chat = ({ friendName, userId, socket }) => {

  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {

      socket.on("chatMessage", (message) => {
        console.log("message"+message.text);
        // Add the incoming message to your chat
        if ((message.to === userId && message.myId === friendName) || (message.to === friendName && message.myId === userId)) {
        setChat((prevChat) => [...prevChat, { text: message.text, sender: message.myId  }]);
        console.log(chat);
        }
      });

    }
  }, []);

  const sendMessage = () => {
    if (socket) {
      console.log("sending");
      socket.emit("MessageToServer", {
        to: `${friendName}`,
        text: newMessage,
        myId: userId,
      });
      setChat((prevChat) => [...prevChat, { text:newMessage, sender: userId }]);

      setNewMessage("");
    }
  };

  return (
    <Box p="4" border="1px solid #ccc" borderRadius="md" width="300px">
      <Heading size="md">Chat with {friendName}</Heading>
      <Box className="chat-messages">
        {chat.map((message, index) => (
          <Text key={index} >
     {message.sender}: {message.text}
          </Text>
        ))}
      </Box>
      <Input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        size="sm"
        mb="2"
      />
      <Button size="sm" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default Chat;
