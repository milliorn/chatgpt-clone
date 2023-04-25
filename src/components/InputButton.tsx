import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

interface InputButtonProps {
  getMessage: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  value: string;
}

export default function InputButton(props: InputButtonProps): JSX.Element {
  const { getMessage, value } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsLoading(true);
    await getMessage(event);
    setIsLoading(false);
  };

  return (
    <div
      id="submit"
      onClick={handleClick}
      className={`submit-icon ${value ? "" : "disabled"}`}
    >
      {isLoading ? <FaSpinner className="spinner" /> : <BsArrowReturnLeft />}
    </div>
  );
}
