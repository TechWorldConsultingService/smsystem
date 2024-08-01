// app/layout.js
'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import NavMenu from '../components/NavMenu';
import ExpandedSideBar from '../components/sidebar/ExpandedSideBar';
import SidebarData from '../components/sidebar/ShrinkedSidebar';
import ErrorBoundary from '../components/ErrorBoundary/errorBoundary';
import './globals.css';
import './linearicon.css';
import './bootstrap.css';
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";



export default function RootLayout({ children }) {
    const [userRole, setUserRole] = useState('master')
    const pathname = usePathname();
    const [expand, setExpand] = React.useState(true);

    const resizeSideBar = () => {
        setExpand(!expand);
    };

    
    
    const accessModules = {
        "master":[
        { page: "Dashboard", image: "lnr-pie-chart", link: "/dashboard_user", level: 1,subSideBar: [] },
        { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 3,subSideBar: []},
        { page: "Attendence",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        { page: "Add",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        ],
    
    "student":[
        { page: "Dashboard", image: "lnr-pie-chart", link: "/dashboard", level: 1,subSideBar: [] },
        { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 3,subSideBar: []},
        {
            page: "Class",
            image: "lnr lnr-book",
            link: "/studentclass",
            level: 4,
            subSideBar: [
                             { page: "Math",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                             {page: "Computer",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                         ]
        },
        { page: "Reports",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        { page: "Request", image: "lnr-layers", link: "", level: 2,
            subSideBar: [
                             { page: "All Request", image: "", link: "/index/allRequest", level: 0, subSideBar: [] },
                             {  page: "My Request",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                            {page: "User Request",image: "",link: "/index/ListManagerRequest",level: 0,subSideBar: []}
                         ]
        },
        { page: "My Bus",image: "lnr lnr-calendar-full",link: "/mybus",level: 4,subSideBar: []},
        { page: "Leave",image: "lnr lnr-calendar-full",link: "/calendar",level: 4,subSideBar: []},
        ],

        "teacher":[
        { page: "Dashboard", image: "lnr-pie-chart", link: "/dashboard", level: 1,subSideBar: [] },
        { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 3,subSideBar: []},
        {
            page: "Class",
            image: "lnr lnr-book",
            link: "/studentclass",
            level: 4,
            subSideBar: [
                             { page: "Math",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                             {page: "Computer",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                         ]
        },
        { page: "Reports",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        { page: "Request", image: "lnr-layers", link: "", level: 2,
            subSideBar: [
                             { page: "All Request", image: "", link: "/index/allRequest", level: 0, subSideBar: [] },
                             {  page: "My Request",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                            {page: "User Request",image: "",link: "/index/ListManagerRequest",level: 0,subSideBar: []}
                         ]
        },
        { page: "Attendence",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        { page: "Leave",image: "lnr lnr-calendar-full",link: "/calendar",level: 4,subSideBar: []},
        ],
        "principal":[
        { page: "Dashboard", image: "lnr-pie-chart", link: "/dashboard", level: 1,subSideBar: [] },
        { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 3,subSideBar: []},
        { page: "Reports",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
        { page: "Request", image: "lnr-layers", link: "", level: 2,
            subSideBar: [
                             { page: "All Request", image: "", link: "/index/allRequest", level: 0, subSideBar: [] },
                             {  page: "My Request",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                            {page: "User Request",image: "",link: "/index/ListManagerRequest",level: 0,subSideBar: []}
                         ]
        },
        { page: "Attendence",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},

        ]
    };

    const showSidebar = pathname !== '/login';

    return (
        <ReduxProvider>
        <html lang="en">
            <Head>
                <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
            </Head>
            <body>
                {showSidebar && <NavMenu />}
                <div className="container-fluid material-content-pannel">
                    <div className="row">
                        {showSidebar && (
                            <>
                           { accessModules[userRole] && ( 
                                <>
                                <div className="extraa gradient" style={{ display: expand ? 'none' : 'flex' }}>
                                    <ExpandedSideBar shrink={resizeSideBar} accessModules={accessModules[userRole]} />
                                </div>
                                <div className="gradient" style={{ width: '120px', display: expand ? 'flex' : 'none' }}>
                                    <SidebarData expand={resizeSideBar} accessModules={accessModules[userRole]} />
                                </div>
                                </>
                            )
                           }
                            </>
                        )}
                        <div className="col p-0" style={{ marginTop: '5px', background: '#f2f2f2', overflowX: 'auto' }}>
                        <div style={{ padding:'16px' }} className="" >
                        <ErrorBoundary>
                                    {children}
                                    <Toaster
                                     position="top-center"
                                     reverseOrder={false}
                                    />
                                </ErrorBoundary>
                            </div>
                        </div>
                        <div className='mainFooterr'>&nbsp; &nbsp; &nbsp; &nbsp; &copy; Copyright by Akash Singh. </div>

                    </div>
                </div>
                <script src="https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js"></script>
            </body>
        </html>
        </ReduxProvider>
    );
}
