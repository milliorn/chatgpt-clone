import { Chat } from "../App";

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
        <li key={`${index}-${chatMessage.content}`}>
          <p className="role">{chatMessage.role.toUpperCase()}:</p>
          <p>{chatMessage.content}</p>
        </li>
      ))}
    </ul>
  );
}
