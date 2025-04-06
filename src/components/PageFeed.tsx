import { JSX } from "react";
import { Chat } from "../Chat";

interface PageFeedProps {
  currentChat: Chat[];
}

/**
 * Represents the list of messages displayed in the chat feed.
 * @param {Object} currentChat - An array of Chat objects representing the current chat history.
 */
export default function PageFeed({ currentChat }: PageFeedProps): JSX.Element {
  return (
    <ul className="feed">
      {currentChat?.map((chatMessage, index) => (
        <li key={index}>
          <p className="role">{chatMessage.role.toUpperCase()}:</p>
          <p>{chatMessage.content}</p>
        </li>
      ))}
    </ul>
  );
}
