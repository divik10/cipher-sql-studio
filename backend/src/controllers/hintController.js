import { createRequire } from 'module';
import { GoogleGenerativeAI } from '@google/generative-ai';
console.log('Gemini key loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO');

const require = createRequire(import.meta.url);
const assignments = require('../seed/assignments.json');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getHint = async (req, res, next) => {
    try {
        const { assignmentId, currentQuery } = req.body;

        if (!assignmentId) {
            return res.status(400).json({ error: 'assignmentId is required.' });
        }

        const assignment = assignments.find((a) => a.id === String(assignmentId));
        if (!assignment) {
            return res.status(404).json({ error: `Assignment "${assignmentId}" not found.` });
        }

        const queryContext =
            currentQuery && currentQuery.trim().length > 0
                ? `The student's current SQL attempt:\n${currentQuery}`
                : 'The student has not written any SQL yet.';

        const prompt = `You are a SQL tutor helping a student practice SQL queries.

Assignment Title: ${assignment.title}
Difficulty: ${assignment.difficulty}
Task Description: ${assignment.description}

${queryContext}

Your task is to give the student a short, conceptual hint that nudges them in the right direction.

RULES — you MUST follow these strictly:
- Do NOT provide the full SQL solution.
- Do NOT write any SQL code or code snippets at all.
- Keep the hint to 2-3 sentences maximum.
- Be encouraging and educational.
- Focus on the SQL concept or clause they should think about, not the exact syntax.`;

const model = genAI.getGenerativeModel({
    model: 'models/gemini-1.5-flash',
});
        const result = await model.generateContent(prompt);
        const hint = result.response.text().trim();

        res.json({ hint });
    } catch (err) {
        if (err.message && err.message.includes('API_KEY')) {
            return res.status(500).json({ error: 'LLM service is not configured. Please set GEMINI_API_KEY.' });
        }
        next(err);
    }
};

export { getHint };
