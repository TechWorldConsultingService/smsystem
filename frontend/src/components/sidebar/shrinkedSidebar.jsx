'use client'
import React, { useState } from "react";
import './sidebar.css';
import Link from 'next/link';  // Correct import


const SidebarData = (props) => {

    const [storeData, setData] = useState({
        display: false,
        pageName: '',
        getDropDown: []
    });

    const mouseover = (page) => {
        let getDropDown = props.accessModules.find(data => data.page === page);
        setData((prevState) => ({ ...prevState, display: true, pageName: page, getDropDown: getDropDown.subSideBar }));
    }

    const handleMouseLeave = () => {
        setData((prevState) => ({
            ...prevState, display: false
        }));
    }

    const falseThis = () => {
       setData((prevState) => ({
           ...prevState, display: false
       }));
    }

    const resizeSideBar = () => {
        props.expand();
    }

    let template = [];
    props.accessModules.forEach((module, id) => {
        if (module.subSideBar.length > 0) {
            template.push(
                <li onMouseOver={() => mouseover(module.page)} className='activePage' key={id} style={{ borderBottom: '1px solid rgb(169, 183, 208)', position: 'relative', padding: '22px' }}>
                    <div className="row mx-0 justify-content-center mb-2"><span style={{ fontSize: '32px' }} className={"shrinked-image lnr " + module.image} /></div>
                    <div className="row mx-0 justify-content-center"><span className="shrinked-text text-center">{module.page}</span></div>
                    <div className={module.page === storeData.pageName && module.subSideBar.length > 1 ? 'triangle' : ''}></div>
                </li>
            )
        } else {
            template.push(
                <li onMouseOver={() => mouseover(module.page)} className='activePage' key={id} style={{ borderBottom: '1px solid rgb(169, 183, 208)', position: 'relative', padding: '22px' }} >
                    <Link href={module.link}>
                        <div className="row mx-0 justify-content-center mb-2"><span style={{ fontSize: '32px' }} className={"shrinked-image lnr " + module.image} /></div>
                        <div className="row mx-0 justify-content-center"><span className="shrinked-text text-center">{module.page}</span></div>
                        <div className={module.page === storeData.pageName && module.subSideBar.length > 1 ? 'triangle' : ''}></div>
                    </Link>
                </li>);
        }
    });

    return (
        <div className='d-flex' style={{ position: 'absolute', zIndex: 9, top: '60px', bottom: 0 }}>
            <div className="material-sidebar-heightt sidebar-shrinked">
                <div className="sidebar-shrinked-header" style={{ borderBottom: ' 1px solid #D8D8D8' }}>
                    <div className="cursorPointer"><span onClick={resizeSideBar} style={{ float: 'none', marginLeft: 0, fontSize: '20px' }} className="lnr lnr-menu font-20" /></div>
                </div>
                <div className="sidebar-shrinked-content" style={{ width: '120px' }}>
                    <ul className="px-0 mm-shrinked-sidebar">
                        {template}
                    </ul>
                </div>
            </div>
            {storeData.display && storeData.getDropDown.length > 0 &&
                <div onMouseLeave={handleMouseLeave} onClick={falseThis} className={storeData.display ? 'Overlay slide' : 'Overlay'} >
                    <ul className='ulStyle'>{storeData.getDropDown.map((data, id) => {
                        return (
                            <Link href={data.link} key={id}>
                                <li style={{ padding: '10px 20px' }}><span style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '10px' }} className={"shrinked-image lnr " + data.image} /><span style={{ fontSize: '13px' }}>{data.page}</span></li>
                            </Link>
                        )
                    })}
                    </ul>
                </div>
            }
        </div>
    )
}

export default SidebarData;
