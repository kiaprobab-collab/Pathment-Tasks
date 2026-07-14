# E-Commerce Backend API

A RESTful API for an e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. Features user authentication, product management, shopping cart, and order processing.



---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/kiaprobab-collab/Pathment-Tasks.git
cd ECommerceAPP/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and add your values:

```bash
cp .env.example .env
```

- `MONGO_URI` — MongoDB connection string 
- `JWT_SECRET` — Secret key for signing JWTs (e.g. `my_super_secret_key`)
- `JWT_EXPIRES_IN` — Token expiration time (e.g. `7d`)
- `NODE_ENV` — Environment mode (e.g. `development` or `production`)
- `PORT` — Server port (e.g. `3000`)

### 4. Start the server

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

---

## Authentication

All protected routes require a valid JWT token. The token is sent as an **httpOnly cookie** on login/register

---

## API Routes

### Auth — `/api/auth`

- **POST** `/api/auth/register` — Register a new user
- **POST** `/api/auth/login` — Login & get JWT token
- **GET** `/api/auth/logout` — Logout & clear cookie

**Register body:**
```json
{
  "username": "sumeet",
  "email": "sumeet@example.com",
  "password": "password123"
}
```

**Login body:**
```json
{
  "email": "sumeet@example.com",
  "password": "password123"
}
```

---

### Products — `/api/products`

- **GET** `/api/products` — Get all products
- **GET** `/api/products/:id` — Get a single product
- **POST** `/api/products` — Create a new product
- **PUT** `/api/products/:id` — Update a product (owner only)
- **DELETE** `/api/products/:id` — Delete a product (owner only)

**Create product body:**
```json
{
  "name": "Wireless Headphones",
  "description": "Noise-cancelling headphones with 30hr battery life",
  "price": 2999,
  "category": "Electronics",
  "stock": 50,
  "image": "https://example.com/headphones.jpg"
}
```

---

### Cart — `/api/cart`

- **GET** `/api/cart` — Get current user's cart
- **POST** `/api/cart` — Add item to cart
- **PUT** `/api/cart/:productId` — Update item quantity in cart
- **DELETE** `/api/cart/:productId` — Remove item from cart
- **DELETE** `/api/cart` — Clear entire cart

**Add to cart body:**
```json
{
  "productId": "665a1b2c3d4e5f6a7b8c9d0e",
  "quantity": 2
}
```

**Update quantity body:**
```json
{
  "quantity": 3
}
```

---

### Orders — `/api/orders`

- **POST** `/api/orders` — Place order from cart
- **GET** `/api/orders` — Get all orders for logged-in user
- **GET** `/api/orders/:id` — Get single order (owner only)
- **PATCH** `/api/orders/:id/status` — Update order status
- **PATCH** `/api/orders/:id/cancel` — Cancel a pending order

**Create order body:**
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "zipCode": "110001",
    "country": "India"
  }
}
```

**Update status body:**
```json
{
  "status": "shipped"
}
```

**Order statuses:** `pending` → `confirmed` → `shipped` → `delivered` | `cancelled`

