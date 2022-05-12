import React from 'react';
import { Link } from 'react-router-dom';

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales_people: [],
      sales: [],
    };
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    this.handleSalesListChange = this.handleSalesListChange.bind(this);
  }
  

  handleSalesPersonChange(event) {
    const value = event.target.value;
    this.setState({sales_person: value})
  }

  handleSalesListChange(event) {
    const value = event.target.value;
    this.setState({sales: value})
  }
  
  async listSales(){
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
  
  async getSalesPersonData() {
    const url = "http://localhost:8090/api/salesperson";

    const response = await fetch(url);
    
    if (response.ok) {
        const data = await response.json();
        this.setState({sales_people: data.sales_people});
    }
}

  async componentDidMount() {
      this.listSales()
      this.getSalesPersonData()
  } 
      
  
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>Sales Person History</h1>
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
              {this.state.sales.filter(sale => sale.sales_person.employee_number === this.state.sales_person).map(sale => {
              return (
                  <tr key={sale.automobile.vin}>
                  <td>{ sale.sales_person.name }</td>
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