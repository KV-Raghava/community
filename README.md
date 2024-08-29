# Community Development Project
## Overview
This project is a community development platform built using Node.js, Express, MongoDB, and other related technologies. It allows users to create posts, comment on them, and interact with other users in the community.

## Features
User Authentication
Create, Read, Update, and Delete (CRUD) operations for posts and comments
Flash messages for notifications
Session management with MongoDB
SCSS support for styling
Modular code structure
## Technologies Used
- Node.js 
- Express.js
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)
- SCSS (Sass)
- Passport.js (for authentication)
- Connect-flash (for flash messages)
- Connect-mongo (for session storage)
## Installation
Clone the repository:

```
git clone https://github.com/yourusername/community-development.git
cd community-development
```

Install dependencies:

```
npm install
```

Set up MongoDB:

Make sure MongoDB is installed and running on your machine. The application connects to a MongoDB instance running on localhost with the database name community_development.

Run the application:

```
npm start

```

The server will start running on the specified port (default is 3000).

## Configuration
### Database
The application uses MongoDB for data storage. The connection is established in the config/mongoose.js file:
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/community_development');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "error: connecting to db"));
db.once('open', function() {
    console.log("connected to db successfully");
});
```
### Session Management
Sessions are managed using express-session and stored in MongoDB using connect-mongo:
```
app.use(session({
    name: 'community',
    secret: 'filler', // Change this secret before deploying
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100), // in milliseconds
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err) {
        console.log(err || 'connect-mongodb setup ok');
    })
}));
```
### SCSS Middleware
The application uses node-sass-middleware to compile SCSS files to CSS:
```
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
```
### Folder Structure
project-root/
│
├── config/
│   └── config.js          # Configuration files (e.g., database config)
│
├── controllers/
│   └── userController.js  # Controller for user-related logic
│
├── middlewares/
│   └── authMiddleware.js  # Middleware for authentication
│
├── models/
│   └── user.js            # Mongoose user schema and model
│
├── routes/
│   └── userRoutes.js      # Routes for user-related endpoints
│
├── uploads/
│   └── users/
│       └── avatars/       # Directory for storing user avatars
│
├── utils/
│   └── fileHelper.js      # Utility functions for file handling
│
├── views/
│   └── index.ejs          # EJS templates for rendering views
│
├── .gitignore             # Git ignore file
├── app.js                 # Main application file
├── package.json           # NPM package file
└── README.md              # Project documentation
models/: Contains Mongoose models for User and Post.
routes/: Contains route definitions.
controllers/: Contains controller functions for handling requests.
config/: Contains configuration files for middleware and database.
views/: Contains EJS templates for rendering HTML.
assets/: Contains static files like CSS, JS, and images.
## Usage
Home Page
The home page displays a list of posts and users. It fetches posts and users from the database and renders them using EJS templates:
```
module.exports.home = function(req, res) {
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: 'user'
    }).then(posts => {
        User.find({})
        .then(users => {
            return res.render('home', {
                title: 'Home page',
                posts: posts,
                all_users: users
            });
        });
    }).catch(error => {
        console.log('error in fetching posts');
        return;
    });
};
```
## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or suggestions, please open an issue or contact the repository owner.

Thank you for using the Community Development Project!
