import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/usersSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.login.uuid}>
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
          />
          <p>Name: {`${user.name.first} ${user.name.last}`}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
