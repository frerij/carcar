import React from 'react';
import { Link } from 'react-router-dom';

class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
    };
  }
  
  async componentDidMount() {
      const response = await fetch('http://localhost:8100/api/models/');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          models: data.models,
        });

        console.log(data);
        
      } else {
        console.error(response);
      }
  } 
      
  
  render() {
    return (
      <React.Fragment>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">add new vehicle model</Link>
          </div>
      <div className="container">
          <h1>Vehicle Models</h1>
          <table className="table table-striped">
          <thead>
              <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
              </tr>
          </thead>
          <tbody>
              {this.state.models.map(model => {
              return (
                  <tr key={model.id}>
                  <td>{ model.name }</td>
                  <td>{ model.manufacturer.name }</td>
                  <td>
                    <img src={ model.picture_url }/>
                  </td>
                  </tr>
              );
              })}
          </tbody>
          </table>
      </div>
      </React.Fragment>
      );
      }
}
  
    
    
    
  

export default VehicleList;