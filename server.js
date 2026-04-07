const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let nextRestaurantId = 1;
let nextMenuId = 1;
let nextTableId = 1;
let nextOrderId = 1;

const restaurants = [];
const menus = [];
const tables = [];
const orders = [];

function findRestaurant(id) {
  return restaurants.find(r => r.id === Number(id));
}

function releaseTable(order) {
  const table = tables.find(t => t.id === order.tableId);
  if (table && table.currentOrderId === order.id) {
    table.status = 'available';
    table.currentOrderId = null;
  }
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id || req.params.restaurantId || req.params.menuId || req.params.orderId);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  next();
}

app.get('/', (req, res) => {
  res.json({ message: 'Restaurant Management API is running.' });
});

// Restaurants
app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/restaurants', (req, res) => {
  const { name, address, phone, cuisine } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required.' });
  }

  const restaurant = {
    id: nextRestaurantId++,
    name,
    address,
    phone: phone || null,
    cuisine: cuisine || null,
    createdAt: new Date().toISOString(),
  };

  restaurants.push(restaurant);
  res.status(201).json(restaurant);
});

app.get('/restaurants/:id', validateIdParam, (req, res) => {
  const restaurant = findRestaurant(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }
  res.json(restaurant);
});

app.put('/restaurants/:id', validateIdParam, (req, res) => {
  const restaurant = findRestaurant(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }

  const { name, address, phone, cuisine } = req.body;
  if (name) restaurant.name = name;
  if (address) restaurant.address = address;
  if (phone) restaurant.phone = phone;
  if (cuisine) restaurant.cuisine = cuisine;
  restaurant.updatedAt = new Date().toISOString();

  res.json(restaurant);
});

app.delete('/restaurants/:id', validateIdParam, (req, res) => {
  const index = restaurants.findIndex(r => r.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }
  restaurants.splice(index, 1);
  res.status(204).send();
});

// Menus
app.get('/restaurants/:restaurantId/menus', validateIdParam, (req, res) => {
  const restaurant = findRestaurant(req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }
  res.json(menus.filter(item => item.restaurantId === restaurant.id));
});

app.post('/restaurants/:restaurantId/menus', validateIdParam, (req, res) => {
  const restaurant = findRestaurant(req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }

  const { title, description, price, category } = req.body;
  if (!title || price == null) {
    return res.status(400).json({ error: 'Title and price are required.' });
  }

  const menu = {
    id: nextMenuId++,
    restaurantId: restaurant.id,
    title,
    description: description || null,
    price: Number(price),
    category: category || 'Main',
    createdAt: new Date().toISOString(),
  };

  menus.push(menu);
  res.status(201).json(menu);
});

app.put('/restaurants/:restaurantId/menus/:menuId', validateIdParam, (req, res) => {
  const restaurant = findRestaurant(req.params.restaurantId);
  const menu = menus.find(item => item.id === Number(req.params.menuId) && item.restaurantId === Number(req.params.restaurantId));

  if (!restaurant || !menu) {
    return res.status(404).json({ error: 'Menu item or restaurant not found.' });
  }

  const { title, description, price, category } = req.body;
  if (title) menu.title = title;
  if (description) menu.description = description;
  if (price != null) menu.price = Number(price);
  if (category) menu.category = category;
  menu.updatedAt = new Date().toISOString();

  res.json(menu);
});

app.delete('/restaurants/:restaurantId/menus/:menuId', validateIdParam, (req, res) => {
  const index = menus.findIndex(item => item.id === Number(req.params.menuId) && item.restaurantId === Number(req.params.restaurantId));
  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }
  menus.splice(index, 1);
  res.status(204).send();
});

// Tables
app.get('/tables', (req, res) => {
  res.json(tables);
});

app.post('/tables', (req, res) => {
  const { number, seats, location } = req.body;
  if (number == null || seats == null) {
    return res.status(400).json({ error: 'Table number and seats are required.' });
  }

  const table = {
    id: nextTableId++,
    number: Number(number),
    seats: Number(seats),
    location: location || 'General',
    status: 'available',
    currentOrderId: null,
    createdAt: new Date().toISOString(),
  };

  tables.push(table);
  res.status(201).json(table);
});

app.put('/tables/:id', validateIdParam, (req, res) => {
  const table = tables.find(t => t.id === Number(req.params.id));
  if (!table) {
    return res.status(404).json({ error: 'Table not found.' });
  }

  const { number, seats, location, status } = req.body;
  if (number != null) table.number = Number(number);
  if (seats != null) table.seats = Number(seats);
  if (location) table.location = location;
  if (status) table.status = status;
  table.updatedAt = new Date().toISOString();

  res.json(table);
});

app.delete('/tables/:id', validateIdParam, (req, res) => {
  const index = tables.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Table not found.' });
  }
  tables.splice(index, 1);
  res.status(204).send();
});

// Orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', validateIdParam, (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  res.json(order);
});

app.post('/orders', (req, res) => {
  const { restaurantId, tableId, items, customerName, status } = req.body;
  if (!restaurantId || !tableId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'restaurantId, tableId and at least one item are required.' });
  }

  const restaurant = findRestaurant(restaurantId);
  const table = tables.find(t => t.id === Number(tableId));
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found.' });
  }
  if (!table) {
    return res.status(404).json({ error: 'Table not found.' });
  }
  if (table.status === 'occupied') {
    return res.status(409).json({ error: 'Table is already occupied.' });
  }

  const order = {
    id: nextOrderId++,
    restaurantId: restaurant.id,
    tableId: table.id,
    items,
    customerName: customerName || 'Guest',
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  table.status = 'occupied';
  table.currentOrderId = order.id;
  res.status(201).json(order);
});

app.put('/orders/:id', validateIdParam, (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  const { items, customerName, status } = req.body;
  if (items) order.items = items;
  if (customerName) order.customerName = customerName;
  if (status) order.status = status;
  order.updatedAt = new Date().toISOString();

  if (status === 'completed' || status === 'cancelled') {
    releaseTable(order);
  }

  res.json(order);
});

app.post('/orders/:id/complete', validateIdParam, (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  if (order.status === 'completed') {
    return res.status(400).json({ error: 'Order is already completed.' });
  }
  if (order.status === 'cancelled') {
    return res.status(400).json({ error: 'Cancelled orders cannot be completed.' });
  }

  order.status = 'completed';
  order.updatedAt = new Date().toISOString();
  releaseTable(order);

  res.json(order);
});

app.delete('/orders/:id', validateIdParam, (req, res) => {
  const index = orders.findIndex(o => o.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  const order = orders[index];
  const table = tables.find(t => t.id === order.tableId);
  if (table) {
    table.status = 'available';
    if (table.currentOrderId === order.id) {
      table.currentOrderId = null;
    }
  }
  orders.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Restaurant Management API listening on port ${PORT}`);
});
