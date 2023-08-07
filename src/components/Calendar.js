import {React, useState} from 'react';
import '../Calendar.css';
import CreateGoalPopUp from "./CreateGoalPopUp";
import statColourMap from '../util/statUtility';

export default function Calendar({goals, setGoals, stats}) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [hoveredDay, setHoveredDay] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const handleDayHover = (day) => {
    setHoveredDay(day);
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the index of the first day in a month
  const getFirstDayIndex = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const firstDayIndex = getFirstDayIndex(currentMonth, currentYear);
    const daysArray = [];

    // Add days from previous month
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(<div key={i} className="bg-gray-50 text-gray-500 p-10 text-center"></div>);
    }

    // Add days of the current month
    for (let i = firstDayIndex + 1; i <= totalDays + firstDayIndex; i++) {
      const isCurrentDay = (i - firstDayIndex === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear());
      const goalsForDay = goals.filter(goal => {
        const dueDate = new Date(goal.dueDateString);
        return !goal.completed && i - firstDayIndex === dueDate.getDate() && currentMonth === dueDate.getMonth() && currentYear === dueDate.getFullYear();
      });
      daysArray.push(
        <div key={i} className={`scroll-container hover:overflow-auto p-1 pt-5 text-center rounded-lg h-28 max-h-28 ${isCurrentDay ? 'bg-gray-800 text-gray-50' : 'bg-gray-50 text-gray-800 hover:bg-gray-200'}`}
        onMouseEnter={() => handleDayHover(i - firstDayIndex)}
          onMouseLeave={() => handleDayHover(null)}
          >
          {i - firstDayIndex}
          {hoveredDay === i - firstDayIndex && (
            <button onClick={() => handleGoalPopup(new Date(currentYear, currentMonth, i - firstDayIndex))} className="text-s w-full rounded-xl bg-gray-500 p-0 m-0 text-gray-50 hover:bg-gray-700 font-bold">+</button>
          )}
          {goalsForDay.map(goal => {
            return <div key={goal.id} className={"text-xs rounded-xl p-1 m-0 truncate text-gray-50 "+statColourMap.get(goal.statName)}>{goal.name}</div>
          })
          }
        </div>
      );
    }

    return daysArray;
  };

  function handleGoalPopup(date) {
    setSelectedDate(date);
    setButtonPopup(true);
  }

  return (
    <>
    <div className="w-full my-0 -mx-1 bg-gray-50 rounded-3xl">
      <h1 className="text-2xl pt-5 pl-10 text-gray-800">{date.toLocaleString('default', {month: 'long'})}</h1>
      <div className="text-gray-500 grid grid-cols-7 text-center border-b-2 border-gray-300">
        {days.map((day, index) => (
          <div className="p-10" key={index}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {generateCalendarDays()}
      </div>
    </div>
    <CreateGoalPopUp trigger={buttonPopup} setTrigger={setButtonPopup} setGoals={setGoals} stats={stats} dueDate={selectedDate} setDueDate={setSelectedDate}>
    </CreateGoalPopUp>
    </>
  );
}