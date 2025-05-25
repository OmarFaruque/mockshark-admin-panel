import React from "react";
import UserList from "../components/user";

const User = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default User;
