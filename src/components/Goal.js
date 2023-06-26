import {React, useState} from 'react';
import statColourMap from '../util/statUtility';
import DatePicker from "react-datepicker";

export default function Goal({ stats, goal, completeGoal, deleteGoal, updateGoal}) {
    // function handleTodoClick() {
    //     toggleTodo(goal.id);
    // }
    const [showInfo, setShowInfo] = useState(false);
    const [dateCreated] = useState(new Date(goal.dateCreatedString));
    const [editing, setEditing] = useState(false);
    const [goalName, setGoalName] = useState(goal.name);
    const [goalDescription, setGoalDescription] = useState(goal.description);
    const [goalStatName, setGoalStatName] = useState(goal.statName);
    const [goalStatValue, setGoalStatValue] = useState(goal.statValue);
    const [goalDueDate, setGoalDueDate] = useState(new Date(goal.dueDateString));

    function openInfo() {
      setShowInfo(true);
    }
    function closePopup() {
      console.log(dateCreated);
      setShowInfo(false);
      setEditing(false);
    }
    function toggleEdit() {
      setEditing(!editing);
      setGoalDescription(goal.description);
      setGoalName(goal.name);
      setGoalStatName(goal.statName);
      setGoalStatValue(goal.statValue);
    }
    async function saveChanges() {
      const data = { 
        id: goal.id,
        name: goalName,
        description: goalDescription,
        statName: goalStatName,
        statValue: goalStatValue,
        dueDate: goalDueDate.toISOString()
      };
      await updateGoal(data);
      setEditing(false);
    }

    function changeStatValue(value) {
      if (value < 1) {
          setGoalStatValue(1);
      }
      else if (value > 100) {
        setGoalStatValue(100);
      }
      else setGoalStatValue(value);
  }
  
  return (
    <>
    <div className="rounded-xl bg-gray-300 p-3 mb-2 mt-2 hover:bg-gray-400 cursor-pointer" onClick={openInfo}>
      <div className="flex items-center">
        <h3 className="font-semibold text-lg border-b-4 border-gray-400 p-1">{goal.name}</h3>
        <span className={"ml-auto rounded-full text-gray-50 pl-3 pr-3 "+statColourMap.get(goal.statName)}>{goal.statName}: {goal.statValue}</span>
      </div>
      <p className='text-sm mt-2 truncate'>{goal.description}</p>
      <div className="flex items-center">
        { goal.completed ?
          <div className="completed">Completed</div> :
          <button className="bg-gray-600 hover:bg-gray-800 text-gray-50 rounded-full p-1 m-2 text-sm" onClick={(e) => {e.stopPropagation(); completeGoal(goal.id)}}>Complete</button>
        }        
          <button className="bg-red-600 hover:bg-red-800 text-gray-50 rounded-full p-1 m-2 ml-auto text-sm" onClick={(e) => {e.stopPropagation(); deleteGoal(goal.id)}}>Delete</button>
      </div>
    </div>
    {showInfo ? 
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className='bg-gray-800 w-96 text-gray-50 p-10 rounded-xl'>
          {editing ? <>Title: <input className="input-field" type="text" onChange={(e) => setGoalName(e.target.value)} defaultValue={goal.name}></input></> : 
          <h1 className="text-2xl">{goal.name}</h1>}
          {editing ? <>Stat name: <select className="input-field" onChange={(e) => setGoalStatName(e.target.value)} defaultValue={goal.statName}>
                    {stats.map((value) => (
                        <option value={value.name} key={value.name}>
                        {value.name}
                        </option>
                    ))}
                </select></> : 
                <span className={"my-5 rounded-full text-gray-50 pl-3 pr-3 "+statColourMap.get(goal.statName)} style={{color: 'white'}}>{goal.statName}</span> }
          {editing ? <>Description: <textarea className="input-field" rows={3} type="text" onChange={(e) => setGoalDescription(e.target.value)} defaultValue={goal.description}></textarea></> :
          <p>{goal.description}</p>}
          {editing ? <>Stat value: <input className="input-field" onChange={(e) => changeStatValue(e.target.value)} value={goalStatValue} type="number" min="1"></input></> : 
          <span className="goal-stat-value">Points: {goal.statValue}</span>}
          <p>Due: {editing ? <DatePicker className="input-field" selected={goalDueDate} onChange={(date) => setGoalDueDate(date)} /> : goalDueDate.toDateString()}</p>
          <p>Created: {dateCreated.toDateString()}</p>
          <></>
          {editing ? <button className="input-button bg-gray-500" onClick={saveChanges}>Save</button> : <></>}
          <button className="input-button bg-gray-500" onClick={toggleEdit}>{editing ? <>Cancel</> : <>Edit</>}</button>
          <button className="input-button bg-red-500 mx-5" onClick={closePopup}>Cancel</button>
      </div>
    </div> 
    : ""}
    </>
  )
}
