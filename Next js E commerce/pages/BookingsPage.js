import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector,useDispatch } from 'react-redux'
import UseGeoLocation from '../components/custom Hooks/UseGeoLocation'
import  axios  from 'axios'
import config from '../config'
import { useRouter } from 'next/router'



import FormInput from '../components/FormInput/FormInput';
import { fetchVideo } from '../redux/actions/CurrentService.actions'




const BookingPage = (props ) => {
    const location = UseGeoLocation()
    const router = useRouter()
    console.log(router);
    const {lat,lng} = location.coordinates
    const { id } = router.query
    const [loc, Setloc] = useState("")

    const service =useSelector(state => 
        state.currentServiceState
    )

    const dispatch =useDispatch()
 
    useEffect(() => {

      location.loaded && axios.get(`${config.BASELOC_URL}key=${config.API_KEY}&lat=${lat}&lon=${lng}&format=json`)
      .then(res => {
        const address = res.data.address;
       Setloc(address.city ||address.village)
      })
      dispatch(fetchVideo(id))
    
    
    },[location,lat,lng,dispatch,id])



    return (
        <>

        <Head>
        <title>BOOKINGS PAGE</title>
      </Head>
        <div  style={{ backgroundColor:"white", width:"100%",height:"130vh", display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems:"center"}} > 
            <h1>Bookings Page</h1>
            <span className="confirm" >confirm Your booking</span>
            <FormInput
            value={loc}
            service ={service}
            />
        </div>
        </>
    )
}

export default BookingPage