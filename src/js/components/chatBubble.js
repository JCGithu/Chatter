import React from 'react';

export default function ChatBubble({ chat }) {
  let msg = chat.msg;
  return (
    <div className="chatbubble">
      <div className="chatName">
        {chat.style.badges && chat.style.badges.map((badge, i) => <img src={badge[0]} alt={badge[1]} key={badge[1]} />)}
        <b>
          {chat.user}
          {': '}
        </b>
      </div>
      <div className="chatText">
        {msg.map((segment, index) => (
          <span key={`span${index}`}>
            {segment.str && segment.str}
            {segment.img && segment.twitch && (
              <img src={`http://static-cdn.jtvnw.net/emoticons/v1/${segment.twitch}/3.0`} alt={segment.twitch}></img>
            )}
            {segment.img && segment.bttv && <img src={`${segment.bttv}`} alt={segment.bttvId}></img>}
          </span>
        ))}
      </div>
    </div>
  );
}
