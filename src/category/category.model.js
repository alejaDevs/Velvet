import {Schema, model} from 'mongoose'

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Enter the name of the category']
    },
    description: {
        type: String,
        required: [true, 'Enter the category description']
    }
},{
    versionKey: false
})

export default model('category', categorySchema)