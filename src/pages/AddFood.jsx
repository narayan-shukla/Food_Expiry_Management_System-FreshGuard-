import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFood({ addFood }) {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); 


  const today = new Date().toISOString().split("T")[0]; 

  function handleSubmit() {
    
    if (!name.trim()) {
      setError("Food name cannot be empty.");
      return;
    }
    if (!expiryDate) {
      setError("Please select an expiry date.");
      return;
    }

    if (expiryDate < today) {
      setError("Warning: This item is already expired! Still adding...");
    
      addFood(name.trim(), expiryDate, category);
      setName("");
      setExpiryDate("");
      setTimeout(() => {
        setError("");
        navigate("/"); 
      }, 2000);
      return;
    }

    setError("");
    addFood(name.trim(), expiryDate, category);
    setSuccess(`"${name}" added successfully!`);
    setName("");
    setExpiryDate("");

    setTimeout(() => {
      setSuccess("");
      navigate("/"); 
    }, 1500);
  }

  return (
    <div className="page">
      <h1 className="page-title">Add Food Item</h1>

      <div className="form-card">
      
        {error && <div className="msg error">{error}</div>}
        
        {success && <div className="msg success">{success}</div>}

        <div className="form-group">
          <label>Food Name</label>
          <input
            type="text"
            placeholder="e.g. Milk, Apple, Bread"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            type = "dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Dairy</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default AddFood;