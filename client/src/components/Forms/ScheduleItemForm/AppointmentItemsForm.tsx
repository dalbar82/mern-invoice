import React, { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import "./scheduleItemForm.css"; 
import { AppointmentItemsContext} from '../../../App';
import { Appointment } from "../../../types/Appointment";

interface AppointmentItemFormProps {
  id: string;
  title: string;
  onClose: () => void; 
}

const AppointmentItemForm: React.FC<AppointmentItemFormProps> = ({ id, title, onClose }) => {
  const appointmentItemsContext = useContext(AppointmentItemsContext);

  if (!appointmentItemsContext) {
    throw new Error("AppointmentItemContext must be used within a Provider");
  }
  
  const { appointments, setAppointments } = appointmentItemsContext;
  
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
  };
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget; // ✅ Use `currentTarget` for buttons
    const adjustment = name.includes("hour") ? 60 : 5;
  
    // setSelectedAppointment((prevData) => ({
    //   ...prevData,
    //   duration: (Number(prevData.duration) || 0) + (name.includes("Down") ? -adjustment : adjustment),
    // }));
  };

  // ✅ Get item details from context
  const getItemDetails = () => {
    const item = appointments.find(item => item.itemId === parseInt(id))
    if (item) setSelectedAppointment(item);
  };

  useEffect(() => {
    getItemDetails();
  }, [id]);

  // ✅ Improved handleSubmit function
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!selectedAppointment) {
      console.error("No appointment selected.");
      return;
    }
  
    setAppointments((prevAppointments) =>
      prevAppointments.map((item) =>
        item.itemId !== selectedAppointment.itemId ? item : { ...selectedAppointment, ...appointments }
      )
    );
  
    onClose();
  };
  

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <div className="schedule-item-container">
        <div className="schedule-item-form-left">
          <h1>{title}</h1>

          {/* {[
            { label: "Job Name", name: "jobName" },
            { label: "Job Number", name: "jobNumber" },
            { label: "Contact Name", name: "contactName" },
            { label: "Contact Phone", name: "contactPhone" },
            { label: "Assignee ID", name: "assigneeId" },
            { label: "Assignee Name", name: "assigneeName" },
          ].map(({ label, name }) => (
            <div className="form-group group-row" key={name}>
              <label>{label}:</label>
              <input type="text" name={name} value={{selectedAppointment ? selectedAppointment[name as keyof typeof selectedAppointment] : ""}} onChange={handleInputChange} />
            </div>
          ))} */}

          <div className="form-group group-row">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={selectedAppointment?.startDate ? new Date(selectedAppointment?.startDate).toISOString().split("T")[0] : ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group group-row">
            <label>Start Time:</label>
            <input type="time" name="startTime" value={selectedAppointment?.startTime || "07:30"} onChange={handleInputChange} />
          </div>

          <div className="form-group group-row">
            <label>Duration:</label>
            <input type="number" name="duration" value={selectedAppointment?.duration} readOnly />
          </div>

          <div className="form-group group-row">
            <label>Add/Remove Duration:</label>
            <div className="flex-row">
              {["hourDown", "hourUp", "minuteDown", "minuteUp"].map((name) => (
                <button
                  key={name}
                  className="count-button"
                  type="button"
                  name={name}
                  onClick={handleButtonClick}
                  style={{ marginRight: name.includes("Down") ? "20px" : "0px" }}
                >
                  {name.includes("Down") ? "-" : "+"}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group group-row">
            <label>Job Details:</label>
            <textarea name="jobDetails" value={selectedAppointment?.jobDetails} onChange={handleInputChange} />
          </div>
        </div>

        <div className="schedule-item-form-right">
          <fieldset className="address-fieldset">
            <legend className="address-header">Job Address</legend>

            {[
              { label: "Street Number", name: "jobAddressLong.streetNumber", type: "number" },
              { label: "Street Name", name: "jobAddressLong.streetName" },
              { label: "City", name: "jobAddressLong.city" },
              { label: "State", name: "jobAddressLong.state" },
              { label: "Postcode", name: "jobAddressLong.postcode" },
            ].map(({ label, name, type = "text" }) => (
              <div className="form-group group-row" key={name}>
                <label>{label}:</label>
                <input type={type} name={name} value={selectedAppointment?.jobAddressLong[name.split(".")[1] as keyof typeof selectedAppointment.jobAddressLong] || ""} onChange={handleInputChange} />
              </div>
            ))}
          </fieldset>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AppointmentItemForm;
