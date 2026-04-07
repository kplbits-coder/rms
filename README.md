# Restaurant Management API

A simple Node.js + Express backend API for managing restaurants, menus, tables, and orders.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the API:

```bash
npm start
```

Or run in development mode with auto-reload:

```bash
npm run dev
```

## API Endpoints

- `GET /restaurants`
- `POST /restaurants`
- `GET /restaurants/:id`
- `PUT /restaurants/:id`
- `DELETE /restaurants/:id`
- `GET /restaurants/:restaurantId/menus`
- `POST /restaurants/:restaurantId/menus`
- `PUT /restaurants/:restaurantId/menus/:menuId`
- `DELETE /restaurants/:restaurantId/menus/:menuId`
- `GET /tables`
- `GET /tables/:id`
- `POST /tables`
- `PUT /tables/:id`
- `DELETE /tables/:id`
- `GET /orders`
- `GET /orders/:id`
- `POST /orders`
- `PUT /orders/:id`
- `POST /orders/:id/complete`
- `DELETE /orders/:id`

## Testing the API

Use the included `api-requests.http` file with a REST client extension in VS Code, or run the commands below in a terminal while the server is running.

The order endpoint requires an existing restaurant and table, so create those first.

```bash
# 1) Create a restaurant first
curl -X POST http://localhost:4000/restaurants \
  -H "Content-Type: application/json" \
  -d '{"name":"Oceanview Bistro","address":"123 Harbor Lane","phone":"555-1234","cuisine":"Seafood"}'

# 2) Create a table
curl -X POST http://localhost:4000/tables \
  -H "Content-Type: application/json" \
  -d '{"number":5,"seats":4,"location":"Patio"}'

# 3) Create a menu item for restaurant 1
curl -X POST http://localhost:4000/restaurants/1/menus \
  -H "Content-Type: application/json" \
  -d '{"title":"Grilled Salmon","description":"Served with seasonal vegetables","price":22.5,"category":"Entree"}'

# 4) Create an order (restaurantId 1 and tableId 1 must exist)
curl -X POST http://localhost:4000/orders \
  -H "Content-Type: application/json" \
  -d '{"restaurantId":1,"tableId":1,"items":[{"menuId":1,"quantity":2}],"customerName":"Alex","status":"pending"}'

# 5) Update the order using PUT (change status, customer, or items)
curl -X PUT http://localhost:4000/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed","customerName":"Alex Smith"}'

# 6) Verify the table status is updated
curl http://localhost:4000/tables

# 7) Retrieve all orders
curl http://localhost:4000/orders
```

## Notes

- This implementation uses in-memory storage. Restarting the server resets all data.
- You can extend it with a database like SQLite, PostgreSQL, or MongoDB.
