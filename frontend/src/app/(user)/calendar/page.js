'use client'
import React from 'react'
import {Calendar} from "@nextui-org/react";
import {parseDate} from '@internationalized/date';
import { getLocalTimeZone, today } from "@internationalized/date";

const schoolCalendar = () => {
  return (
    <div > 
    <Calendar aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())} />
    </div>
  )
}

export default schoolCalendar