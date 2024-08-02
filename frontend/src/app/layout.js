// app/layout.js
'use client';
import React from 'react';
import Head from 'next/head';
import ErrorBoundary from '../components/ErrorBoundary/errorBoundary';
import './globals.css';
import './linearicon.css';
import './bootstrap.css';
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";



export default function RootLayout({ children }) {
    return (
        <ReduxProvider>
        <html lang="en">
            <Head>
                <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
            </Head>
            <body>      
                        <ErrorBoundary>
                                    {children}
                                    <Toaster
                                     position="top-center"
                                     reverseOrder={false}
                                    />
                                </ErrorBoundary>
                        <div className='mainFooterr'>&nbsp; &nbsp; &nbsp; &nbsp; &copy; Copyright by Akash Singh. </div>

                <script src="https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js"></script>
            </body>
        </html>
        </ReduxProvider>
    );
}
