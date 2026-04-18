import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chat from "./Chat"; // Import the Chat component
import io from "socket.io-client";

function RightSidebar({ userId }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [openChats, setOpenChats] = useState([]); // Store users with open chat windows
  const accessToken = localStorage.getItem("accessToken");

 
  const openChat = (friendName) => {
    if (!openChats.includes(friendName)) {
      setOpenChats([...openChats, friendName]);
    }
    setSelectedFriend(friendName);
  };


  const closeChat = (friendName) => {
    setOpenChats(openChats.filter((chat) => chat !== friendName));
    setSelectedFriend(null);
  };

  // Establish the WebSocket connection when the component mounts
  useEffect(() => {
    if (accessToken && !socket) {
      const newSocket = io("http://localhost:3000", {
        query: {
          accessToken,
        },
      });

      newSocket.emit("listConnectedUsers");

      newSocket.on("connectedUsers", (receivedConnectedUsers) => {
        setConnectedUsers(receivedConnectedUsers);
        console.log("checking" + receivedConnectedUsers);
      });

      setSocket(newSocket);
    }
  }, [userId, accessToken, socket]);

  return (
    <Box h="100%" display="flex" flexDirection="column" justifyContent="flex-end">
      <Flex direction="column">
        {connectedUsers.map((user, index) => (
          <Flex
            key={index}
            onClick={() => openChat(user)} // Open a chat with the selected friend
            style={{ cursor: "pointer" }}
          >
            <Text ml="3">{user}</Text>
          </Flex>
        ))}
      </Flex>
      {openChats.map((friendName) => (
        <Chat
          key={friendName}
          friendName={friendName}
          userId={userId}
          socket={socket}
          active={friendName === selectedFriend}
          onChatClose={() => closeChat(friendName)} // Close chat when user clicks the close button
        />
      ))}
    </Box>
  );
}

export default RightSidebar;
