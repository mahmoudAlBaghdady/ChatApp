import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  setIsEditing,
  setIsCreating,
  type,
  channel,
  setToggleContainer,
  setActiveChannel
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      #{channel?.data?.name || channel?.data?.id}
    </p>
  );
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    console.log(members[0].user);
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName ||members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.name||members[0]?.user?.id}</p>
      </div>
    );
  };
  const isActiveClassname =
    channel?.id === activeChannel?.id
      ? "channel-preview__wrapper__selected"
      : "channel-preview__wrapper";

  return (
    <div
      className={isActiveClassname}
      onClick={() => {
        setIsEditing(false)
        setIsCreating(false)
        setActiveChannel(channel);
        if(setToggleContainer){
          setToggleContainer((prevState)=>!prevState)
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
