import React, { useEffect, useState } from 'react'
import Goal from './Goal'
import CreateGoalPopUp from "./CreateGoalPopUp";

export default function GoalList({ goals, setGoals, stats, setStats }) {
  
  const [showCompleted, setShowCompleted] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  let url = "/goal";
  let completedURL = "/goal/complete";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      const data = await response.json();
      data.reverse();
      console.log(data);
      setGoals(data);
    }
    fetchData();
  }, [showCompleted, setGoals, url]);

  async function completeGoal(goalId) {
    const data = { 
        id: goalId
    };

    const newGoals = goals.map((goal) => goal.id === goalId ? { ...goal, completed: !goal.completed } : goal);
    
    await fetch(completedURL, {method: "POST", headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+localStorage.getItem("jwt")
      }, body: JSON.stringify(data)});
    setGoals(newGoals);
    const statsRes = await fetch("/stat", {headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    setStats(await statsRes.json());
  }
  
  async function deleteGoal(id) {
    const data = {id: id};

    setGoals(goals.filter(function( goal ) {
      return goal.id !== id;
    }));

    await fetch(url, { method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }, body: JSON.stringify(data)
    });
  }

  async function updateGoal(data) {
    console.log("save ");
    const response = await fetch(url, {method: "PUT", headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }, body: JSON.stringify(data)});
    const addedGoal = await response.json();
    setGoals(goals.map(e => e.id === addedGoal.id ? addedGoal : e));

    console.log(addedGoal);
  }

  function handleGoalPopup(e) {
    setButtonPopup(true);
  }

  return (
    <>
    <div className="p-5 bg-gray-100 text-gray-900 rounded-2xl max-h-[666px]">
      <button className={(showCompleted) ? 'p-2 border-b-4 border-gray-300 hover:bg-gray-300' : 'p-2 border-b-4 border-sky-400'} onClick={() => setShowCompleted(false)}>Ongoing</button>
      <button className={(showCompleted) ? 'p-2 border-b-4 border-sky-400' : 'p-2 border-b-4 border-gray-300 hover:bg-gray-300'} onClick={() => setShowCompleted(true)}>Completed</button>
        <button className="mt-2 text-xl font-bold rounded-xl bg-gray-200 w-full text-gray-500 hover:bg-gray-300 hover:text-gray-700" onClick={handleGoalPopup}>+</button>
      <div className="mt-2 scroll-container overflow-hidden max-h-[550px] hover:overflow-y-scroll">
        {(showCompleted ? goals.filter((goal) => goal.completed === true) : goals.filter((goal) => goal.completed === false)).map((goal) => {
          return <Goal key={goal.id} stats={stats} goal={goal} completeGoal={completeGoal} deleteGoal={deleteGoal} updateGoal={updateGoal} />
        })}
      </div>
    </div>
    <CreateGoalPopUp trigger={buttonPopup} setTrigger={setButtonPopup} setGoals={setGoals} stats={stats} dueDate={new Date()}>
    </CreateGoalPopUp>
    </>
  )
}
