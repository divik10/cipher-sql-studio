import { Router } from 'express'
import { execute } from '../controllers/executeController.js'
import sqlValidator from '../middleware/sqlValidator.js'

const router = Router()

router.post('/', sqlValidator, execute)

export default router