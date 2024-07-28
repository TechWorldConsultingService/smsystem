'use client'
import React from 'react'
import { Calendar } from 'antd';
import './calendar.css'


const studentCalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  return (
    <div className='flex flex-col item-center rounded-xl shadow-lg justify-center shadow-blue-900'> 
    
     <div className=' flex justify-center text-blue-600 text-2xl font-semibold '>Student Calendar</div> 
     <div className='pt-4 pl-5'> <Calendar onPanelChange={onPanelChange} /></div>
      
      </div>
  )
}

export default studentCalendar
