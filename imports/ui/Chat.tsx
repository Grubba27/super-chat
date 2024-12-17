import React, { useReducer } from "react";
import { client } from "../api/client";
import { useNavigate, useParams } from "react-router-dom";

export const Chat = () => {
  let { chatId } = useParams();
  const navigate = useNavigate();
  const {
    data: [chatRoom],
  } = client.chat.room.usePublication(chatId as string);

  const [state, dispatch] = useReducer(
    (
      state: { who: string; message: string },
      action: { type: string; value: string }
    ) => {
      switch (action.type) {
        case "who":
          return { ...state, who: action.value };
        case "message":
          return { ...state, message: action.value };
        default:
          return state;
      }
    },
    { who: "", message: "" }
  );
  const sendMessage = async () => {
    if (state.who === "" || state.message === "") {
      alert("Please fill in both fields");
      return;
    }
    await client.chat.sendMessage({
      chatId: chatId as string,
      message: state.message,
      user: state.who,
    });
    dispatch({ type: "message", value: "" });
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Go back to main page</button>
      <h2>Chat in room: {chatId}</h2>
      <div>
        <label htmlFor="who">Who:</label>
        <input
          id="who"
          onChange={(e) => dispatch({ type: "who", value: e.target.value })}
          value={state.who}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          id="message"
          onChange={(e) => dispatch({ type: "message", value: e.target.value })}
          value={state.message}
        />
      </div>
      <button onClick={sendMessage}>Send message</button>
      <h3>Messages:</h3>
      {chatRoom.messages.length === 0 && <span>No messages yet</span>}
      <ul>
        {chatRoom.messages.map((message, i) => (
          <li key={i}>
            <span>{message.who}:</span> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
