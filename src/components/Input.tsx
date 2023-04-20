import { Dispatch, SetStateAction } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onIconClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  disabled: boolean;
  placeholder: string;
  icon: JSX.Element;
}

export default function Input({
  value,
  setValue,
  onIconClick,
  disabled,
  placeholder,
  icon,
}: Props): JSX.Element {
  return (
    <div className="input-container">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <div
        id="submit"
        onClick={onIconClick}
        className={`submit-icon ${disabled ? "disabled" : ""}`}
      >
        {icon}
      </div>
    </div>
  );
}
