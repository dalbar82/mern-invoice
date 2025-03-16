import '../button.css'
import { TiTick } from "react-icons/ti";

function SaveButton({name}) {
  return (
    <>
        <button className="basic-button save-button">
            <TiTick style={{verticalAlign: 'middle', marginRight: '3px'}}/>
            <span>{name}</span>
        </button>
    </>
  )
}

export default SaveButton