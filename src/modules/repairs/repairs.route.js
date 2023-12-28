import express from 'express'
import {
    findAllRepairs,
    createRepair,
    findOneRepair,
    updateRepair,
    deleteRepair
    } from './repairs.controller.js'
import { validExistRepair } from './repairs.middleware.js'
import { protect, restrictTo } from '../users/users.middleware.js'

export const router = express.Router()

router.use(protect)

router.route('/')
    .get(restrictTo("employee"), findAllRepairs)
    .post(createRepair)

router.route('/:id')
    .get(validExistRepair, restrictTo("employee"), findOneRepair)
    .patch(validExistRepair, restrictTo("employee"), updateRepair)
    .delete(validExistRepair, restrictTo("employee"), deleteRepair)