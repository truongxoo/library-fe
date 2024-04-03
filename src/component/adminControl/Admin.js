import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import axios from "../utils/axios";
import "./Admin.css";


const Admin = () => {
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    axios
      .get("/admin/users", {
        headers: {
          'Authorization': "Bearer " + cookies.accessToken
        },
      })
      .then(function (response) {
        console.log(response.data)
        setData(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);
  return (
    <div id="card-admin" >
         <Outlet />
    </div>
  );
};

export default Admin;
