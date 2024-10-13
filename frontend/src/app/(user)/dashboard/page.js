"use client"

import React, {useEffect} from 'react'
import axios from 'axios';


const dashboard = () => {
    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
          .then(response => setData(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

  return (
    <div>
      dashboard  page
      
    </div>
  )
}

export default dashboard;
