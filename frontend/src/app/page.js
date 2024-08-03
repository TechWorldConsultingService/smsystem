'use client'
//import CookieService from '../service/cookieService';
//const cookieService = CookieService.getService();
import React from 'react'
import Login from './login/page'

const homePage = () => {
         //const isAuthenticated = cookieService.getAccessToken();
         
    // if (!isAuthenticated) {
    //     return null; // Or a loading spinner
    // }

  return (
    <div><Login/></div>
  )
}

export default homePage
    