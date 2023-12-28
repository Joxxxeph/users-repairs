import express from 'express'
import {router} from './routes/index.js'
import { AppError } from './common/error/appError.js'
import { globalErrorHandler } from './common/error/error.controller.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// rutas
app.use('/api/v1', router)

app.all('*', (res, req, next) => {
  return next (new AppError(`${req.originalUrl}, not found`, 404))
})

app.use(globalErrorHandler)

export default app