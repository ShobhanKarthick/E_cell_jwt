import React, { useState, useEffect } from "react";
import axios from "axios";

const Uservalues = (props) => (
  <tr>
    <td>{props.user._id}</td>
    <td>{props.user.fullName}</td>
    <td>{props.user.email}</td>
    <td>{props.user.password}</td>
    <td>{props.user.phone}</td>
  </tr>
);

function Userdata() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/userdata/")
      .then((response) => {
        setAllUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function UserList() {
    return allUsers.map(function (current, i) {
      return <Uservalues user={current} key={i} />;
    });
  }

  return (
    <div>
      <table id="userdata" className="users-table">
        <thead>
          <td>ID</td>
          <td>Name</td>
          <td>E-mail</td>
          <td>Password</td>
          <td>Phone</td>
        </thead>
        <tbody>{UserList()}</tbody>
      </table>
    </div>
  );
}

export default Userdata;
