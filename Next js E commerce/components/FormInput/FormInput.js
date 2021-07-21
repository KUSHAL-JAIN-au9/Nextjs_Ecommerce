import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { DataContext } from '../../store/GlobalState'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logger from "redux-logger";


const schema = yup.object().shape({
  Name: yup.string(),
  email: yup.string().email().required(),
  service: yup.string().required(),
  mobile: yup.number().required(),
  location: yup.string().required(),
  price: yup.string().required(),
});

export default function FormInput({service,value}) {

  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });


  const {state, dispatch} = useContext(DataContext)
  const { auth, notify, orders } = state

  // console.log(auth);


  const onSubmit = data => {
    const place =service.service.locations
    console.log(service);
  

    if ( place.includes(data.location)) {
      toast.success(`😍Booked Successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        setTimeout(() => {
          router.push('/')
        
      },3000);
      
    } else {
      toast.error('😞BOOKING UNSUCCESFULL!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }) 

        setTimeout(() => {
            router.push('/Error')
          
        },3000);
      
    }


        
    
  

  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>

      <label> Name:
      <input  type="text" name="name" defaultValue={auth.user?.name}  ref={register} readOnly />
      </label>
      <p>{errors.Name?.message}</p>

      <label> Email:
      <input  type="email" name="email" defaultValue={auth.user?.email}   ref={register} />
      </label>
      <p>{errors.email?.message}</p>

      <label  > Mobile Number:
      <input  type="number" name="mobile"  ref={register}  />
      </label>
      <p>{errors.mobile?.message}</p>

      <label> Service Booked:
      <input defaultValue={service.service?.title} type="text" name="service"  ref={register}  readOnly/>
      </label>
      <p>{errors.service?.message}</p>

      <label>Your  Location: 
    
      <input  type="text" name="location" 
      defaultValue={value}
      placeholder="Please Enable Your location Service to detect city"
       ref={register}  />
      </label>
      <p>{errors.location?.message}</p>
        

        <label  > Price:
      <input  type="number" name="price" defaultValue={service.service?.price} ref={register} readOnly />
      </label>
      <p>{errors.age?.message}</p>
      
      <input style={{width:"20vw",alignSelf:"center"}} type="submit" value="Confirm"  />
      <ToastContainer />
    </form>
  );
}

