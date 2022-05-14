# CarCar

Team:

* Jordan Frerichs - Service
* Jaiden Sy - Sales

## Design
On opening the site, the user should be able to access all pages from the navbar. There will be dropdowns for the main links which allow access to related pages. 

Domain visual: https://excalidraw.com/#json=tWBUkH7u5-ACP4GvCmEh2,MWE7VlrCrqU0RzQR4UtYHQ

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

This microservice needs to create technicians and appointments; assign technicians to appointments and assign cancelled or finished statuses to appointments; and track appointments that are marked as finished.

I approached this by first establishing what models were needed and what information they needed to keep track of, example: the appointment model needed an owner name, vin number, date and time, a reason, finish status, and to access the technicians in order to assign a tech to appointments as they are created.

    Models:
        Appointment - populated by form inputs
            - Owner
            - VIN
            - Date and time
            - Assigned technician (foreign key to Technician model)
            - Reason
            - VIP status
            - Finished status

        Technician - populated by form inputs
            - Name
            - Employee ID

        AutomobileVO - populated from poller
            - VIN
            - Year
            - Color

Although everything is functioning, I think there are some areas where I could be more concise/efficient like where I render the appointment table. I want to find a better way of rendering the VIP appointments followed by the regular appointments. I think this could be accomplished by writing a function to call within the render/return statement rather than repeating the table html with the filtered data. 

## Sales microservice

The Sales Microservice
in its own bounded context, handles:
- Creation and View of Sales
- Creation of Customers
- Creation and View of Sales People

it interacts with:
- Automobile
    from inventory microservice through the use of poller and storing in VO's
    - Vehicle > Manufacturer

I can create Sales entities
Using the Value Objects:
- Customers
- Sales
- AutomobileVO
    - VehicleVO>ManufacturerVO


I created 6 models. 3 of them are entirely new:
- Sale
- Customer
- Salesperson
While the other 3 are to store polled data from the inventory microservice: 
- AutomobileVO
- ManufacturerVO
- VehicleVO

Using the three 'new' models, I can create new customers, salespeople, and new sales.

When creating a new sale, you must input existing automobiles from the inventory microservice, as well as existing customers and salespeople from the sales microservice.

The polled data is used to get existing cars, which contains a field: *vehicle*, which contains a field: *manufacturer*. This is why I decided to create 3 Value Objects in my microservice to poll for and store Automobile > Vehicle > Manufacturer.

One of the biggest challenges I had working on this project was implementing the feature that "sold" cars will not be listed when filling out a new sale form. This was challenging because the list that is pulled from the form is directly from the inventory microservice. I tried some inital fixes to this, and managed to get a working view to set the attribute 'sold' on my automobileVO to true, and the filter on the sales page worked. However, because my automobileVO was polling from the automobile object in inventory, it would eventually get overwritten with the data from the inventory microservice. I managed to find another way around this without even using the 'sold attribute', I created a list to display the vins from my Sales List, and i compared the vins to the list of automobiles to filter the ones that are not on my sales list.

If I were to do something differently, it would be testing components sooner, and setting smaller goals throughout the day instead of one major goal for the entire day. I think testing functionality of just one request like doing a get request for sales, before trying to do all of the other functionality would make it easier to keep track of mistakes and be able to move forward easier instead of back tracking through everything I wrote that day and looking for the problems. Thinking back at the mistakes I made and the mistakes my partner made, we could've avoided asking for help if we looked ever so slightly harder at ALL of the code we wrote and understanding how a javascript page is displayed, and making sure that every step of that process was working properly.

During this project I moved from page to page trying to write all the code needed, as opposed to aiming to get smaller functionality. I think that working differently compared to how I did this time would be beneficial for ensuring I could easily deal with errors as they came up. This time around I worked by making all models > creating all views > testing views in insomnia > creating all javascript > linking it through Route > Testing it. Moving forward, I want to instead look at the project more like: create SalesPerson Model > create a view > test view > create another view > test view > create js for one view > test... etc- I believe setting smaller goals throughout the day instead of trying to finish all of the same 'parts' ie 'all models, all views, all javascript' in one day, will be better for my workflow and help my understanding from writing code from start to finish multiple times in one project.

