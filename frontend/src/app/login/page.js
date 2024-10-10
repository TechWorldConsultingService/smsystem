'use client';
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
import { loginSchema } from '../../constant/schema';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginDetails } from '../../redux/reducerSlices/userSlice';
import Cookies from 'js-cookie';

const Login = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });


  const loginUser = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login/', values,{
        headers: {
          'X-CSRFToken': csrfToken,  // Include CSRF token in request headers
        },
        withCredentials: true,  // Ensures cookies are sent along with the request
      });


      const data = await response.data;

      if (response.status === 200) {
        const successMessage = data.msg || 'Login successful';
        toast.success(successMessage);
        dispatch(setLoginDetails(data));

        // Redirect based on role
        switch (data.role) {
          case 'student':
            router.push('/studentdashboard');
            break;
          case 'teacher':
            router.push('/teacherdashboard');
            break;
          case 'master':
            router.push('/masterdashboard');
            break;
          default:
            router.push('/principaldashboard');
        }
      } else {
        const errorMessage = data.msg || 'Error during login.';
        toast.error(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Network error or server is down');
      }
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl md:text-4xl font-semibold text-blue-600 mb-4 text-center">Welcome!</h1>
        <h2 className="text-lg md:text-xl mb-6 text-center">Please enter your details.</h2>
        <form className="w-full max-w-md flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col w-full rounded-sm overflow-hidden">
              <Input
                type="text"
                placeholder="User Name"
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
                placeholder="Password"
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
                type={isVisible ? 'text' : 'password'}
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <div className="p-1 px-2 text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className={`mt-6 w-full py-2 px-4 rounded-md text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
