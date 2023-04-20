import { Chat } from "../App";

interface PageFeedProps {
  currentChat: Chat[];
}

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
