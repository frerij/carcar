import React from 'react';

class SalesForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            autos: [],
            sales_people: [],
            customers: [],
            sold_cars: [],
            sales_price: '',
        };
        // this.handleSoldCarsChange = this.handleSoldCarsChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.customers
        delete data.sales_people
        delete data.autos
        delete data.sold_cars

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                },
        };
        
        const response = await fetch(salesUrl, fetchConfig);
        console.log(response);
        
        if (response.ok) {
            const newSale = await response.json();
            
            const cleared = {
              autos: [],
              sales_people: [],
              customers: [],
              sold_cars: [],
              sales_price: '',
            };

            this.setState(cleared);
      
            // window.location.reload(false);

          }
        }

    // handleSoldCarsChange(event){
    //   const value = event.target.value;
    //   this.setState({sold_cars: value})
    //   }

    handleAutomobileChange(event) {
      const value = event.target.value;
      this.setState({automobile: value})
      }

    handleSalesPersonChange(event) {
      const value = event.target.value;
      this.setState({sales_person: value})
      }

    handleCustomerChange(event) {
      const value = event.target.value;
      this.setState({customer: value})
      }

    handleSalePriceChange(event) {
      const value = event.target.value;
      this.setState({sales_price: value})
      }

    async getAutomobileData() {
        const url = "http://localhost:8100/api/automobiles/";
    
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            
            this.setState({autos: data.autos});
            console.log("this is the list of cars", this.state)
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

    async getCustomerData() {
        const url = "http://localhost:8090/api/customer";
    
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            this.setState({customers: data.customers});
        }
    }

    // async getSoldCars() {
    //   const response = await fetch("http://localhost:8090/api/sales");
    //   if(response.ok) {
    //     const data = await response.json();
    //     this.setState({sold_cars: data.sales})
    //     console.log("this is the list of sold", this.state)
    //   }
    // }
    
    async componentDidMount() {
        this.getAutomobileData()
        this.getSalesPersonData() 
        this.getCustomerData()
        // this.getSoldCars()
    }

  render() {
    // let combinedData = [...this.state.sold_cars, ...this.state.autos];
    // console.log("this is the combinedData", combinedData)
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={this.handleSubmit} id="create-sale-form">
              <div className="form-floating mb-3">
              <select onChange={this.handleAutomobileChange} value={this.state.auto} required id="auto" name="auto" className="form-select">
                  <option value="">Choose an Automobile</option>
                  {this.state.autos.filter(auto => auto.sold === false).map(auto => {
                    return (
                      <option key={auto.vin} value={auto.href}>
                            {auto.year}, {auto.color} {auto.model.name} 
                      </option>
                    );
                  })}
                    
                  
                  {/* {Object.entries(combinedData).map(([sold, auto]) => {
                    console.log("this is auto", auto)
                    console.log("this is sold", sold)
                    if (!(auto.vin in sold))
                        <option key={auto.vin} value={auto.href}>
                            {auto.year}, {auto.color} {auto.model.name} 
                        </option>
                    })} */}

                </select>
              </div>
              <div className="form-floating mb-3">
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
              </div>
              <div className="form-floating mb-3">
              <select onChange={this.handleCustomerChange} value={this.state.customer} required id="customer" name="customer" className="form-select">
                  <option value="">Choose a customer</option>
                  
                  {this.state.customers.map(customer => {
                        return (
                        <option key={customer.phone_number} value={customer.phone_number}>
                            {customer.name}
                        </option>
                        );
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleSalePriceChange} value={this.state.sales_price} placeholder="Sale Price" required type="text" name="sales_price" id="sales_price" className="form-control"/>
                <label htmlFor="sales_price">Sale Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesForm;
