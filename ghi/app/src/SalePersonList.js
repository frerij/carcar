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

        console.log(data);
        
      } else {
        console.error(response);
      }
  } 
      
  
  render() {
    return (
      <React.Fragment>
            <select onChange={this.handleSalesPersonChange} value={this.state.sales_person} required id="sales_person" name="sales_person" className="form-select">
                  <option value="">Choose a sales person</option>
                  {this.state.sales_people.map(sales_person => {
                        return (
                        <option key={sales_person.employee_number} value={sales_person.employee_number}>
                            {sales_person.name}
                        </option>
                        );
                    })}
            </select>
      <div className="container">
          <h1>All Sales</h1>
          <table className="table table-striped">
          <thead>
              <tr>
              <th>Sales Person</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Sale Price</th>
              </tr>
          </thead>
          <tbody>
              {this.state.sales.filter(sale => sale.sales_person === employee).map(sale => {
              return (
                  <tr key={sale.id}>
                  <td>{ sale.sales_person.name }</td>
                  <td>{ sale.sales_person.employee_number }</td>
                  <td>{ sale.customer.name }</td>
                  <td>{ sale.automobile.vin }</td>
                  <td>{ sale.sales_price }</td>
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