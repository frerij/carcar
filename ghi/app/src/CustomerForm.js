import React, { Component } from "react";

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone_number: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const customerUrl = "http://localhost:8090/api/customer/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      this.setState({
        name: "",
        address: "",
        phone_number: "",
      });
    } else {
      console.log("customer not created");
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
        <h1>Add a new customer</h1>
        <form onSubmit={this.handleSubmit} id="create-customer-form">
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
              value={this.state.address}
              placeholder="Address"
              required
              type="text"
              id="address"
              className="form-control"
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChange}
              value={this.state.phone_number}
              placeholder="Phone Number"
              required
              type="text"
              id="phone_number"
              className="form-control"
            />
            <label htmlFor="phone_number">Phone Number</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
