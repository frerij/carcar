import React, { Component } from "react";
import { Link } from "react-router-dom";

// add delete function for cancel button
const cancelAppointment = async (id) => {
  const appointmentUrl = `http://localhost:8080/api/appointments/${id}`;

  const fetchConfig = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(appointmentUrl, fetchConfig);
  if (response.ok) {
    console.log(response);
  }
  window.location.reload();
};

// add finished function to update finished value
const appointmentFinished = async (id) => {
  const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;

  const fetchConfig = {
    method: "put",
    body: JSON.stringify({ is_finished: true }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(appointmentUrl, fetchConfig);
  if (response.ok) {
    console.log("Appointment marked as finished");
  }
  window.location.reload();
};
class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  async getAppointmentData() {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      const appointments = [];
      this.setState({
        appointments: data.appointment,
      });
    } else {
      console.error(response);
    }
  }

  async getSalesData() {
    const response = await fetch("http://localhost:8090/api/sales/");
    if (response.ok) {
      const data = await response.json();
      const sales = [];
      this.setState({
        sales: data.sales,
      });
    } else {
      console.error(response);
    }
  }

  async componentDidMount() {
    this.getAppointmentData();
    this.getSalesData();
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>Appointments</h1>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
            <Link
              to="new"
              className="btn btn-outline-secondary btn-sm px-4 gap-3"
            >
              add appointment
            </Link>
          </div>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Owner Name</th>
                <th>VIN</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Assigned Technician</th>
              </tr>
            </thead>
            <tbody>
              {/* function(this.state.appointments, this.state.sales)
                    for appointment in this.state.appointments
                        if appointment.vin in sales
                            return is_vip = true */}

              {(this.state.appointments || []).map((appointment) => {
                // parsing through date to show formatted correctly
                let parsedDate = Date.parse(appointment.date);
                const listDate = new Date(parsedDate);

                let isVip = "";
                let isFinished = "";

                if (appointment.is_vip === true) {
                  isVip = "VIP";
                }

                if (appointment.is_finished === true) {
                  isFinished = "d-none";
                }

                return (
                  <tr key={appointment.id} className={isFinished}>
                    <td className={isVip}>{appointment.owner_name}</td>
                    <td>{appointment.vin}</td>
                    <td>
                      {listDate.toLocaleString("en-US", {
                        wekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.technician.tech_name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => cancelAppointment(appointment.id)}
                      >
                        Cancel
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => appointmentFinished(appointment.id)}
                      >
                        Finished
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default AppointmentList;
