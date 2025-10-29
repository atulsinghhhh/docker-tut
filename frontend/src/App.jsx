import React, { useEffect, useState } from 'react'

function App() {
  const [formState,setFormState] = useState({
    name: '',
    email: '',
  });
  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/user/");
    const data = await res.json();
    setUsers(data?.user || []);
  };

  useEffect(()=>{
    fetchUsers();
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setError("");
        fetchUsers(); 
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setFormState({ name: "", email: "" });
    }
  };

  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md border-white shadow-md w-80">
          <div className="mb-3">
            <label>Name: </label>
            <input
              type='text'
              name="name" 
              value={formState.name}
              onChange={(e) => setFormState({
                ...formState,
                [e.target.name]: e.target.value
              })}
              className="w-full text-white p-1"
            />
          </div>
          <div className="mb-3">
            <label>Email: </label>
            <input
              type='email'
              name="email" 
              value={formState.email}
              onChange={(e) => setFormState({
                ...formState,
                [e.target.name]: e.target.value
              })}
              className="w-full p-1 text-white"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            disabled={loading}
            className="bg-blue-500 px-3 py-1 rounded-md mt-2"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-xl mb-2">All Users</h2>
          {users.map((user) => (
            <p key={user.id}>
              {user.name} — {user.email}
            </p>
          ))}
      </div>
    </div>
  )
}

export default App
