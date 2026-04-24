function FoodCard({ food, daysLeft, status, onDelete }) {
  
  function getStatusLabel() {
    if (status === "expired") return "Expired — Discard!";
    if (status === "expiring") return "Expiring Soon — Consume Fast!";
    return "Fresh";
  }

  return (
    <div className={`food-card ${status}`}>
      {/* Top: name + status badge */}
      <div className="card-header">
        <h3 className="food-name">{food.name}</h3>
        <span className={`status-badge ${status}`}>
          {getStatusLabel()}
        </span>
      </div>

      {/* Middle: days info */}
      <div className="card-body">
        <p className="expiry-date">
          Expiry: {food.expiryDate}
        </p>
        <p className="days-left">
          {daysLeft < 0
            ? `${Math.abs(daysLeft)} days ago`
            : daysLeft === 0
            ? "Expires today!"
            : `${daysLeft} days left`}
        </p>
      </div>

      <p className="food-category">
        Category: {food.category || "Other"}
      </p>

      {/* Bottom: delete button */}
      <button
        className="delete-btn"
        onClick={() => onDelete(food.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default FoodCard;