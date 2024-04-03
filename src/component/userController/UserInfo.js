import React from 'react';
import { Outlet } from 'react-router-dom';

const UserInfo = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default UserInfo;