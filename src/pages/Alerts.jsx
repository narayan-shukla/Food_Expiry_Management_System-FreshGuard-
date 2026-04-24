import FoodCard from "../components/FoodCard";

function Alerts({ foodList, getDaysLeft, getStatus, deleteFood }) {

  const urgentItems = foodList.filter((food) => {
    const status = getStatus(food.expiryDate);
    return status === "expiring" || status === "expired";
  });


  const sorted = [...urgentItems].sort(
    (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
  );

  return (
    <div className="page">
      <h1 className="page-title">Expiry Alerts</h1>

      {sorted.length === 0 ? (
        <div className="empty-state success-state">
          <p>All items are fresh!</p>
          <p>Nothing to worry about.</p>
        </div>
      ) : (
        <>
          <p className="alerts-count">
            {sorted.length} item(s) need your attention
          </p>
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
        </>
      )}
    </div>
  );
}

export default Alerts;