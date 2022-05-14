import React from 'react';
import { Link } from 'react-router-dom';

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
  }
  
  async componentDidMount() {
      const response = await fetch('http://localhost:8090/api/sales/');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          sales: data.sales,
        }); 
      } else {
        console.error(response);
      }
  } 
      
  
  render() {
    return (
      <React.Fragment>
      <div className="container">
          <h1>All Sales</h1>
          <Link to="new">
          <button type="button" className="btn btn-sm btn-outline-secondary">
             add new sale
          </button>
          </Link>
          <table className="table table-striped">
          <thead>
              <tr>
              <th>Sales Person</th>
              <th>Employee Number</th>
              <th>Purchaser</th>
              <th>VIN</th>
              <th>Price</th>
              </tr>
          </thead>
          <tbody>
              {this.state.sales.map(sale => {
              return (
                  <tr key={sale.id}>
                  <td>{ sale.sales_person.name }</td>
                  <td>{ sale.sales_person.employee_number }</td>
                  <td>{ sale.customer.name }</td>
                  <td>{ sale.automobile.vin }</td>
                  <td>${ sale.sales_price }</td>
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
  
    
    
    
  

export default SalesList;