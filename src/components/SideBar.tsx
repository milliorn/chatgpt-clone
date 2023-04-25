import { SetStateAction } from "react";

type Props = {
  createNewChat: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  uniqueTitles: string[];
  handleClick: (uniqueTitle: SetStateAction<string>) => void;
};

// global sidebar
export default function SideBar(props: Props): JSX.Element {
  const { createNewChat, uniqueTitles, handleClick } = props;

  return (
    <section className="side-bar">
      <button onClick={createNewChat}>+ New Chat</button>
      <ul className="history">
        {uniqueTitles?.map((uniqueTitle, index) => (
          <li key={index} onClick={() => handleClick(uniqueTitle)}>
            {/* List item representing a unique chat */}
            {uniqueTitle}
          </li>
        ))}
      </ul>
      <nav>
        <p>
          Created by{" "}
          <a
            href="https://github.com/milliorn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scott Milliorn
          </a>
        </p>
      </nav>
    </section>
  );
}
