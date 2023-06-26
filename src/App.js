import { useState } from "react";
import Stats from "./components/Stats";
import GoalList from "./components/GoalList";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Calendar from "./components/Calendar";
import Setup from "./components/Setup";

function App() {
  const [stats, setStats] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleLogout() {
    console.log("logout");
    localStorage.setItem("jwt", "");
    window.location.href = '/login';
  }

  return (
    <div className="font-sans p-16">
      <Routes>
        {/* protected */}
        <Route path = "/" element={<RequireAuth></RequireAuth>}>
          <Route path="/home" element={<>
            <div className="flex">
              <h1 className="font-mono font-bold text-5xl mb-10 inline">LifeStat</h1>
              <div className="ml-auto">
                <h2 className="inline m-3">Hi {localStorage.getItem("name")}</h2>
                <button className="bg-gray-200 rounded-full p-3" onClick={handleLogout}>Logout</button>
              </div>
            </div>
              <Stats stats={stats} setStats={setStats}></Stats>
              <div className="grid grid-cols-2 bg-gray-800 text-gray-100 rounded-3xl shadow-xl">
                <div className="calendar-section">
                  <Calendar goals={goals} setGoals={setGoals} stats={stats}></Calendar>
                </div>
                <div className="ml-10">
                  {/* <h2>Hi {localStorage.getItem("name")}</h2> */}
                    <GoalList showCompleted={showCompleted} goals={goals} setGoals={setGoals} stats={stats} setStats={setStats}></GoalList>
                </div>
              </div>
            </>}>
          </Route>
          <Route path="/setup" element={<Setup></Setup>}></Route>
        </Route>
          {/* public */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    {/* <button onClick={handleClearGoals}>Clear Completed Goals</button> */}
    {/* <div>{goals.filter(goal => !goal.complete).length} left to do</div> */}
    </div>
  );
}

export default App;
