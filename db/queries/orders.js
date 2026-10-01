import db from "#db/client";

export async function createOrder({ date, note, userId }) {
  const sql =
    "INSERT INTO orders(date, note, userId) VALUES ($1, $2, $3) RETURNING * ";
  const {
    row: [order],
  } = await db.query(sql, [date, note, userId]);
  return order;
}

export async function getOrder() {
  const sql = "SELECT * FROM orders";
  const { rows: order } = await db.query(sql);
  return order;
}

export async function getOrderById(id) {
  const sql = "SELECT * FROM orders WHERE id = $1";
  const { rows: order } = await db.query(sql, [id]);
  return order;
}

export async function getOrderByProductId(id) {
  const sql =
    "SELECT orders.* FROM orders JOIN products_orders ON orders.id = products_orders.order_id WHERE products_orders.products_id = $1";
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}
