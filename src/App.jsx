import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    fetch('/api/users')
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
      const response = await fetch('/api/users', {
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
      const response = await fetch(`/api/users/${id}`, {
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
      const response = await fetch(`/api/users/${id}`, {
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

  const handleViewAll = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setValues(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <h1 className="text-center text-2xl font-bold">User Management</h1>
      <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          placeholder="Email"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          placeholder="Age"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <button onClick={handleViewAll} className="bg-green-500 text-white p-2 rounded mt-4">
        View All Users
      </button>
      <div className="mt-4">
        {values.map((user) => (
          <div key={user.id} className="flex flex-col items-center space-y-2">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.age}</p>
            <button
              onClick={() => handleUpdate(user.id)}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
