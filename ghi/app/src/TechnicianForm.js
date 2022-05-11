import React, { Component } from "react";

class TechnicianForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech_name: "",
      tech_num: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleChangeName = this.handleChangeName.bind(this);
    // this.handleChangeNumber = this.handleChangeNumber.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      this.setState({
        tech_name: "",
        tech_num: "",
      });
      console.log("Technician created");
    } else {
      console.log("Technician not created");
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    console.log(event);
    this.setState(newState);
  }

  render() {
    return (
      <div className="shadow p-4 mt-4">
        <h1>Add a new technician</h1>
        <form onSubmit={this.handleSubmit} id="create-tech-form">
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChange}
              value={this.state.tech_name}
              placeholder="Name"
              required
              type="text"
              id="tech_name"
              className="form-control"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChange}
              value={this.state.tech_num}
              placeholder="Employee Number"
              required
              type="text"
              id="tech_num"
              className="form-control"
            />
            <label htmlFor="tech_num">Employee Number</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default TechnicianForm;
