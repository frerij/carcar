import React, { Component } from "react";

class AppointmentHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      search_key: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async handleSearchSubmit(event) {
    event.preventDefault();
    const searchUrl = "http://localhost:3000/service/history";
    const fetchConfig = {
      method: "get",
    };
    const response = await fetch(searchUrl, fetchConfig);
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ appointments: data.appointment });
    }
  }

  render() {
    return (
      <>
        <div className="shadow p-4 mt-4">
          <h1>Vehicle Service History</h1>
          <form onSubmit={this.handleSearchSubmit} id="vin-search-form">
            <div className="input-group">
              <input
                onChange={this.handleChange}
                value={this.state.search_key}
                type="search"
                className="form-control rounded"
                placeholder="Search"
                id="search_key"
                aria-describedby="search-addon"
              />
              <button type="button" className="btn btn-outline-primary">
                search
              </button>
            </div>
          </form>
        </div>
        <div>
          <hr></hr>
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
              {(this.state.appointments || []).map((appointment) => {
                // parsing through date to show formatted correctly
                let parsedDate = Date.parse(appointment.date);
                const listDate = new Date(parsedDate);

                let isVip = "";
                let isFinished = "";

                if (appointment.is_vip === true) {
                  isVip = "VIP";
                }

                if (appointment.is_finished === false) {
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

export default AppointmentHistoryList;