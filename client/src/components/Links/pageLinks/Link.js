
import './link.css'

function Link({name, onClick, className}) {
    return (
      <>
          <div className="link-container" onClick={onClick} >
              <a className={className}>{name}</a>
          </div>
        </>
    );
  }
  
  export default Link;