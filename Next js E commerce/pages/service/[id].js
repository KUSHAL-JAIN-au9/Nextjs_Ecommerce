import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

import {fetchVideo } from '../../redux/actions/CurrentService.actions'

import { useSelector,useDispatch } from 'react-redux'
import {useRouter} from 'next/router'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const router = useRouter()

    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, notify } = state

    const service = useSelector(state => state.currentServiceState.service)
  

    const disspatch = useDispatch()
 

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }


    useEffect(() => {
        disspatch(fetchVideo(router.query.id))
      },[router.query.id])

    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img src={ service?.images[tab].url } alt={ service?.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {service?.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{service?.title}</h2>
                <h5 className="text-danger">₹{service?.price} </h5>

             

                <div className="my-2">{service?.body}</div>
                {/* <div className="my-2">
                    {product.content}
                </div> */}

              
                <button type="button" className="btn btn-dark d-block my-3 px-5"
                onClick={() =>{

                    if(auth.user)
                    return router.push(`/BookingsPage?id=${service?.id}`)

                  if(!auth.user)  
                   dispatch({ type: 'NOTIFY', payload: {error:'Please Sign In to Book this Service'} })
                   return router.push('/signin')
                }
                }
                 >
                   <a> BOOK NOW!</a>
                </button>
     

            </div>
        </div>
    )
}

// export async function getServerSideProps({params: {id}}) {

//     const res = await getData(`product/${id}`)
//     // server side rendering
//     return {
//       props: { product: res.product }, // will be passed to the page component as props
//     }
// }


export default DetailProduct