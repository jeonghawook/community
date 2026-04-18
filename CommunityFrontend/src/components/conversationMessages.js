// ConversationMessages.js
import React from 'react';

function ConversationMessages ({ chat }) {
  return (
    <div className="chat-messages">
      {chat.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ConversationMessages;
