import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {users
        && users.map((user) => (
          <div key={user.uuid}>
            <img src={user.picture} alt={`${user.name}`} />
            <p>
              Name:
              {`${user.name}`}
            </p>
            <p>
              Email:
              {user.email}
            </p>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
