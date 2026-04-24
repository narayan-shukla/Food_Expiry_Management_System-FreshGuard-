import { useState } from "react";
import FoodCard from "../components/FoodCard";

function Search({ foodList, getDaysLeft, getStatus, deleteFood }) {
  const [query, setQuery] = useState("");      
  const [filter, setFilter] = useState("all");  

  
  const byName = foodList.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  const results = byName.filter((food) => {
    if (filter === "all") return true;
    return getStatus(food.expiryDate) === filter;
  });


  const sorted = [...results].sort(
    (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
  );

  return (
    <div className="page">
      <h1 className="page-title">Search & Filter</h1>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by food name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        {/* Filter buttons */}
        <div className="filter-buttons">
          {["all", "fresh", "expiring", "expired"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""} ${f}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="result-count">{sorted.length} item(s) found</p>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No items match your search.</p>
        </div>
      ) : (
        <div className="food-grid">
          {sorted.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              daysLeft={getDaysLeft(food.expiryDate)}
              status={getStatus(food.expiryDate)}
              onDelete={deleteFood}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;