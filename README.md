# Grocery List Application

A REST API built with Express, TypeScript, and Prisma for managing grocery lists and items.

## Getting Started

### 1. Set up a Prisma Postgres database

Follow these steps to create your Prisma Postgres database:

1. Log in to [Prisma Data Platform](https://console.prisma.io/)
2. Create a new project and set up a Postgres database
3. Copy your `DATABASE_URL` for the next steps

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
DATABASE_URL="your-database-url-here"
PORT=4000 # optional, defaults to 4000
```

### 4. Database Setup

Create the database tables by running:

```bash
npx prisma migrate dev --name init
```

### 5. Running the Server

Development mode with hot reload:
```bash
npm run server
```

## API Endpoints

### Grocery Lists
- `GET /grocery-lists` - Get all grocery lists
- `POST /grocery-lists` - Create a new grocery list
- `GET /grocery-lists/:id` - Get a specific grocery list

### Items
- `GET /grocery-lists/:id/items` - Get all items in a list
- `POST /grocery-lists/:id/items` - Add an item to a list
- `PUT /grocery-lists/:id/items/:itemId` - Update an item
- `DELETE /grocery-lists/:id/items/:itemId` - Delete an item
- `PUT /grocery-lists/:id/items/:itemId/purchase` - Mark item as purchased
- `PUT /grocery-lists/:id/items/:itemId/unpurchase` - Mark item as unpurchased

## Technologies Used

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
