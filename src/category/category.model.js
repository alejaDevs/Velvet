import {Schema, model} from 'mongoose'

const categorySchema = Schema({
    stars: {
        type: String,
        required: [true, 'Enter the stars']
    },
    nameCategory: {
        type: String,
        required: [true, 'Enter the name of the category']
    }
},{
    versionKey: false
})

export default model('category', categorySchema)