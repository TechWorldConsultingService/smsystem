'use client'
import React from 'react';
import './navBarStyle.css';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const SubNavbar = (props) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const {
        title: pageHeading,
        extraData,
        newClass,
        extraContent,
        goback,
    } = props;

    return (
        <div className="material-sub-header">
            <div className="subHeader-subdivision-left">
                {goback !== false && (
                    <div onClick={goBack} style={{ cursor: 'pointer' }} className="backButtonNavbar pointer mr-3">
                        <span style={{ fontWeight: 600 }} className="lnr lnr-arrow-left"></span>
                    </div>
                )}
                {pageHeading && (
                    <div className="d-flex">
                        <label className="font-1 color-21 weight-500 mb-0 mr-5" style={{ whiteSpace: 'nowrap', marginLeft: newClass }}>
                            {pageHeading}
                        </label>
                    </div>
                )}
            </div>
            <div className="subHeader-subdivision-right">
                {extraData && <div>{extraContent}</div>}
            </div>
        </div>
    );
};

export default SubNavbar;
