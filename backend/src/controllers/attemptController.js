import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
    {
        assignmentId: { type: String, required: true },
        sql: { type: String, required: true },
        success: { type: Boolean, required: true },
        rowCount: { type: Number, default: 0 },
        errorMessage: { type: String, default: null },
    },
    { timestamps: true }
);

const Attempt = mongoose.model('Attempt', attemptSchema);

const saveAttempt = async (req, res, next) => {
    try {
        const { assignmentId, sql, success, rowCount, errorMessage } = req.body;

        if (!assignmentId || !sql) {
            return res.status(400).json({ error: 'assignmentId and sql are required.' });
        }

        const attempt = await Attempt.create({
            assignmentId,
            sql,
            success: Boolean(success),
            rowCount: rowCount || 0,
            errorMessage: errorMessage || null,
        });

        res.status(201).json({ id: attempt._id, createdAt: attempt.createdAt });
    } catch (err) {
        next(err);
    }
};

const getAttempts = async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        const attempts = await Attempt.find({ assignmentId })
            .sort({ createdAt: -1 })
            .limit(20)
            .select('-__v');

        res.json(attempts);
    } catch (err) {
        next(err);
    }
};

export { saveAttempt, getAttempts };
