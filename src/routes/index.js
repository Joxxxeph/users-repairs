import express from 'express'

import { router as usersRouter } from '../modules/users/users.route.js'
import { router as repairsRouter } from '../modules/repairs/repairs.route.js'

export const router = express.Router()

router.use('/users', usersRouter)
router.use('/repairs', repairsRouter)