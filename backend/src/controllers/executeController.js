import { query } from '../db/postgres.js';

export const execute = async (req, res) => {
    const { sql } = req.body;
  
    try {
      const result = await query(sql);
  
      res.json({
        columns: result.fields.map((f) => f.name),
        rows: result.rows,
        rowCount: result.rowCount,
      });
    } catch (err) {
      console.error('SQL execution failed:', err.message);
  
      res.status(400).json({
        error:
          'Query execution failed. The database may be unavailable or the SQL is invalid.',
      });
    }
  };


