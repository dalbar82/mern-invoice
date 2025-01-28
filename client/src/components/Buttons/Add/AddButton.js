import '../button.css'
import { FaPlus } from "react-icons/fa";

function AddButton({name}) {
  return (
    <>
        <button className="basic-button green-button">
          <FaPlus style={{verticalAlign: 'middle', marginRight: '3px'}}/>
          <span>{name}</span>
        </button>
    </>
  )
}

export default AddButton