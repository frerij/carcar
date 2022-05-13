import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>

        <NavLink className="navbar-brand" to="manufacturers/">
          Manufacturers
        </NavLink>

        <NavLink className="navbar-brand" to="models/">
          Vehicles
        </NavLink>

        <NavLink className="navbar-brand" to="automobiles/">
          Automobiles
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarSalesLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </NavLink>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarSalesLink"
              >
                <li>
                  <NavLink className="dropdown-item" to="sales/new">
                    Add new Sale
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="sales/">
                    List of Sales
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="sales/history">
                    Sales Person History
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="sales/person">
                    New Salesman
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="sales/customer">
                    New Customer
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarSalesLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Service
              </NavLink>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarSalesLink"
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="service/appointments/new"
                  >
                    New Appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="service/appointments">
                    Appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="service/history">
                    Service History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="service/technicians/new"
                  >
                    New Technician
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="service/technicians">
                    Technicians
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
