import React, { Component } from "react";

class VehicleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture_url: "",
      manufacturers: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/manufacturers/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.manufacturers;

    const vehicleUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(vehicleUrl, fetchConfig);
    if (response.ok) {
      const newVehicle = await response.json();
      this.setState({
        name: "",
        picture_url: "",
        manufacturers: [],
      });
      console.log("Vehicle created");
    } else {
      console.log("Vehicle not created");
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangePicture(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }
  handleChangeManufacturer(event) {
    const value = event.target.value;
    this.setState({ manufacturer_id: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-form">
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
              <div className="mb-3">
                <label htmlFor="image_url">Picture URL</label>
                <textarea
                  onChange={this.handleChangePicture}
                  value={this.state.picture_url}
                  className="form-control"
                  id="picture_url"
                  placeholder="Picture url"
                ></textarea>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChangeManufacturer}
                  required
                  name="manufacturer"
                  id="manufacturer"
                  className="form-select"
                >
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map((manufacturer) => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleForm;
