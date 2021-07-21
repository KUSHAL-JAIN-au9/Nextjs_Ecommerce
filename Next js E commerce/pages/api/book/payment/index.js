import connectDB from '../../../utils/connectDB'
import Books from '../../../models/orderModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createBook(req, res)
            break;
        case "GET":
            await getBook(req, res)
            break;
    }
}

const createBook = async (req, res) => {
    try {
        const result = await auth(req, res)

        let books;
        if(result.role !== 'admin'){
            books = await Books.find({user: result.id}).populate("user", "-password")
        }else{
            books = await Books.find().populate("user", "-password")
        }

        res.json({books})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createBook = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { name, mobile, email, service, location, price } = req.body

        const newBook = new Books({
            user: result.id, name, mobile, email, service, location,price
        })

        // cart.filter(item => {
        //     return sold(item._id, item.quantity, item.inStock, item.sold)
        // })

        await newBook.save()

        res.json({
            msg: 'Order success! We will contact you to confirm the order.',
            newBook
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

// const booked = async (id, quantity, oldInStock, oldSold) => {
//     await Products.findOneAndUpdate({_id: id}, {
//         inStock: oldInStock - quantity,
//         sold: quantity + oldSold
//     })
// }