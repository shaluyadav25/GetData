import { useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "./api/UserApi";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const { data: users = [] } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser(formData);

    setFormData({
      name: "",
      email: "",
      role: "",
    });
  };

  return (
    <div>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <button>Add User</button>
      </form>

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
