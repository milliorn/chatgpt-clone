import { BsArrowReturnLeft } from "react-icons/bs";

interface InputButtonProps {
  getMessage: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  value: string;
}

export default function InputButton(props: InputButtonProps): JSX.Element {
  const { getMessage, value } = props;

  return (
    <div
      id="submit"
      onClick={getMessage}
      className={`submit-icon ${value ? "" : "disabled"}`}
    >
      <BsArrowReturnLeft />
    </div>
  );
}
