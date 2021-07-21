import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import {useRouter} from 'next/router'

import { Card } from 'react-bootstrap'
// import Img from '../../public/urbanservicaza(1).png'

const ServiceItem = ({service, handleCheck}) => {
  
    
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`service/${service.id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                onClick={() => dispatch(addToCart(service, cart))} 
                >
                    Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`create/${service.id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>Edit</a>
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft: '5px', flex: 1}}
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: service.id, 
                        title: service.title, type: 'DELETE_PRODUCT' 
                    }]
                })} >
                    Delete
                </button>
            </>
        )
    }

    return(
        <div className="card" style={{ width: '18rem' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={service.checked}
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(service.id)} />
            }
            <img className="card-img-top" src={service.images[0].url}   alt='service image' />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={service.title}>
                    {service.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">₹{service.price}</h6>
                 
                </div>

                <p className="card-text" title={service.description}>
                    {service.description}
                </p>
                    
                <div className="row justify-content-between mx-0">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    )
}
    



export default ServiceItem