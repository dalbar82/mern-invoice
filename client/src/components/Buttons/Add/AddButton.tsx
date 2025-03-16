import "../button.css";
import { FaPlus } from "react-icons/fa";

interface AddButtonProps {
  name: string;
}

const AddButton: React.FC<AddButtonProps> = ({ name }) => {
  return (
    <button className="basic-button green-button">
      <FaPlus style={{ verticalAlign: "middle", marginRight: "3px" }} />
      <span>{name}</span>
    </button>
  );
};

export default AddButton;
