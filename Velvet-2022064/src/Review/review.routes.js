'use strict'
import { Router } from "express"
import { create, deleteReview, update } from "./review.controller.js"
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

//Admin Routes


//User Routes
api.post('/new/:id',validateJwt, create)
api.put('/upd/:id',validateJwt ,update)
api.delete('/del/:id',validateJwt ,deleteReview)

export default api