import pkg from 'pg';
const { Client } = pkg;
export const queryDb = async ({query, params}) => {
  const client = new Client({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'db',
    port: 5432,
  });

  try {
    await client.connect();  // Connect to PostgreSQL
    const result = await client.query(query, params);  // Execute query
    return result.rows;  // Return the query result
  } catch (err) {
    console.error('Error querying PostgreSQL:', err);
    return null;  // Handle any errors
  } finally {
    await client.end();  // Close the connection
  }
}
