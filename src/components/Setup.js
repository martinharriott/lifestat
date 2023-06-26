import React, { useState } from 'react';
import "../setup.css";

export default function Setup() {

    const [knowledge, setKnowledge] = useState(50);
    const [knowledgeGoal, setKnowledgeGoal] = useState(100);

    const [strength, setStrength] = useState(50);
    const [strengthGoal, setStrengthGoal] = useState(100);

    const [resources, setResources] = useState(50);
    const [resourcesGoal, setResourcesGoal] = useState(100);

    const [health, setHealth] = useState(50);
    const [healthGoal, setHealthGoal] = useState(100);

    const [charisma, setCharisma] = useState(50);
    const [charismaGoal, setCharismaGoal] = useState(100);
    const [jwt] = useState(localStorage.getItem("jwt"));
    const url = "/stat/calculate";

    const statNames = ["knowledge", "strength", "resources", "health", "charisma"];
    
    function changeStat(value, setter, goal) {
        setter(Math.min(value, goal));
    }

    function changeGoal(value, setter, stat) {
        setter(Math.max(value, stat));
    }

    const sliderComponents = [
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.min(knowledge, knowledgeGoal)} id="slider" onInput={(e) => changeStat(e.target.value, setKnowledge, knowledgeGoal)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.min(strength, strengthGoal)} id="slider" onChange={(e) => changeStat(e.target.value, setStrength, strengthGoal)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.min(resources, resourcesGoal)} id="slider" onChange={(e) => changeStat(e.target.value, setResources, resourcesGoal)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.min(health, healthGoal)} id="slider" onChange={(e) => changeStat(e.target.value, setHealth, healthGoal)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.min(charisma, charismaGoal)} id="slider" onChange={(e) => changeStat(e.target.value, setCharisma, charismaGoal)}></input>
    ];
    const sliderComponentsExpected = [
        <input className="h-2 bg-gray-200 rounded-lg"type="range" min="0" max="99" value={Math.max(knowledge, knowledgeGoal)} id="slider" onInput={(e) => changeGoal(e.target.value, setKnowledgeGoal, knowledge)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.max(strength, strengthGoal)} id="slider" onChange={(e) => changeGoal(e.target.value, setStrengthGoal, strength)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.max(resources, resourcesGoal)} id="slider" onChange={(e) => changeGoal(e.target.value, setResourcesGoal, resources)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.max(health, healthGoal)} id="slider" onChange={(e) => changeGoal(e.target.value, setHealthGoal, health)}></input>,
        <input className="h-2 bg-gray-200 rounded-lg" type="range" min="0" max="99" value={Math.max(charisma, charismaGoal)} id="slider" onChange={(e) => changeGoal(e.target.value, setCharismaGoal, charisma)}></input>
    ];
    const statDescriptions = ["Knowledge is everything to do with any acquired capabilities relative to your cognitive development. Formal education, reading books, mentorship, and work experience are all great ways to level up your knowledge stat.",
"The strength stat represents everything to do with both physical and mental strength. Lifting weights, running, refusing to give up, and fasting are all potential ways to level up your strength stat.",
"The resource stat represents everything of value that you currently own. Net worth, income, debt, and real estate all affect your resource stat.",
"The health stat represents your overall ability to function to your best ability in life. Diet, sleep, meditation, and therapy all afect your health stat",
"Charisma represents your ability to present yourself and communicate with others, measuring your perceived social likability. Speech, body language, appearance, and personality all affect your charisma stat."]
    const [index, setIndex] = useState(0);

    async function goNext() {
        if (index === statNames.length - 1) {
            const data = {
                knowledge: knowledge,
                knowledgeGoal: knowledgeGoal,
                strength: strength,
                strengthGoal: strengthGoal,
                resources: resources,
                resourcesGoal: resourcesGoal,
                health: health,
                healthGoal: healthGoal,
                charisma: charisma,
                charismaGoal: charismaGoal
            };
            await fetch(url, {method: "POST", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
              }, body: JSON.stringify(data)});
            window.location.href = '/';
            return;
        }
        setIndex(index + 1);
    }

    function goBack() {
        if (index === 0) {
            return;
        }
        setIndex(index - 1);
    }

  return (
    <>
    <div className="flex">
        <h1 className="font-mono font-bold text-5xl mb-10 inline">LifeStat</h1>
    </div>
        <div className="flex items-center justify-center h-screen -mt-40">
            <div className="text-center">
                <h1 className="text-4xl m-8">Let's set you up.</h1>
                <div className="block">
                    <h2 className="text-lg">If the middle is average, how would you rank your {statNames[index]}?</h2>
                    <span className="text-sm text-gray-600">Min</span>
                    {sliderComponents[index]}
                    <span className="text-sm text-gray-600">Max</span>
                    <h2 className="text-lg">Ideally, where would you want your {statNames[index]} stat to be?</h2>
                    <span className="text-sm text-gray-600">Min</span>
                    {sliderComponentsExpected[index]}
                        <span className="text-sm text-gray-600">Max</span>

                    <div className="block">
                    {(index !== 0) ? <button className="m-3 px-3 py-2 bg-gray-600 text-gray-50 rounded-xl hover:bg-gray-500" onClick={goBack}>Prev</button> : <></>}
                    <button className="m-3 px-3 py-2 bg-gray-600 text-gray-50 rounded-xl hover:bg-gray-500" onClick={goNext}>{(index === statNames.length - 1) ? <>submit</> : <>Next</>}</button>
                    </div>
                </div>
                <p className="text-center w-3/5 ml-auto mr-auto">
                    {statDescriptions[index]}
                </p>
            </div>
        </div>
    </>
  )
}
