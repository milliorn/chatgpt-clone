import { JSX } from "react";
import Info from "./Info";
import InputButton from "./InputButton";

interface BottomSectionProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  getMessage: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
}

// represents the bottom section of the page.
export default function BottomSection(props: BottomSectionProps): JSX.Element {
  return (
    <section className="bottom-section">
      <div className="input-container">
        {/* allows the user to enter text. */}
        <input
          aria-label="Enter message"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {/* triggers the message sending functionality. */}
        <InputButton
          aria-label="Send message"
          getMessage={props.getMessage}
          value={props.value}
        />
      </div>
      {/* displays additional information about the page. */}
      <Info />
    </section>
  );
}
