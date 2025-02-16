TravelPlace

TravelPlace is a simple web application that allows users to explore and book unique places to stay. Users can view available stays, add new stays, and see details about each location.

Features

View a list of stays with images, descriptions, and ratings

Add a new stay with details such as name, location, description, image, and rating

Backend API with PostgreSQL database for storing stays

Frontend built using HTML, CSS, and JavaScript

Backend powered by Express.js and PostgreSQL

Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: PostgreSQL

Hosting: Render (for backend and database)

Installation & Setup

1. Clone the Repository

git clone <repository-url>
cd TravelPlace

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add:

DATABASE_URL=your_postgresql_connection_string
PORT=10000

4. Start the Server

npm start

Server should now be running at http://localhost:10000

Project Structure

TravelPlace/
│          # Static frontend files (HTML, CSS, JS)
│   ├── index.html   # Main frontend page
│   ├── style.css    # Stylesheet
│   ├── script.js    # Frontend logic
│── server.js        # Express.js backend server
│── package.json     # Project metadata and dependencies
│── .env             # Environment variables

API Endpoints

GET /stays

Returns a list of all stays from the database.

[
  {
    "id": 1,
    "name": "Cozy Cabin",
    "location": "Colorado, USA",
    "description": "A peaceful mountain retreat.",
    "image": "https://example.com/cabin.jpg",
    "rating": 5
  }
]

POST /stays

Adds a new stay to the database.

Request Body (JSON)

{
  "name": "Beach House",
  "location": "Malibu, CA",
  "description": "A luxurious stay by the ocean.",
  "image": "https://example.com/beachhouse.jpg",
  "rating": 5
}

Response

{
  "id": 2,
  "name": "Beach House",
  "location": "Malibu, CA",
  "description": "A luxurious stay by the ocean.",
  "image": "https://example.com/beachhouse.jpg",
  "rating": 5
}


Troubleshooting

Database Not Connecting?

Ensure your .env file has the correct DATABASE_URL

Run psql and manually test connection:

psql your_postgresql_connection_string

Make sure the table stays exists:

SELECT * FROM stays;

If missing, create it:

CREATE TABLE stays (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL
);

Future Enhancements

Implement user authentication

Add a booking system

Improve UI with better design and animations

Author

Wahaj Fatima Siddiqui
