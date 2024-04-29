import {Router} from 'express'
import {test, addRoom, updateRoom, deleteRoom, listRoom, searchRoom} from './room.controller.js'

const api = Router()

api.get('/test', test)
api.post('/add', addRoom)
api.put('/update/:id', updateRoom)
api.delete('/delete/:id', deleteRoom)
api.get('/list', listRoom)
api.post('/search', searchRoom)

export default api