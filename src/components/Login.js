import { useState } from "react";
import React from 'react'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "/auth/login";
  
  async function performLogin() {
    const data = {
      userName: username,
      password: password 
    };
    console.log(data);
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    }, body: JSON.stringify(data)});
    Promise.all([response.json(), response.headers])
    .then(([body, headers]) => {
      console.log(headers);
      console.log(headers.get("authorization"));
      console.log(body.token);
      localStorage.setItem("jwt", body.token);

    })
    //const auth = response.headers.get("Content-Type");
    //console.log(auth);
    console.log("login");
    window.location.href = '/';
  }
  return (
    <>
    <h1 className="font-mono font-bold text-5xl mb-10 inline">LifeStat</h1>
    <div className="flex items-center justify-center h-screen -mt-40">
        <div className="bg-gray-100 px-10 py-5 rounded-2xl shadow-md">
          <h1 className="text-3xl mx-2 my-4">Login</h1>
          <div className="gap-3 m-2">
          Username:
          </div>
          <div className="gap-3 m-2">
            <input className="pl-1 pr-1 rounded-md w-80" type="email" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          <div className="flex gap-3 m-2">
          Password: 
          </div>
          <div className="flex gap-3 m-2">
            <input className="ml-auto pl-1 pr-1 rounded-md w-80" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <button className="bg-gray-800 text-gray-50 rounded-lg py-2 px-4 m-2 hover:bg-gray-600" id="submit" type="button" onClick={performLogin}>Login</button>
          <div className="flex justify-center mt-4">
            <button className="block text-center p-2 rounded-lg hover:bg-gray-300" id="submit" type="button" onClick={() => window.location.href = '/register'}>
              Create an account.
            </button>
          </div>
        </div>
    </div>
    </>
  )
}
