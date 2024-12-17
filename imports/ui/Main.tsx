import React from "react";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const { data: rooms } = client.chat.rooms.usePublication();

  const createChatRoom = async () => {
    const room = await client.chat.createTheRoom();
    navigate(`/chat/${room}`);
  };

  return (
    <div>
      <h1>Welcome to chat!</h1>
      <button onClick={createChatRoom}>
        Click me to generate and go to a chat room
      </button>
      <br />
      <span>Or select a chat from the list below to go to that chat room</span>
      <h3>Chats:</h3>
      {rooms.length === 0 && (
        <span>We do not have rooms yet, why don't you create one?</span>
      )}
      <ul>
        {rooms?.map((room) => (
          <li key={room._id}>
            <a href={`/chat/${room._id}`}>Chat room {room._id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
