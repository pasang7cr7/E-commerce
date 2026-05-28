# E-Commerce Server Setup Cheatsheet

## Project Analysis
- **Stack:** Express 5 + Mongoose 9 + JWT + bcryptjs
- **Structure:** `Backend/` — server, app, config, middleware, models
- **Status:** Auth-ready (User model done), skeleton in place, deps installed

---

## 1. Init Project
```sh
npm init -y
```

## 2. Install Dependencies
```sh
npm install express mongoose dotenv cors helmet morgan bcryptjs jsonwebtoken
npm install -D nodemon
```

## 3. Folder Structure
```
Backend/
├── config/
│   ├── db.js
│   └── constants.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── user.js
├── routes/          # (add later)
├── controllers/     # (add later)
├── services/        # (add later)
├── app.js           # Express app setup
└── server.js        # Entry point
```

## 4. `.env`
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=secretkey
JWT_EXPIRES_IN=1d
```

## 5. `package.json` Scripts
```json
"scripts": {
  "start": "nodemon Backend/server.js"
}
```

## 6. `Backend/config/db.js`
```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 7. `Backend/config/constants.js`
```js
const ROLES = { ADMIN: "admin", CUSTOMER: "customer" };
```

## 8. `Backend/middleware/errorHandler.js`
```js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ Success: false, Message: err.message });
};
module.exports = errorHandler;
```

## 9. `Backend/models/user.js`
```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);
```

## 10. `Backend/app.js` — App Bootstrap Order
```js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

// 1. Security
app.use(helmet());
// 2. CORS
app.use(cors());
// 3. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 4. Logger
app.use(morgan("dev"));
// 5. Routes (placeholder)
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
// 6. Error handler (LAST)
app.use(errorHandler);

module.exports = app;
```

## 11. `Backend/server.js` — Entry Point
```js
const app = require("./app");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
```

## 12. Run
```sh
npm start
```
Server runs at `http://localhost:5000`  
Health check: `GET /api/v1/health`

---

## What's Next to Build (from project plan)
1. Auth routes + controller + JWT middleware + RBAC
2. Product model (variants, categories, status)
3. Cart model (persistent in DB)
4. Checkout session (snapshot pricing, expiry)
5. Inventory system (stock, reservation, release)
6. Order system (state machine: pending → paid → shipped → delivered)
7. Payment mock (payment intent, webhook simulation)
8. Wishlist model
9. Admin routes (product/order/inventory management)
10. Activity logs (events for orders, payments, inventory)

---

## Quick File Reference
| File | Path |
|------|------|
| Package config | `package.json` |
| Env vars | `.env` |
| App setup | `Backend/app.js` |
| Entry point | `Backend/server.js` |
| DB connection | `Backend/config/db.js` |
| Constants | `Backend/config/constants.js` |
| Error handler | `Backend/middleware/errorHandler.js` |
| User model | `Backend/Models/user.js` |
