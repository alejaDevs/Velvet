'use strict'

import Reservation from './reservation.model.js'
import Room from '../room/room.model.js'
import Hotel from '../Hotel/hotel.model.js'
import MethodOfPay from '../methodOfPay/methodOfPay.model.js'
import User from '../user/user.model.js'

export const test = async (req, res) => {
    try {
        return res.send({message: 'CRUD Reservation funcionando'})
    } catch (error) {
        console.error(error)
    }
}

export const addReservation = async (req, res) => {
    try {
        let {roomId, methodOfPay} = req.body
        let room = await Room.findById(roomId)
        if(!room) return res.send({message: 'Room not found'})
        let methodOfPayload = await MethodOfPay.findById(methodOfPay)
        if (!methodOfPayload) return res.send({message: 'Method of payment not found'})
        let authorId = req.user._id
        let idHotel = room.hotelId
        if (methodOfPayload.userId.toString() !== req.user._id.toString()) return res.status(403).message({message: 'This is not your payment method'})
        let newReservation = new Reservation({userId: authorId, hotelId:idHotel, roomId:roomId, methodOfPay:methodOfPay})
        await newReservation.save()
        await User.findOneAndUpdate(
            {_id: req.user._id},
            { $push: {reservation: newReservation._id}}
        )
        await Room.findOneAndUpdate(
            {_id: roomId},
            { $push: {reservation: newReservation._id}}
        )
        await MethodOfPay.findOneAndUpdate(
            {_id: methodOfPay},
            { $push: {reservation: newReservation._id}}
        )
        return res.status(200).send({ message: 'Reservation added successfully', newReservation})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function addReservation'})
    }
}

export const deleteReservation = async (req, res) => {
    try {
        let idReservation = req.params.id
         let reservationDelete = await Reservation.findById(idReservation) 
        if (!reservationDelete) return res.send({ message: 'Reservation not found' })
        if (reservationDelete.userId.toString() !== req.user._id.toString()) return res.send({ message: 'You dont have permission to delete this reservation'})
        await Reservation.findOneAndDelete({_id: idReservation}).
        populate({path: 'userId', select: 'name surname -_id'}).
        populate({path: 'hotelId', select: 'name -_id'}).
        populate({path: 'roomId', select: 'date -_id'})
        await User.findOneAndUpdate(
            {_id: req.user._id},
            { $pull: {reservation: idReservation}}
        )
        await Room.findOneAndUpdate(
            {_id: reservationDelete.roomId},
            { $pull: {reservation: idReservation}}
        )
        await MethodOfPay.findOneAndUpdate(
            {_id: reservationDelete.methodOfPay},
            { $pull: {reservation: idReservation}}
        )
        return res.status(200).send({ message: 'Your reservation was deleted successfully', reservationDelete})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function deleteReservation'})
    }
}

export const listReservations = async (req, res) => {
    try {
        let idUser = req.user._id
        let reservations = await Reservation.find({userId: idUser}).
            populate({path: 'userId', select: 'name surname -_id'}).
            populate({path: 'hotelId', select: 'name -_id'}).
            populate({path: 'roomId', select: 'date -_id'}).
            populate({path: 'methodOfPay', select: 'cardHolder -_id'})
        if (!reservations) return res.status(404).send({ message: 'You are not authorized to list this reservations or reservations not found'});
        return res.status(200).send({ message: 'Your reservations were listed successfully', reservations})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function listReservations'})
    }
}

export const searchReservations = async (req, res) => {
    try {
        let searchReservations = req.body.search
        if (!searchReservations) return res.status(404).send({ message: 'Search term is required in the request body' })
        const regex = new RegExp(searchReservations, 'i')
        let Iduser = req.user._id
        let hotels = await Hotel.find({name: {$regex: regex}})
        if (!hotels || hotels.length === 0) return res.status(404).send({ message: 'Hotels not found' })
        let hotelIds = hotels.map(hotel => hotel._id)
        let reservations = await Reservation.find({hotelId: {$in: hotelIds}, userId: Iduser}).
            populate({path: 'hotelId', select: 'name -_id'}).
            populate({path: 'roomId', select: 'date -_id'}).
            populate({path: 'userId', select: 'name surname -_id'}).
            populate({path: 'methodOfPay', select: 'cardHolder -_id'})
        if (!reservations || reservations.length === 0) return res.status(404).send({ message: 'Reservation not found'})
        return res.status(200).send({ message: 'Reservations found successfully', reservations})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function searchReservations'})
    }
}