'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Popover } from 'antd';
import './NavMenu.css';

const NavMenu = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const router = useRouter();

    const toggleSearch = () => {
        setShowSearch(true);
    };

    const handleLogout = () => {
        // cookieService.clearToken();
        router.push('/login');
        window.location.href = '/login';
    };

    const handleProfile = () => {
        router.push('/userProfile');
    };

    return (
        <nav className='nav-bar' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
            <ul className='nav-bar-items'>
                <li>
                    <div className='logo'>
                        <img src={"/logo.png"} alt="Logo" style={{ marginTop: '-4px', width: '55px', height: '55px', objectFit: 'contain' }} />
                    </div>
                </li>
            </ul>
            <ul className='right1'>
                <li>
                    <div className='icons'>
                        <div style={{ padding: '0px 20px', marginTop: '4.5px' }}></div>
                        <div className="nav-item navbaritems dropdown2 text-left">
                            <div className='inout'>
                                <Popover content={
                                    <div>
                                        <div onClick={handleProfile} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                            <span className="mr-2 lnr lnr-user"></span>
                                            <span>My Profile</span>
                                        </div>
                                        <div onClick={handleLogout} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                            <span className="mr-2 lnr lnr-exit"></span>
                                            <span>Signout</span>
                                        </div>
                                    </div>
                                }>
                                    <span style={{ cursor: "pointer" }}>{"Akash"}</span>
                                </Popover>
                            </div>
                        </div>
                        <div className='mr-4 navbaritems'>
                            <Link className="mr-1 text-darkk" href="">
                                <span className="lnr lnr-alarm " style={{ fontSize: '18px' }}></span>
                            </Link>
                        </div>
                        <div className='logo'>
                            <img src={"/logo.png"} alt="Logo" style={{ marginTop: '5px', width: '55px', height: '55px', objectFit: 'contain' }} />
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
