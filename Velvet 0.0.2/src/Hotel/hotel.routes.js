import { Router } from "express";
import { add, deleteHotel, test, update } from "./hotel.controller.js";

const api = Router()

//AdminRoutes
api.get('/test', test)
api.post('/add',add)
api.delete('/delete/:id',deleteHotel)
api.put('/update/:id', update)
//UserRoutes

//PublicRoutes


export default api