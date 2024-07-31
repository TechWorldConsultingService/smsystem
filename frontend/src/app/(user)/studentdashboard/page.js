'use client'
import React, { useState, useEffect } from "react";
import SubNav from "@/components/navbar/subNav";


const MyRequest = ({ loadingToggle }) => {
  

    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 changedateantdstyle">
           <SubNav
                title={"Dashboad"}
                actionButton={false}
                extraData={true}
            />
            <div className="material-work-desk-new bg-white">
            <div className="p-2 bg-white">

             this is student dashboard
                </div>
                
            </div>
        </div>
    );
};

export default MyRequest;
