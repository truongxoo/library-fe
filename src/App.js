import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./component/formControl/Login";
import SignUp from "./component/formControl/SignUp";
import ResetPassword from "./component/formControl/ResetPassword";
import ConfirmResetPassword from "./component/formControl/ConfirmResetPassword";
import HomePage from "./component/home/HomePage";
import Admin from "./component/adminControl/Admin";
import User from "./component/userController/User";
import AdminDashboard from "./component/adminControl/AdminDashboard";
import AdminBook from "./component/adminControl/AdminBook";
import AdminMember from "./component/adminControl/AdminMember";
import AdminIssued from "./component/adminControl/AdminIssued";
import AdminReturn from "./component/adminControl/AdminReturn";
import AdminPending from "./component/adminControl/AdminPending";
import UserBook from "./component/userController/UserBook";
import UserInfo from "./component/userController/UserInfo";
import UserBorrowed from "./component/userController/UserBorrowed";
import UserChangePhone from "./component/userController/UserChangePhone";
import UserChangeEmail from "./component/userController/UserChangeEmail";
import UserChangePassword from "./component/userController/UserChangePassword";
import NotFoundPage from "./component/notFound/NotFoundPage";
import ChangePhoneConfirmation from "./component/userController/ChangePhoneConfirmation";
import ChangeEmailConfirmation from "./component/userController/ChangeEmailConfirmation";
import ChangePasswordConfirmation from "./component/userController/ChangePasswordConfirmation";
import ExceptionPage from "./component/notFound/ExceptionPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/exception" element={<ExceptionPage />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-password" element={<ConfirmResetPassword />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<HomePage />}>
          <Route path="admin" element={<Admin />}>
            <Route  path="dashboard" element={<AdminDashboard />} />
            <Route path="book" element={<AdminBook />} />
            <Route path="member" element={<AdminMember />} />
            <Route path="issued" element={<AdminIssued />} />
            <Route path="return" element={<AdminReturn />} />
            <Route path="pending" element={<AdminPending />} />
          </Route>
          <Route path="user" element={<User />}>
            <Route  path="book" element={<UserBook />} />
            <Route path="borrowed" element={<UserBorrowed />} />
            <Route path="info" element={<UserInfo />}>
              <Route path="change-phone" element={<UserChangePhone />} />
              <Route path="change-phone/confirm" element={<ChangePhoneConfirmation />}/>
              <Route path="change-email" element={<UserChangeEmail />} />
              <Route path="change-email/confirm" element={<ChangeEmailConfirmation />} />
              <Route path="change-password" element={<UserChangePassword />} />
              <Route path="change-password/confirm" element={<ChangePasswordConfirmation />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
