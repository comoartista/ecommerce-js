# 3legent-shop

A simple e-commerce store built with vanilla JavaScript and Webpack. It includes a backend (Express) and Stripe Checkout integration for order processing.

---

## 🚀 Features

- Display products from backend  
- Add to cart and save items  
- Stripe Checkout integration  
- Responsive interface  
- Separated frontend / backend structure

---

## 🛠️ Technologies

- JavaScript (ES6+)
- HTML, SCSS
- Webpack
- Node.js + Express
- Stripe API
- Render (deployment)

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/comoartista/3legent-shop.git
cd ecommerce-js
```

### 2. Install dependencies

#### Frontend:

```bash
cd client
npm install
```

#### Backend:

```bash
cd server
npm install
```

### 3. Start the project

#### Frontend:

```bash
npm run dev
```

#### Backend:

```bash
npm run dev
```

> ⚠️ You need a `.env` file in the `server/` folder with your Stripe key, MongoDB URI and port:  
> Example:
> ```env
> NODE_ENV=development
> PORT=5001
> STRIPE_SECRET_KEY=your_stripe_secret
> MONGO_URI=your_mongo_atlas_connection_string
> ```

## 🌐 Deployment

- **Backend:** [https://ecommerce-js-2rb5.onrender.com](https://ecommerce-js-2rb5.onrender.com)

---

## 📁 Project Structure

```
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── js/
│   │   ├── scss/
│   │   ├── index.html, shop.html, etc.
│   ├── webpack.config.js
│   └── package.json
│
├── server/
│   ├── config/            # DB connection
│   ├── models/            # Mongoose schemas
│   ├── public/            # Static files (if any)
│   ├── routes/            # API routes
│   ├── server.js
│   └── package.json
│
├── README.md
```

---

## 📌 Author

- [@comoartista](https://github.com/comoartista)
