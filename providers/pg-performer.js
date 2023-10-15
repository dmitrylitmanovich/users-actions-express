const db = require('./pg-connector');

export default async function performDatabaseOperation(query, values) {
  try {
    const result = await db.query(query, values);
    console.log(result.rows);
    return result;
  } catch (error) {
    console.error('Error performing database operation:', error);
  }
}
