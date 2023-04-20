import Info from "./Info";
import InputButton from "./InputButton";

interface BottomSectionProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  getMessage: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
}

function BottomSection(props: BottomSectionProps): JSX.Element {
  return (
    <section className="bottom-section">
      <div className="input-container">
        <input
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        <InputButton getMessage={props.getMessage} value={props.value} />
      </div>
      <Info />
    </section>
  );
}

export default BottomSection;
