import connectDB from '../../../../utils/connectDB'
import Books from '../../../../models/bookModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await deliveredBook(req, res)
            break;
    }
}

const deliveredBook = async(req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: 'Authentication is not valid.'})
        const {id} = req.query


        const book = await Books.findOne({_id: id})
        if(book.paid){
            await Books.findOneAndUpdate({_id: id}, {delivered: true})
    
            res.json({
                msg: 'Updated success!',
                result: {
                    paid: true, 
                    dateOfPayment: order.dateOfPayment, 
                    method: book.method, 
                    delivered: true
                }
            })
        }else{
            await Books.findOneAndUpdate({_id: id}, {
                paid: true, dateOfPayment: new Date().toISOString(), 
                method: 'Receive Cash', delivered: true
            })
    
            res.json({
                msg: 'Updated success!',
                result: {
                    paid: true, 
                    dateOfPayment: new Date().toISOString(), 
                    method: 'Receive Cash', 
                    delivered: true
                }
            })
        }
        
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}