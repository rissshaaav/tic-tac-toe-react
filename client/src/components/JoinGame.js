import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) return alert("user not found");

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel}/>
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="user name of rival..."
            onChange={(e) => {
              setRivalUsername(e.target.value);
            }}
          />
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  );
};

export default JoinGame;
