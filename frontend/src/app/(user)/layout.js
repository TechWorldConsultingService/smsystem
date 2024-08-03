'use client'
import NavLayout from '@/components/Layout'
import React from 'react'


const layout = ({children}) => {
  return (
    <div>
    <div><NavLayout/></div> 
     <div className='pl-120'>{children}</div>
    </div>
  )
}

export default layout