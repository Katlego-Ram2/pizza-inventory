# Pizza Inventory System

A full-stack inventory management system for pizza restaurants built with **Next.js 16**, **MongoDB**, and **Clerk** for authentication. The dashboard shows real-time statistics and allows CRUD operations for items, orders, and categories.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)  
- [Database Setup](#database-setup)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [License](#license)  

---

## Features

- User authentication with **Clerk** (Sign Up, Sign In, Sign Out).  
- Dashboard showing:
  - Total items  
  - Low stock items  
  - Orders today  
  - Revenue today  
- Manage **items**:
  - Create, Read, Update, Delete (CRUD)  
  - Edit details in forms  
- Manage **orders**:
  - CRUD operations  
  - Add, edit, remove items in an order  
  - Automatically calculate total amount  
- Manage **categories**:
  - List all categories  
- Modern responsive UI using **TailwindCSS**.  
- Real-time updates on frontend using API routes.  

---

## Tech Stack

- **Frontend:** Next.js 16, React 18, TailwindCSS, Clerk for auth  
- **Backend:** Next.js API routes, MongoDB (via `mongodb` package)  
- **Database:** MongoDB Atlas or local MongoDB  
- **Icons & UI Components:** Lucide Icons, Tailwind  

---

## Project Structure

pizza-inventory/
│
├─ app/
│  ├─ layout.tsx                    # Root layout with ClerkProvider, header, footer
│  └─ dashboard/
│     ├─ page.tsx                   # Dashboard home (stats cards, welcome message)
│     ├─ items/
│     │  ├─ page.tsx                # List all items
│     │  ├─ new/
│     │  │  └─ page.tsx            # Add new item
│     │  └─ [id]/
│     │     └─ page.tsx            # Edit/View single item
│     ├─ orders/
│     │  ├─ page.tsx                # List all orders
│     │  └─ [id]/
│     │     └─ page.tsx            # Edit/View single order
│     ├─ categories/
│     │  └─ page.tsx                # List all categories
│     ├─ reports/
│     │  └─ page.tsx                # Reports page
│     └─ settings/
│        └─ page.tsx                # Settings page
│
├─ components/
│  ├─ CardStats.tsx                 # Dashboard stats card
│  └─ (other UI components)        # Optional reusable components
│
├─ lib/
│  └─ mongodb.ts                    # MongoDB client setup
│
├─ pages/api/
│  ├─ items/
│  │  └─ [id].ts                    # GET, PUT, DELETE item
│  ├─ orders/
│  │  └─ [id].ts                    # GET, PUT, DELETE order
│  └─ categories.ts                  # GET categories
│
├─ public/
│  └─ (images, icons, favicon)      # Optional assets
│
├─ styles/
│  └─ globals.css                    # Tailwind / custom CSS
│
├─ .env                              # Environment variables for MongoDB and Clerk
├─ next.config.js                     # Next.js config
├─ package.json
└─ tsconfig.json                      # TypeScript config

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pizza-inventory.git
cd pizza-inventory


Install dependencies:

npm install


Create .env file in the root:

# MongoDB
MONGODB_URI= mongodb+srv://pizzashop_db_user:admin2025@pizza-pantry.kyzaw4b.mongodb.net/?appName=pizza-pantry


# Clerk 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c21vb3RoLW1hY2FxdWUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_uMFXPiKPHPsHeKX9oO8mGqd16cFao0BfhfYuuzFJ11


# App
NEXT_PUBLIC_APP_NAME=Pizza Inventory

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c21vb3RoLW1hY2FxdWUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_uMFXPiKPHPsHeKX9oO8mGqd16cFao0BfhfYuuzFJ11

Running the Project

Start the development server:

npm run dev


Open the app at http://localhost:3000.

Database Setup
MongoDB Collections:

items

{
  "_id": ObjectId,
  "name": "Margherita",
  "category": "Pizza",
  "unit": "pcs",
  "quantity": 50,
  "reorderThreshold": 10,
  "costPrice": 50,
  "createdBy": "Admin",
  "createdAt": ISODate,
  "updatedAt": ISODate
}


orders

{
  "_id": ObjectId,
  "orderNumber": "ORD-001",
  "customerName": "John Doe",
  "items": [
    { "name": "Margherita", "quantity": 2, "unitPrice": 50 },
    { "name": "Pepperoni", "quantity": 1, "unitPrice": 60 }
  ],
  "totalAmount": 160,
  "status": "Pending",
  "createdAt": ISODate,
  "updatedAt": ISODate
}


categories

{
  "_id": ObjectId,
  "name": "Pizza",
  "description": "All pizza types",
  "createdAt": ISODate
}

Usage

Navigate to /dashboard after logging in.

Use Items to add/edit/delete pizza inventory.

Use Orders to manage orders.

Use Categories to view and manage categories.

Dashboard cards dynamically fetch data from the database.

API Endpoints

GET /api/items/[id] – fetch item by ID

PUT /api/items/[id] – update item

DELETE /api/items/[id] – delete item

GET /api/orders/[id] – fetch order by ID

PUT /api/orders/[id] – update order

DELETE /api/orders/[id] – delete order

GET /api/categories – list all categories



MIT License

Copyright (c) 2025 Katlego Rampedi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
