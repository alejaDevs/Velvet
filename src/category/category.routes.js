'use strict'

import { Router } from "express"
import { addCategory, updateCategory, listCategories, searchCategory, deleteCategory } from "./category.controller.js"

const api = Router()

api.post('/addCategory', addCategory)
api.put('/updateCategory/:id', updateCategory)
api.get('/listCategories', listCategories)
api.post('/searchCategory', searchCategory)
api.delete('/deleteCategory/:id', deleteCategory)

export default api