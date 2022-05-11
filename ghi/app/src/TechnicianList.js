import React from "react";
import { Link } from "react-router-dom";

class TechnicianList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicians: [],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8080/api/technicians/");
    if (response.ok) {
      const data = await response.json();
      this.setState({
        technicians: data.technicians,
      });
    } else {
      console.error(response);
    }
  }

  render() {
    return (
      <>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">
            Add a Technician
          </Link>
        </div>
        <div className="container">
          <h2>Technicians</h2>
          <div className="list">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Number</th>
                </tr>
              </thead>
              <tbody>
                {(this.state.technicians || []).map((technician) => {
                  return (
                    <tr key={technician.id}>
                      <td>{technician.tech_name}</td>
                      <td>{technician.tech_num}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default TechnicianList;
