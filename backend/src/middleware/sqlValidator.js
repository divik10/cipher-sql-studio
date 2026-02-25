const BLOCKED_PATTERNS = [
    /\bDROP\b/i,
    /\bDELETE\b/i,
    /\bINSERT\b/i,
    /\bUPDATE\b/i,
    /\bALTER\b/i,
    /\bTRUNCATE\b/i,
    /\bCREATE\b/i,
    /\bGRANT\b/i,
    /\bREVOKE\b/i,
    /\bEXECUTE\b/i,
    /\bEXEC\b/i,
    /\bPG_READ_FILE\b/i,
    /\bPG_WRITE_FILE\b/i,
    /\bCOPY\b/i,
    /--/,
    /\/\*/,
];

const sqlValidator = (req, res, next) => {
    const { sql } = req.body;

    if (!sql || typeof sql !== 'string') {
        return res.status(400).json({ error: 'A SQL query string is required.' });
    }

    const trimmed = sql.trim();

    if (trimmed.length === 0) {
        return res.status(400).json({ error: 'SQL query cannot be empty.' });
    }

    if (!/^SELECT\b/i.test(trimmed)) {
        return res.status(400).json({ error: 'Only SELECT statements are allowed.' });
    }

    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(trimmed)) {
            return res.status(400).json({ error: `Forbidden keyword or pattern detected in query.` });
        }
    }

    const statementCount = trimmed.split(';').filter((s) => s.trim().length > 0).length;
    if (statementCount > 1) {
        return res.status(400).json({ error: 'Multiple SQL statements are not allowed.' });
    }

    next();
};

export default sqlValidator;
