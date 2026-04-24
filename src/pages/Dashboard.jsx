import FoodCard from "../components/FoodCard";
import SummaryBar from "../components/SummaryBar";

function Dashboard({ foodList, getDaysLeft, getStatus, deleteFood }) {
  // Sort by nearest expiry
  const sortedList = [...foodList].sort(
    (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
  );

  // Items expiring today
  const expiringToday = foodList.filter(
    (food) => getDaysLeft(food.expiryDate) === 0
  ).length;

  // 🔥 Suggestions
  const suggestions = foodList.filter(
    (food) => getDaysLeft(food.expiryDate) <= 1
  );

  return (
    <div className="page">

     
      {expiringToday > 0 && (
        <div className="alert-banner">
          ⚠️ {expiringToday} item(s) expiring today!
        </div>
      )}

     
      {suggestions.length > 0 && (
        <div className="suggestion-box">

       
          <div className="suggestion-top">
            <div className="left">
              <span>✨</span>
              <h3>Needs attention</h3>
            </div>
            <span className="count">{suggestions.length}</span>
          </div>

          <div className="suggestion-items">
            {suggestions.map((food) => {
              const days = getDaysLeft(food.expiryDate);

              let message =
                days < 0
                  ? "Already expired! Discard."
                  : days === 0
                  ? "Use today!"
                  : "Use soon!";

              let status = days < 0 ? "expired" : "expiring";

              return (
                <div key={food.id} className="suggestion-row">

                  <div className="row-left">
                    <div className="icon-circle">
                      {food.name.toLowerCase().includes("milk") ? "🥛" : "🍪"}
                    </div>

                    <div className="text">
                      <span className="name">{food.name}</span>
                      <span className="msg">{message}</span>
                    </div>
                  </div>

                  <div className={`badge ${status}`}>
                    {status === "expired" ? "Expired" : "Expiring"}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

     
      <SummaryBar foodList={foodList} getStatus={getStatus} />

    
      {sortedList.length === 0 ? (
        <div className="empty-state">
          <p>No food items added yet.</p>
          <p>Go to "+ Add Food" to get started!</p>
        </div>
      ) : (
        <div className="food-grid">
          {sortedList.map((food) => (
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

export default Dashboard;