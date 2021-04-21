# Travel_Website

- Apply NodeJS, Express, Mongoose to dynamically render travel web pages pulled from an existing database. Functionality includes user login, travel package selection/creation, and updates.
- Front end created with PUG, HTML, and CSS.
- Please note .env file is hidden, so the database will not be linked up, but feel free to test https://travelsite-antony.herokuapp.com/ to view the website.
- Test a user with username a, password a. Test an admin with username b, password b


### Functionalities:

User/Login functionalities using passport with administrative rights for package editing/creation
Non-SQL MongoDB database
User purchase history documented package data
![main_location_demo](https://user-images.githubusercontent.com/77988513/113377107-999f4f80-9330-11eb-8d8d-64a6ac4c63e4.gif)
- User Functionalities: Users can login/register, and 'purchase' various travel packages. They can also view their previous packages they have purchased. There are admin functionalities for admins who would like to create brand new packages
- Travel Locations and Packages: Users can view filtered locations based on three continents, and view their respective travel packages (Users must be logged in to purchase). Packages can be created as well to add to or update the database. Outdated packages are filtered and no longer rendered
- Database: All pages are rendered based on the database data. The database logs user history, package history, and purchase history to allow for tracking of regularly purchased packages, and user preferences.
#### Modules Used:

Uses bootstrap and squadfree template. Also uses Bcrypt, Passport, Express, mongoose-unique-validator, mongoose
