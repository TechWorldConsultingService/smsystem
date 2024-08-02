// app/page.js
'use client'
import  { useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import CookieService from '../service/cookieService';


//const cookieService = CookieService.getService();

export default function HomePage() {

    const router = useRouter();
    //const isAuthenticated = cookieService.getAccessToken();

    useEffect(() => {
            router.push('/login');
    }, []);

    // if (!isAuthenticated) {
    //     return null; // Or a loading spinner
    // }

    return (
            <div>
<div className="col p-0" style={{ marginTop: '5px', background: '#f2f2f2', overflowX: 'auto' }}>
                        <div style={{ padding:'16px' }} className="" ></div>
                
                <h1>Welcome to the Home Page</h1>
                {/* Add more content here */}
            </div></div>
    
    );
}
