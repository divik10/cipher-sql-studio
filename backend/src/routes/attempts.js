import { Router } from 'express'
import { saveAttempt, getAttempts } from '../controllers/attemptController.js'

const router = Router()

router.post('/', saveAttempt)
router.get('/:assignmentId', getAttempts)

export default router