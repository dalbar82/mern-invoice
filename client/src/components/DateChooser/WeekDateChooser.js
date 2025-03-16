
import './date-chooser.css'
import "react-datetime/css/react-datetime.css";

function DayDateChooser() {
    const dateTimeLocalNow = new Date().toISOString().slice(0, 10);

    return (
      <>
          <div className="date-chooser-container">
              <button className='date-chooser-select date-chooser-select-left'>˂</button>
              <div className='date-chooser-date'>
                <input 
                    type='datetime-local'
                    className='date-chooser-date-input'
                    defaultValue={dateTimeLocalNow} 
                    min={dateTimeLocalNow}
                />
              </div>
              <button className='date-chooser-select date-chooser-select-right'>˃</button>
          </div>
        </>
    );
  }
  
  export default DayDateChooser;

//   <input 
//     type='datetime-local'
//     className='date-chooser-date-input'
//     defaultValue={dateTimeLocalNow} 
//     min={dateTimeLocalNow}
// />
