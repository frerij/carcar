import React from "react";
import { Link } from "react-router-dom";

class ManufacturerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if (response.ok) {
      const data = await response.json();
      this.setState({
        manufacturers: data.manufacturers,
      });
      console.log(data);
    } else {
      console.error(response);
    }
  }

  render() {
    return (
      <>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link
            to="/manufacturers/new"
            className="btn btn-primary btn-lg px-4 gap-3"
          >
            Add a manufacturer
          </Link>
        </div>
        <div className="container">
          <h2>Manufacturers</h2>
          <div className="list">
            <div className="container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {(this.state.manufacturers || []).map((manufacturer) => {
                    return (
                      <tr key={manufacturer.id}>
                        <td>{manufacturer.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ManufacturerList;
