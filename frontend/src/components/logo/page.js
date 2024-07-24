import React from 'react'
import Link from 'next/link';
import Image from 'next/image';


const Logo = () => {
  return (
    <div>
         <div className='w-20 '>
      <Link href="/">
       <Image 
       height={180}
      width={200}
      alt="Logo"
      src="/logo.png"
    /></Link></div>
    </div>
  )
}

export default Logo;