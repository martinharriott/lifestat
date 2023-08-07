import { useEffect, useState } from 'react';
import Stat from './Stat';

export default function Stats ({stats, setStats}) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchData = async () => {        
        const url = process.env.REACT_APP_BACKEND_URL + "/stat";
        const response = await fetch(url, {headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }});
        const data = await response.json();
        setStats(data);
        setLoading(false);

      };
      fetchData();
    }, []);

    return (
      <div>
        {loading || !stats ? <div>loading stats...</div> : 
        <div className="text-gray-50">
          <div className="grid grid-cols-5 ml-40 mr-40">
            {stats.map((stat, index) => {
              return (
                <div key={stat.name}>
                  <Stat stat={stat} color={index} />
                </div>
              );
            })}
          </div>
        </div>
        }
      </div>
    )
}
