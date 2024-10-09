import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []); // Run once when the component mounts

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { name };
      await fetch('http://localhost:5000/api/post', { // POST to /api/post
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      setName(''); // Clear input after submission
      fetchItems(); // Refresh the item list after adding new item
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Items List</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter item name"
        />
        <button type="submit">Add Item</button> {/* Submit button */}
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li> // Ensure JSX is returned
        ))}
      </ul>
    </div>
  );
}

export default App;
