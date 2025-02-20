import express from 'express'
import { getThreadController, ThreadController } from '../controllers/threadController.js'



const router = express.Router()

router.post('/', ThreadController)
router.get('/:myid', getThreadController)


export default router;