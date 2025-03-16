import { BsSendFill } from "react-icons/bs";

function SendButton({name}) {
  return (
    <>
        <button className="basic-button green-button">
            <BsSendFill style={{verticalAlign: 'middle', marginRight: '3px'}}/>
            <span>{name}</span>
        </button>
    </>
  )
}

export default SendButton