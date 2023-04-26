import { SetStateAction } from "react";

type Props = {
  createNewChat: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  uniqueTitles: string[];
  handleClick: (uniqueTitle: SetStateAction<string>) => void;
  handleClickCallback: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
};

// global sidebar
export default function SideBar(props: Props): JSX.Element {
  const { createNewChat, uniqueTitles, handleClickCallback } = props;

  return (
    <section className="side-bar">
      <button onClick={createNewChat}>+ New Chat</button>
      <ul className="history">
        {uniqueTitles?.map((uniqueTitle, index) => (
          <li key={index} onClick={handleClickCallback}>
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
