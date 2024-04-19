'use strict'
import Review from './review.model.js'
import Hotel from '../Hotel/hotel.model.js'

export const test = async(req, res)=>{
    try {
        return res.send({message:'CRUD Review running'})
    } catch (error) {
        console.error(error)
    }
}

export const create = async (req, res) => {
    try {
        let { id } = req.params
        let { _id } = req.user
        let { stars, description } = req.body

        let review = new Review({ stars, description, user: _id, hotel: id })
        await review.save()

        let hotel = await Hotel.findById(id)
        if (!hotel) {
            return res.status(404).send({ message: 'Hotel not found' })
        }

        hotel.review.push(review._id)
        await hotel.save()
        return res.send({ message: 'Review created successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating review and adding to hotel', error: error.message })
    }
};

export const deleteReview = async(req, res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let deleteReview = await Review.findOne({_id:id, user: _id})
        if(!deleteReview) return res.status(401).send({message:'You can not delete a review you do not created'})
        let deletedReview = await Review.findOneAndDelete({_id:id})
        if(!deletedReview) return res.status(401).send({message:'Review not found and not deleted'})
        return res.send({message:`Review was deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting post'})
    }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let data = req.body
        let review = await Review.findOne({_id: id, user: _id})
        if(!review) return res.status(401).send({message: 'You can not update a review you not created || review do not exist'})
        let updatedReview = await Review.findOneAndUpdate({_id: review._id}, data, {new: true})
        if(!updatedReview) return res.status(401).send({message: 'Comment not found and not updated'})
        return res.send(updatedReview)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating review'})
    }
}
