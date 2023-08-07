import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function RequireAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/auth/validate?token="+localStorage.getItem("jwt"), {method: "GET", headers: {
                "Content-Type": "application/json"
            }});
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("name", data.name);
                //console.log(loaded);
                if (data.hasSetup === 'false' && !window.location.href.includes("/setup")) {
                    console.log("need to setup");
                    navigate('/setup');
                }
                else if (data.hasSetup === 'true' && window.location.href.includes("/setup")) {
                    console.log("nah");
                    navigate('/home');
                }
                else {
                    console.log("nah");
                    navigate('/home');
                }
                setLoggedIn(true)
            }
            else {
                setLoggedIn(false);
            }
            setLoaded(true);
        }
        checkAuth();
    }, []);

  return (
    loaded ?
    loggedIn ? <Outlet></Outlet> : <Navigate to="/login" state={{from: location}} replace /> : <>loading</>
  )
}
