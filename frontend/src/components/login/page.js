'use client'
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../logo/page';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import {loginSchema} from '../../constant/schema'



const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Mock authentication
      if (values.email === 'admin@example.com' && values.password === 'password') {
        // Store token in localStorage (for demonstration purposes)
        localStorage.setItem('token', 'fake-jwt-token');
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    },
  });

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
                type="email"
                label="Email"
                variant="bordered"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                fullWidth
                startContent={<FaUser className="text-blue-400" />}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="p-1 px-2 text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div className="flex flex-col w-full rounded-md overflow-hidden align-items-center">
              <Input
                label="Password"
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