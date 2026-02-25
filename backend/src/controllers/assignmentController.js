import { createRequire } from 'module';
import { query } from '../db/postgres.js';

const require = createRequire(import.meta.url);
const assignments = require('../seed/assignments.json');

const getAll = async (req, res, next) => {
    try {
        const difficulty = req.query.difficulty;
        let filtered = assignments;

        if (difficulty) {
            filtered = assignments.filter(
                (a) => a.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        }

        const lightweight = filtered.map(({ id, title, difficulty, description }) => ({
            id,
            title,
            difficulty,
            description,
        }));

        res.json(lightweight);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const assignment = assignments.find((a) => a.id === id);

        if (!assignment) {
            return res.status(404).json({ error: `Assignment with id "${id}" not found.` });
        }

        let tableData = null;

        if (assignment.sampleTable) {
          tableData = await getSampleTableData(assignment.sampleTable);
        }
        
        res.json({
          ...assignment,
          tableData,
        });
    } catch (err) {
        next(err);
    }
};

const ALLOWED_SAMPLE_TABLES = ['employees', 'departments', 'customers', 'orders'];

const getSampleTableData = async (tableName) => {
    if (!tableName || !ALLOWED_SAMPLE_TABLES.includes(tableName)) {
      return null;
    }
  
    try {
      const result = await query(`SELECT * FROM ${tableName} LIMIT 10`);
      return {
        columns: result.fields.map((f) => f.name),
        rows: result.rows,
      };
    } catch (err) {
      console.warn(`Skipping sample data for table "${tableName}":`, err.message);
      return null; // 👈 graceful fallback
    }
  };

export { getAll, getById };
