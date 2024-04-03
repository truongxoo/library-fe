import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import axios from "../utils/axios";
import "./User.css";
const BOOKS_URL = "/user/books";

const User = () => {


  return (
    <div id="card-user">
       <Outlet/>
    </div>
  );
};

export default User;
