import React, { useState } from "react";
import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import {
  ChannelListContainer,
  ChannelContainer,
  Auth,
} from "./components/index";

import '../node_modules/stream-chat-react/dist/css/index.css'

const cookies = new Cookies();

const apiKey = "tpjvqweef7bn";
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get("token");
if (authToken) {
  client.connectUser(
    {
      token: cookies.get("token"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      id: cookies.get("userId"),
      hashedPassword: cookies.get("hashedPassword"),
      image: cookies.get("avatarURL"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}
const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          createType={createType}
          isEditing={isEditing}
        />
      </Chat>
    </div>
  );
};

export default App;

