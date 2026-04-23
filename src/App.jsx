import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddFood from "./pages/AddFood";
import Alerts from "./pages/Alerts";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import "./App.css";
import SummaryBar from "./components/SummaryBar";

function App() {
  // ─── STATE (localStorage se seedha load) ─────────────────
  const [foodList, setFoodList] = useState(() => {
    try {
      const saved = localStorage.getItem("foodList");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [alertDays, setAlertDays] = useState(() => {
    try {
      const saved = localStorage.getItem("alertDays");
      return saved ? JSON.parse(saved) : 3;
    } catch {
      return 3;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // ─── SAVE TO LOCALSTORAGE ─────────────────────────────────
  useEffect(() => {
    localStorage.setItem("foodList", JSON.stringify(foodList));
  }, [foodList]);

  useEffect(() => {
    localStorage.setItem("alertDays", JSON.stringify(alertDays));
  }, [alertDays]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // ─── ADD FOOD ─────────────────────────────────────────────
  function addFood(name, expiryDate, category) {
  const newFood = {
    id: Date.now(),
    name: name,
    expiryDate: expiryDate,
    category: category, // ✅ NEW
  };
  setFoodList([...foodList, newFood]);
}

  // ─── DELETE FOOD ──────────────────────────────────────────
  function deleteFood(id) {
    const updated = foodList.filter((food) => food.id !== id);
    setFoodList(updated);
  }

  // ─── CLEAR ALL ────────────────────────────────────────────
  function clearAll() {
    setFoodList([]);
  }

  // ─── DAYS LEFT CALCULATE ──────────────────────────────────
  function getDaysLeft(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diffMs = expiry - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function getStatus(expiryDate) {
    const days = getDaysLeft(expiryDate);
    if (days < 0) return "expired";
    if (days <= alertDays) return "expiring";
    return "fresh";
  }


  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <BrowserRouter>
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  foodList={foodList}
                  getDaysLeft={getDaysLeft}
                  getStatus={getStatus}
                  deleteFood={deleteFood}
                />
              }
            />
            <Route
              path="/add"
              element={<AddFood addFood={addFood} />}
            />
            <Route
              path="/alerts"
              element={
                <Alerts
                  foodList={foodList}
                  getDaysLeft={getDaysLeft}
                  getStatus={getStatus}
                  deleteFood={deleteFood}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  foodList={foodList}
                  getDaysLeft={getDaysLeft}
                  getStatus={getStatus}
                  deleteFood={deleteFood}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  alertDays={alertDays}
                  setAlertDays={setAlertDays}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  clearAll={clearAll}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;