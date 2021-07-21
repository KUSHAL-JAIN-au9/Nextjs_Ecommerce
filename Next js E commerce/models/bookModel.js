import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    name: String,
    mobile: String,
    location: String,
    email: Array,
    service:String,
    price: Number,
    paymentId: String,
    method: String,
    delivered: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    dateOfPayment: Date
}, {
    timestamps: true
})

let Dataset = mongoose.models.book || mongoose.model('book', bookSchema)
export default Dataset