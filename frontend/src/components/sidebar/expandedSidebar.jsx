'use client'
import React, { useState } from "react";
import './sidebar.css';
import Link from 'next/link';  // Correct import

const ExpandedSideBar = (props) => {
    const [display, setDisplay] = useState(false);
    const [pageName, setPageName] = useState('');
    const [getDropDown, setDropdown] = useState([]);
    let sideBarContent = [];
    const resizeSideBar = () => {
        props.shrink();
    }
    const getPageName = (page, bool) => {
        let getDropDown = props.accessModules.filter(data => data.page === page);
        setDropdown(getDropDown);
        setPageName(page);
        if (page === pageName) {
            setDisplay(!display);
        } else {
            setDisplay(!bool);
        }
    }
    props.accessModules.map((module, id) => {
        sideBarContent.push(
            <div key={id} className="mm-sidebar">
                <li onClick={() => getPageName(module.page, false)} style={{ padding: '15px 0px 15px 12px' }}>
                    {module.subSideBar.length > 0 ? (
                        <span>
                            <span className={"sidebar-image lnr " + module.image} />
                            <span className="ml-2 sidebar-content-text">{module.page}</span>
                            <span style={{ fontSize: '11px' }} className={"drop-icon-subtab lnr " + (module.page === pageName && getDropDown[0].subSideBar.length > 0 && display ? 'lnr-chevron-up' : 'lnr-chevron-down')}></span>
                        </span>
                    ) : (
                        <Link href={module.link} passHref>
                            <span className={"sidebar-image lnr " + module.image} />
                            <span className="ml-2 sidebar-content-text">{module.page}</span>
                        </Link>
                    )}
                </li>
                {getDropDown[0] !== undefined && (
                    <div style={{ display: module.page === pageName && getDropDown[0].subSideBar.length > 0 && display ? 'block' : 'none' }} className="mm-sidebar mm-sidebar-sub-content mt-2 ml-3">
                        {getDropDown[0].subSideBar.map((subContent, subId) => {
                            return (
                                <Link href={subContent.link} key={subId} passHref>
                                    <li className="ml-4 mb-1">{subContent.page}</li>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    });
    return (
        <div className="w-100 material-sidebar-height">
            <div style={{ fontSize: '20px', borderBottom: '1px solid #D8D8D8' }} className="cursorPointer px-0 sidebar-headere">
                <span onClick={resizeSideBar} style={{ marginTop: 0 }} className="mr-3 lnr lnr-menu font-20 pointer" />
            </div>
            <div className="row sidebar-content mx-0">
                <ul className="w-100 px-0">
                    {sideBarContent}<br />
                </ul>
            </div>
        </div>
    )
}

export default ExpandedSideBar;
