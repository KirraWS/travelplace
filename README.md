# 🌍 TravelPlace

**TravelPlace** is a simple web application that allows users to explore and book unique places to stay. Users can browse available stays, add new ones, and view details about each location.

---

## ✨ Features

✔️ View a list of stays with name, location, descriptions, and date  
✔️ Add a new stay with details such as name, location, descriptions, and date   
✔️ Backend API with PostgreSQL for storing stays  
✔️ Frontend built using HTML, CSS, and JavaScript  
✔️ Backend powered by Express.js and PostgreSQL  

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **Hosting**: Locally  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd TravelPlace
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
DATABASE_URL=your_postgresql_connection_string
PORT=10000
```

### 4️⃣ Start the Server
```sh
npm start
```
The server should now be running at [http://localhost:10000](http://localhost:10000) 🎉

---

## 📂 Project Structure
```
TravelPlace/
│   # Static frontend files (HTML, CSS, JS)
│   ├── index.html   # Main frontend page
│   ├── style.css    # Stylesheet
│   ├── script.js    # Frontend logic
│── server.js        # Express.js backend server
│── package.json     # Project metadata and dependencies
│── .env             # Environment variables
```

---

## 🌐 API Endpoints

### 🔹 GET `/stays`
Returns a list of all stays from the database.
```json
[
  id: 2,
  name: 'ELAINE PHAM',
  location: 'Florida',
  description: 'asdad',
  date: 2025-02-21T06:00:00.000Z
}
]
```

### 🔹 POST `/stays`
Adds a new stay to the database.

**Request Body (JSON)**
```json
{
  name: 'ELAINE PHAM',
  location: 'Florida',
  description: 'asdad',
  date: '2025-02-21'
}
```

**Response**
```json
✅ Inserted Successfully: {
  id: 2,
  name: 'ELAINE PHAM',
  location: 'Florida',
  description: 'asdad',
  date: 2025-02-21T06:00:00.000Z
}
```

---

## 🔧 Troubleshooting

### ❓ Database Not Connecting?
✔️ Ensure your `.env` file has the correct `DATABASE_URL`  
✔️ Run `psql` and manually test connection:
```sh
psql your_postgresql_connection_string
```
✔️ Make sure the table `stays` exists:
```sh
SELECT * FROM stays;
```
✔️ If missing, create it:
```sql
CREATE TABLE stays (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Future Enhancements

✨ Implement user authentication  
✨ Add a booking system  
✨ Improve UI with better design and animations  

---

## 👤 Author
**Wahaj Fatima Siddiqui**  
Happy coding! 🚀

