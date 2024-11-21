import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    fetch('https://reactmodel.onrender.com/api/users')
      .then((response) => response.json())
      .then((data) => setValues(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://reactmodel.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newUser = await response.json();
        setValues([...values, newUser]);
        setFormData({ name: '', email: '', age: '' });
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://reactmodel.onrender.com/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setValues(values.map((user) => (user.id === id ? updatedUser : user)));
        setFormData({ name: '', email: '', age: '' });
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://reactmodel.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setValues(values.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <h1 className="text-center text-2xl font-bold">User Management</h1>
      <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {values.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.age}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-700 bg-gray-200 p-2 rounded w-full"
                  placeholder="Name"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-700 bg-gray-200 p-2 rounded w-full"
                  placeholder="Email"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="border border-gray-700 bg-gray-200 p-2 rounded w-full"
                  placeholder="Age"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;
