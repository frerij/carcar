import React, { Component } from "react";

class SalePersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employee_number: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const salesPersonUrl = "http://localhost:8090/api/salesperson/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
      const newSalesperson = await response.json();
      this.setState({
        name: "",
        employee_number: "",
      });
    } else {
      console.log("Salesperson not created");
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="shadow p-4 mt-4">
        <h1>Add a new sales person</h1>
        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Name"
              required
              type="text"
              id="name"
              className="form-control"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChange}
              value={this.state.employee_number}
              placeholder="Employee Number"
              required
              type="text"
              id="employee_number"
              className="form-control"
            />
            <label htmlFor="employee_number">Employee Number</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default SalePersonForm;
