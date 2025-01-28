import { useContext } from 'react'
import { activeViewContext } from '../../pages/FrontPage';
import './topnav.css'
import DateChooser from '../DateChooser/DayDateChooser';
import Link from '../Links/pageLinks/Link'
import AddButton from '../Buttons/Add/AddButton';

function TopNav() {
  const [viewSelected, setViewSelected] = useContext(activeViewContext)

  const setSelectedView = (selected) => {
    setViewSelected(selected.target.innerText.toLowerCase())
  }

  return (
    <>
      <div className="topnav-container flex-row">
        <div className="topnav-left flex-row">
          <Link name="Mine" />
          <Link name="All" />
        </div>
        <div className="topnav-middle flex-row">
          <DateChooser />
          <Link name="Day" className={viewSelected === "day" ? "link-active" : ""} onClick={setSelectedView} />
          <Link name="Week" className={viewSelected === "week" ? "link-active" : ""} onClick={setSelectedView} />
          <Link name="Month" className={viewSelected === "month" ? "link-active" : ""} onClick={setSelectedView} />
        </div>
        <div className="topnav-right flex-row">
          <AddButton name="Add" />
        </div>
      </div>
    </>
  );
}

export default TopNav;