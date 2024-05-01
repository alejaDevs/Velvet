'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name']
    },
    surname:{
        type: String,
        required: [true, 'Please enter your last name']
    },
    phone:{
        type: String,
        required: [true, 'Please enter your phone number'],
        maxLength: [15, 'The phone number cannot exceed 15 digits.'],
        minLength: [8, 'The phone number cannot be at least 8 digits long.']
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'They have already registered with this email']
    },
    DPI: {
        type: String,
        required: [true, 'Please enter your DPI'],
        unique: [true, 'They have already registered with this DPI'],
        maxLength: [13, 'The phone number cannot be at least 8 digits long.'],
        minLength: [13, 'The phone number cannot be at least 8 digits long.']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Please enter a password of at least 8 digits']
    },
    role:{
        type: String,
        enum:  ['ADMIN', 'CLIENT'],
        default: 'CLIENT'
    }, 
    methodOfPay: [{
        type: Schema.Types.ObjectId,
        ref:'methodOfPayload'
    }],
    reservation: [{
        type: Schema.Types.ObjectId,
        ref:'reservation'
    }] 
},{
    versionKey: false
})

export default model('user', userSchema)