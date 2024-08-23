'use client'
import React from "react";
import NavMenu from "./NavMenu";
import ExpandedSideBar from './sidebar/expandedSidebar';
import SidebarData from './sidebar/shrinkedSidebar';
import { usePathname } from 'next/navigation';
import { useSelector } from "react-redux";
import '../app/globals.css'


const NavLayout = () => {
  const userRole = useSelector(state=>state.user.role)
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
  { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 2,subSideBar: []},
  {
      page: "Class",
      image: "lnr lnr-book",
      link: "/studentclass",
      level: 3,
      subSideBar: [
                       { page: "Math",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                       {page: "Computer",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                   ]
  },
  { 
    page: "Leave",
    image: "lnr lnr-calendar-full",
    link: "/calendar",
    level: 4,
    subSideBar: [
      { page: "My Students Leave Request", image: "", link: "/Leave/mystudentleave", level: 0, subSideBar: [] },
      { page: "Teacher Leave Request",image: "",link: "/Leave/teacherleave",level: 0,subSideBar: []},
    ]
  },
  { page: "Request", image: "lnr-layers", link: "", level: 5,
      subSideBar: [
                       { page: "All Request", image: "", link: "/index/allRequest", level: 0, subSideBar: [] },
                       {  page: "My Request",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                      {page: "User Request",image: "",link: "/index/ListManagerRequest",level: 0,subSideBar: []}
                   ]
  },
  { page: "Attendence",image: "lnr lnr-calendar-full",link: "/reports",level: 6,subSideBar: []},

  { page: "Reports",image: "lnr lnr-calendar-full",link: "/reports",level: 7,subSideBar: []},
  ],



  "principal":[
  { page: "Dashboard", image: "lnr-pie-chart", link: "/dashboard", level: 1,subSideBar: [] },
  { page: "Calendar",image: "lnr lnr-calendar-full",link: "/calendar",level: 3,subSideBar: []},
  { page: "Reports",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},
  { page: "Request", image: "lnr-layers", link: "", level: 2,
      subSideBar: [
                       { page: "Students Leave Request", image: "", link: "/studentleave", level: 0, subSideBar: [] },
                       {  page: "Teacher Leave Request",image: "",link: "/index/ListMyRequest",level: 0,subSideBar: []},
                      {page: "User Request",image: "",link: "/index/ListManagerRequest",level: 0,subSideBar: []}
                   ]
  },
  { page: "Attendence",image: "lnr lnr-calendar-full",link: "/reports",level: 3,subSideBar: []},

  ]
};


  return (
    <div>
       <NavMenu/>
        <div>
                           { accessModules[userRole] && ( 
                                <>
                                <div className="extraa gradient" style={{ display: expand ? 'none' : 'flex' }}>
                                    <ExpandedSideBar shrink={resizeSideBar} accessModules={accessModules[userRole]} />
                                </div>
                                <div className="gradient" style={{ width: '120px', display: expand ? 'flex' : 'none' }}>
                                    <SidebarData expand={resizeSideBar} accessModules={accessModules[userRole]}  />
                                </div>
                                </>
                            )
                           }
                       </div>     
</div>
  );
};
export default NavLayout;
