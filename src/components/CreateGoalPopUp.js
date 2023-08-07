import React, { useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../popup.css';

export default function CreateGoalPopUp(props) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const setTrigger = props.setTrigger;
    const setGoals = props.setGoals;
    const goals = props.goals;
    const stats = props.stats;
    const [statName, setStatName] = useState("");
    const [statValue, setStatValue] = useState(1);
    const trigger = props.trigger;
    const url = process.env.REACT_APP_BACKEND_URL+"/goal";

    function closePopup() {
        setStatName("");
        setTrigger(false);
    }

    async function addGoal() {
        const name = titleRef.current.value;
        const description = descriptionRef.current.value;
        let statNameValue;
        if (statName === undefined || statName === "") {
            setStatName(stats[0].name);
            statNameValue = stats[0].name;
        }
        else {
            statNameValue = statName;
        }

        if (name === '') return;
        const data = { 
            name: name,
            description: description,
            statName: statNameValue,
            statValue: statValue,
            dueDate: props.dueDate.toISOString()
        };

        const response = await fetch(url, {method: "POST", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          }, body: JSON.stringify(data)});
        const addedGoal = await response.json();
        const prevGoals = goals;
        setGoals(prevGoals => {
            return [...prevGoals, addedGoal]
        });
        titleRef.current.value = null;
        descriptionRef.current.value = null;
        closePopup();
    }

    function changeStatValue(value) {
        if (value < 1) {
            setStatValue(1);
        }
        else if (value > 100) {
            setStatValue(100);
        }
        else setStatValue(value);
    }

    return (trigger) ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 w-96 text-gray-50 p-10 rounded-xl">
                <h1 className='text-xl mb-10'>What's your goal?</h1>
                Title: <input ref={titleRef} type="text" className="input-field"></input><br></br>
                Description: <textarea ref={descriptionRef} className="input-field" rows={3}/><br></br>
                Stat Changed: <select className="input-field" onChange={(e) => setStatName(e.target.value)} defaultValue={stats[0].name}>
                    {stats.map((value) => (
                        <option value={value.name} key={value.name}>
                        {value.name}
                        </option>
                    ))}
                </select>
                Stat Points Gained: <input className="input-field" onChange={(e) => changeStatValue(e.target.value)} type="number" min="1" value={statValue}></input><br></br>
                Finish By: <DatePicker className="input-field" selected={props.dueDate} onChange={(date) => props.setDueDate(date)} />
                <button className="input-button bg-gray-500" onClick={addGoal}>Add Goal</button>
                <button className="input-button bg-red-500 mx-5" onClick={closePopup}>Cancel</button>
                { props.children }
            </div>
        </div>
    ) : "";
}
