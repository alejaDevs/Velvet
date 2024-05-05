import {Router} from 'express'
import {test, addReservation, deleteReservation, listReservations, searchReservations} from './reservation.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/add', [validateJwt], addReservation)
api.delete('/delete/:id', [validateJwt], deleteReservation)
api.get('/list', [validateJwt], listReservations)
api.post('/search', [validateJwt], searchReservations)

export default api