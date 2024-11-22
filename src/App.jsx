import React, { useState } from "react";
import { getUsers, deleteUser } from "./apiMethods";
import UserList from "./components/UserList";
import FilterBox from "./components/FilterBox";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch users when the button is clicked
  const handleLoadUsers = async () => {
    const userData = await getUsers();
    setUsers(userData || []); // Handle undefined case
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Filtered users based on the filter box input
  const filteredUsers = (users || []).filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User Management</h1>
      <button onClick={handleLoadUsers}>Отримати юзерів</button>
      {users.length > 0 && (
        <>
          <FilterBox filter={filter} onFilterChange={setFilter} />
          <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
        </>
      )}
    </div>
  );
};

export default App;
