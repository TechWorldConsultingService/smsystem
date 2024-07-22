'use client'
import React from 'react'
import {Input} from "@nextui-org/react";
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import {Button} from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../logo/page';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik} from 'formik';
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email format')
      .required('Email is required.'),
  password: Yup.string()
      .min(8, 'Password must be at least 8 characters long.')
      .required('Password is required.'),
});


const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validationSchema:loginSchema,
    onSubmit: values => {
    alert(JSON.stringify(values))
    }
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='flex w-full h-screen'>
    <div className='w-1/2 flex items-center justify-center'>
    <Link href="/">
       <Image 
       height={500}
      width={500}
      alt="photo"
      src="/image.jpeg"
    /></Link>
    </div>
    <div className='bg-white  w-1/2  flex items-center justify-center flex-col'>
      <Logo/>
      <h1 className='text-4xl font-semibold text-blue-400 '>Welcome!</h1>
      <h1 >Plese enter your details.</h1>
      <form className='w-full flex items-center justify-center flex-col' onSubmit={formik.handleSubmit}>
      <div className='object-left space-y-4 w-[70%]'>
      <div className='flex mt-4  '>
        <FaUser className='text-blue-400 m-4 ' /> 
        <div className='flex flex-col w-full'>
        <Input 
              type="email" 
              label="Email"  
              variant="bordered"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email} 
              />
              {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm ">{formik.errors.email}</div>
                ) : null}
                </div>
        </div>
        <div className='flex'>
        <RiLockPasswordFill  className='text-blue-400 m-4 text-xl'/>
        <div className='flex flex-col w-full'>
        <Input
              label="Password"
              variant="bordered"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      />
       {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
        </div>
        </div>
        </div>
        <Button type="submit" className='bg-blue-400 text-white rounded-lg mt-6'>
      LOG IN
    </Button>
   </form>
    </div>
    </div>  
  )
}

export default Login