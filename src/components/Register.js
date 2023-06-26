import { useState } from "react";

export default function Register() {

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(null);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(null);
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("Username must be 4-15 characters long with no special characters.");
    const url = "/auth/register";
    const usernamePattern = /^[a-zA-Z0-9]{4,15}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/;

    
    async function performRegister() {
      if (!passwordPattern.test(password)) setValidPassword(false);
      if (!usernamePattern.test(username)) {
        setUsernameErrorMsg("Username must be 4-15 characters long with no special characters.");
        setValidUsername(false);
      }
      if (password !== confirmPassword) setValidConfirmPassword(false);
      if (!(validPassword && validConfirmPassword && validUsername)) return;

      const data = {
      userName: username,
      password: password 
      };
      console.log(data);
      const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
      }, body: JSON.stringify(data)});

      if (response.status === 400) {
        console.log("bad status");
        setUsernameErrorMsg("This username is already taken.");
        setValidUsername(false);
        return;
      }
      window.location.href = '/login';
    }

    const updateUsername = (e) => {
      setUsername(e.target.value);
      if (!validUsername) setValidUsername(usernamePattern.test(e.target.value));
    }

    const updatePassword = (e) => {
      setPassword(e.target.value);
      if (!validPassword) setValidPassword(passwordPattern.test(e.target.value));
    }

    const updateConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
      if (!validConfirmPassword) setValidConfirmPassword(password === e.target.value);
    }
  return (
    <>
    <h1 className="font-mono font-bold text-5xl mb-10 inline">LifeStat</h1>
    <div className="flex items-center justify-center h-screen -mt-40">
      <div className="bg-gray-100 px-10 py-5 rounded-2xl shadow-md">
        <h1 className="text-3xl mx-2 my-4">Create an account</h1>
          <div className="gap-3 m-2">
          Username:
          </div>
          <div className="m-2">
            <input className="pl-1 pr-1 rounded-md w-80" type="email" id="username" value={username} onChange={updateUsername}
            onBlur={() => {setUsernameErrorMsg("Username must be 4-15 characters long with no special characters."); setValidUsername(usernamePattern.test(username))}}
            ></input>
            {validUsername === false ? <span className="error-message w-80">{usernameErrorMsg}</span> : <></>}
          </div>
          <div className="m-2">
          Password: 
          </div>
          <div className="m-2">
            <input className="pl-1 pr-1 rounded-md w-80" type="password" id="password" value={password} onChange={updatePassword} onBlur={() => setValidPassword(passwordPattern.test(password))}></input>
            {validPassword === false ? <span className="error-message w-80">Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character</span> : <></>}
          </div>
          <div className="m-2">
          Confirm Password: 
          </div>
          <div className="m-2">
            <input className="pl-1 pr-1 rounded-md w-80" type="password" id="confirm-password" value={confirmPassword} onChange={updateConfirmPassword} onBlur={() => setValidConfirmPassword(password === confirmPassword)}></input>
            {validConfirmPassword === false ? <span className="error-message w-80">Doesn't match password above.</span> : <></>}
          </div>
        <button className="bg-gray-800 text-gray-50 rounded-lg py-2 px-4 m-2 hover:bg-gray-600" id="submit" type="button" onClick={performRegister}>Register</button>
        <div className="flex justify-center mt-4">
            <button className="block text-center p-2 rounded-lg hover:bg-gray-300" id="submit" type="button" onClick={() => window.location.href = '/login'}>
              Have an account? Login instead.
            </button>
          </div>
      </div>
    </div>
    </>
  )
}
