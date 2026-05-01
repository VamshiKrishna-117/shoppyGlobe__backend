# ShoppyGlobe Backend API

A RESTful backend API for the ShoppyGlobe e-commerce application built with Node.js, Express, and MongoDB.

## GitHub Repository
https://github.com/VamshiKrishna-117/shoppyGlobe__backend.git

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/VamshiKrishna-117/shoppyGlobe__backend.git
cd shoppyGlobe__Backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
MONGO_URI=mongodb://localhost:27017/shoppyglobe
PORT=5000
JWT_SECRET=shoppyglobe_secret_key_2024
```

4. Seed the database with sample products
```bash
node seeds/productSeeds.js
```

5. Start the development server
```bash
npm run dev
```

## API Endpoints

### Products (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get a single product by ID |

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get JWT token |

### Cart (Protected - Requires JWT Token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get all cart items |
| POST | /api/cart | Add a product to cart |
| PUT | /api/cart/:id | Update cart item quantity |
| DELETE | /api/cart/:id | Remove item from cart |

## Authentication

Cart routes are protected with JWT. To access them:

1. Register or login to get a token
2. Add the token to the request header:
```
Authorization: Bearer <your_jwt_token>
```

## Project Structure
```
shoppyGlobe__Backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── productController.js   # Product route handlers
│   ├── authController.js      # Auth route handlers
│   └── cartController.js      # Cart route handlers
├── middlewares/
│   ├── authMiddleware.js      # JWT verification
│   ├── errorHandler.js        # Centralized error handling
│   └── validateInput.js       # Input validation
├── models/
│   ├── Product.js             # Product schema
│   ├── User.js                # User schema
│   └── Cart.js                # Cart schema
├── routes/
│   ├── productRoutes.js       # Product routes
│   ├── authRoutes.js          # Auth routes
│   └── cartRoutes.js          # Cart routes
├── seeds/
│   └── productSeeds.js        # Sample product data
├── .env                       # Environment variables
├── .gitignore
├── server.js                  # Entry point
├── package.json
└── README.md
```

## MongoDB Collections

- **products** - Stores product data (name, price, description, stockQuantity)
- **users** - Stores registered users (name, email, hashed password)
- **carts** - Stores cart items (userId, productId, quantity)

## Error Handling

- Input validation on all routes
- Proper HTTP status codes (400, 401, 404, 500)
- Centralized error handling middleware
- JWT token validation and expiry handling

## Testing

All API routes have been tested using Thunder Client.
Screenshots of all API tests are available in the `/screenshots` folder.
