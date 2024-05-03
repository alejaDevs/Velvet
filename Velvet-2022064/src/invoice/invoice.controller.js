'use strict'
import Invoice from './invoice.model.js'
import Reservation from '../reservation/reservation.model.js'
import Event  from '../event/event.model.js'
import MethodOfPay from '../methodOfPay/methodOfPay.model.js'
import Hotel from '../Hotel/hotel.model.js'

export const test = async(req, res)=>{
    try {
        return res.send({message:'Invoice running...'})        
    } catch (error) {
        console.error(error)
    }
}

export const generated = async(req, res)=>{
    try {
        let data = req.body
        let {id} = req.user
        let {_id} = req.params
        data.date = new Date()
        data.user = id
        //Se busca la reservacion del usuario y se asigna los valores de la factura
        let reservationIn = await Reservation.findOne({userId: id},{hotelId:_id})
        data.reservation = {
            idReservation : reservationIn._id,
            subTotalRe : reservationIn.price
        }
        //Se busca el evento del usuario y se asigna a data
        let eventIn = await Event.findOne({user:id},{hotel:_id})
        data.event = {
            idEvent: eventIn._id,
            subTotalEv: eventIn.prices
        }
        //Se busca el metodo de pago del usuario y se asigna a data
        let payMethodIn = await MethodOfPay.findOne({userId:id})
        data.payMethod = payMethodIn._id
        //Se calcula el todal sumando cada subtotal de la resevacion y evento
        data.total = data.reservation.subTotalRe + data.event.subTotalEv
        let invoice = new Invoice(data)
        invoice.save()
        return res.send({message:'Invoice generated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error generating invoice', error})
    }
}

export const myInvoices = async(req, res)=>{
    try {
        let {id} = req.user
        let invoice = await Invoice.find({user:id})
        return res.send(invoice)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error displaying your invoices', error})
    }
}