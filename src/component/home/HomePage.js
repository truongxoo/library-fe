import React ,{useContext, useLocation} from 'react';
import AuthContext from "../../context/AuthProvider";
import { useCookies } from 'react-cookie';
import Appbar from '../header/Appbar';
import SideBar from"../sidebar/SideBarAdmin";
import { Outlet } from "react-router-dom";
import "./HomePage.css";
import SideBarAdmin from '../sidebar/SideBarAdmin';
import SideBarUser from '../sidebar/SideBarUser';

const HomePage = () => {
    const [cookies,setCookie] = useCookies();
    const [user,setUser] = useContext(AuthContext);
    
    return (
        <div>
           <div className="app-header">
        <Appbar />
      </div>
      <div className="app-content" style={{ display: "flex" }}>
        <div className="app-sidebar" >
          {user.role==="USer" ? <SideBarAdmin/> : <SideBarUser/> } 
          {/* {isAdmin ? <SideBarUser/> : <SideBarAdmin/> }  */}
        </div>
        <div className="app-subcontent" style={{width:"100%"}}>
          <Outlet />
        </div>
      </div>
        </div>
    );
};

export default HomePage;