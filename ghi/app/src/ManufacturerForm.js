import React, { Component } from "react";

class ManufacturerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      this.setState({
        name: "",
      });
    } else {
      console.log("Manufacturer not created");
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  render() {
    return (
      <div className="shadow p-4 mt-4">
        <h1>Create a manufacturer</h1>
        <form onSubmit={this.handleSubmit} id="create-shoe-form">
          <div className="form-floating mb-3">
            <input
              onChange={this.handleChangeName}
              value={this.state.name}
              placeholder="Name"
              required
              type="text"
              id="name"
              className="form-control"
            />
            <label htmlFor="name">Name</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default ManufacturerForm;
