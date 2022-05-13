import React from 'react';
import { Link } from 'react-router-dom';

class AutomobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autos: [],
    };
  }
  
  async componentDidMount() {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          autos: data.autos,
        });

        console.log(data);
        
      } else {
        console.errpr(response);
      }
  } 
      
  
  render() {
    return (
      <React.Fragment>
      <div className="container">
          <h1>Vehicle Models</h1>
          <Link to="new">
          <button type="button" className="btn btn-sm btn-outline-secondary">
             add automobile
          </button>
          </Link>
          <table className="table table-striped">
          <thead>
              <tr>
              <th>Vin</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              </tr>
          </thead>
          <tbody>
              {this.state.autos.map(autos => {
              return (
                  <tr key={autos.vin}>
                  <td>{ autos.vin }</td>
                  <td>{ autos.color }</td>
                  <td>{ autos.year }</td>
                  <td>{ autos.model.name }</td>
                  <td>{ autos.model.manufacturer.name}</td>
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
  
    
    
    
  

export default AutomobileList;