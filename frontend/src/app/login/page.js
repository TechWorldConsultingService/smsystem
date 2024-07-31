'use client'
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../components/logo/page';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import {loginSchema} from '../../constant/schema'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginDetails } from '../../redux/reducerSlices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Mock authentication
      // if (values.email === 'admin@example.com' && values.password === 'password') {
      //   // Store token in localStorage (for demonstration purposes)
      //   localStorage.setItem('token', 'fake-jwt-token');
      //   router.push('/dashboard');
      // } else {
      //   alert('Invalid credentials');
      // }

      loginUser(values)
    },
  });


  const loginUser = async(values)=>{
    try{
      const response = await axios.post('http://localhost:8000/api/login/', values);
      router.push('/studentdashboard')
      const data = await response.data
      
      if(response.status == 200) {
        const successMessage = data.msg || 'Login sucessful';
        toast.success(successMessage);
        dispatch(setLoginDetails(data))
      //   if (data.user.role=='student'){
      //     router.push('/studentdashboard')
      //   }else if (data.user.role ......=='teacher'){
      //     router.push('/teacherdashboard')
      //   }else if (data.user.role == 'master'){
      //     router.push('/masterdashboard')
      //   }else {
      //   router.push('/principaldashboard)
       //   }
      }else {
        const errorMessage = data.msg || 'Error login.';
        toast.error(errorMessage);
    }

    } catch (error) {
        toast.error('Network error or server is down');
    }
 
    }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-2">
        <Link href="/">
          <Image
            height={400}
            width={400}
            alt="photo"
            src="/image.jpeg"
            className="w-full h-auto object-cover"
          />
        </Link>
      </div>
      <div className="bg-white w-full md:w-1/2 flex items-center justify-center flex-col p-4 md:p-8">
        <Logo />
        <h1 className="text-3xl md:text-4xl font-semibold text-blue-600 mb-4">Welcome!</h1>
        <h2 className="text-lg md:text-xl mb-6">Please enter your details.</h2>
        <form className="w-full max-w-md flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col w-full rounded-sm overflow-hidden">
              <Input
                type="username"
                placeholder='User Name'
                variant="bordered"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                fullWidth
                startContent={<FaUser className="text-blue-400 mr-3" />}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="p-1 px-2 text-red-500 text-sm mt-1">{formik.errors.username}</div>
              )}
            </div>
            <div className="flex flex-col w-full rounded-md overflow-hidden align-items-center">
              <Input
                placeholder='Password'
                variant="bordered"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                startContent={<RiLockPasswordFill className="text-blue-400 mr-3 text-xl" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <div className="p-1 px-2 text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="bg-blue-600 text-white rounded-md overflow-hidden mt-6 w-[20%]">
              LOG IN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;