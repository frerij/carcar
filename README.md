# CarCar

Team:

* Jordan Frerichs - Service
* Jaiden Sy - Sales

## Design
    On opening the site, the user should be able to access all pages from the navbar. There will be dropdowns for the main links which allow access to related pages. 

    Link layout:
        Inventory
            - Manufacturers
            - New manufacturer
            - Vehicles
            - New vehicle
            - Automobiles
            - New automobile

        Sales
            - Add new sale
            - List of sales
            - Salesperson history
            - New salesperson
            - New customer

        Service
            - New appointment
            - Appointments
            - Service history
            - New technician
            - Technicians

    On each page that lists information (appointments/sales etc), there will also be a button to access the create forms for those pages.

## Service microservice

Explain your models and integration with the inventory
microservice, here.

This microservice needs to:
    Create:
        - technicians
        - appointments
    Assign:
        - appointment statuses (cancelled or finished)
        - technicians to appointments
    Track:
        - appointments marked as finished

To do this, I created models for Technician, Appointment, and AutomobileVO which gets information from the inventory microservice by polling. 


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
