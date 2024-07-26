'use client'
import React from 'react';
//import ErrorLoader from './ErrorLoader';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Error:', error);
        console.error('Info:', info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0">
                    <div className="material-work-desk-new bg-white">
                        <div className='div-center'>
                            <h5 className='text-center text-danger' style={{ marginTop: '-20px' }}>
                                {/* <span><ErrorLoader /></span> */}
                                Something went wrong !!!<br />
                                <span>Please check the console for more details.</span>
                            </h5>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
