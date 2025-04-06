import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { JSX, useState } from "react";

interface InputButtonProps {
  getMessage: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  value: string;
}

// used for sending messages.
export default function InputButton(props: InputButtonProps): JSX.Element {
  const { getMessage, value } = props;
  const [isLoading, setIsLoading] = useState(false);

  // triggers message sending functionality.
  const handleClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsLoading(true);
    await getMessage(event);
    setIsLoading(false);
  };

  return (
    <div className="submit-wrapper">
      <div
        id="submit"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        aria-label="Click to send prompt"
        className={`submit-icon ${value ? "" : "disabled"}`}
      >
        {!isLoading ? <BsArrowReturnLeft /> : null}
        {isLoading ? <FaSpinner className="spinner" /> : null}
      </div>
    </div>
  );
}
