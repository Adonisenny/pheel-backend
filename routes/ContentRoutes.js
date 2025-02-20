import express from 'express'
import { ContentController, getallContents, getContentControl } from '../controllers/contentController.js'

const router = express.Router()


router.post('/',ContentController)
router.get('/',getallContents)
router.get('/:id',getContentControl )

export default router;