import {model, Schema} from 'mongoose'

const roomSchema = Schema({
    capacity:{
        numberOfAdults:{
            type: Number, 
            require: true,
            default: 1
        },
        numberOfChildren:{
            type: Number, 
            require: true,
            default: 0
        },
        numberOfPets: {
            type: Number, 
            require: true,
            default: 0
        },
        amountOfRooms: {
            type: Number, 
            require: true,
            default: 1
        }
    }, 
    date: {
        starDate:{
            type: Date,
            require: true
        },
        endDate:{
            type: Date,
            require: true
        }
    }, 
    price:{
        type: Number,
        require: true, 
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'hotel',
        require: true
    },
    reservation: {
        type: Schema.Types.ObjectId,
        ref:'reservation'
    }
}, {
    versionKey: false
    }
)

export default model('room', roomSchema);

