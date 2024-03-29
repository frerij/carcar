import React from "react";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_name: "",
      vin: "",
      date: "",
      reason: "",
      technicians: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/technicians/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.technicians;

    const appointmentURL = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentURL, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();

      const cleared = {
        owner_name: "",
        vin: "",
        date: "",
        reason: "",
        technicians: [],
      };
      this.setState(cleared);
    }
    // window.location.reload();
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.vin}
                  placeholder="Vin"
                  required
                  type="text"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">Vin number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.owner_name}
                  placeholder="Owner name"
                  required
                  type="text"
                  id="owner_name"
                  className="form-control"
                />
                <label htmlFor="owner_name">Owner name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.date}
                  placeholder="Date and Time"
                  type="datetime-local"
                  id="date"
                  className="form-control"
                />
                <label htmlFor="date">Date and Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChange}
                  value={this.state.technician}
                  required
                  className="form-select"
                  id="technician"
                >
                  <option value="">Choose a technician</option>
                  {this.state.technicians.map((technician) => {
                    return (
                      <option
                        key={technician.tech_num}
                        value={technician.tech_num}
                      >
                        {technician.tech_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.reason}
                  placeholder="Reason"
                  type="text"
                  id="reason"
                  className="form-control"
                />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create appointment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
