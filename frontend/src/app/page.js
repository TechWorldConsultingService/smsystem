// app/page.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import CookieService from '../service/cookieService';
import RootLayout from './layout';

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
        <RootLayout>
            <div>
                <h1>Welcome to the Home Page</h1>
                {/* Add more content here */}
            </div>
        </RootLayout>
    );
}
