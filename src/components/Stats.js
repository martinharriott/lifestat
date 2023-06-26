import { useEffect, useState } from 'react';
import Stat from './Stat';

export default function Stats ({stats, setStats}) {
    const [loading, setLoading] = useState(true);
    const [jwt] = useState(localStorage.getItem("jwt"));
    
    useEffect(() => {
      const fetchData = async () => {        
        const url = "/stat";
        const response = await fetch(url, {headers: {Authorization: "Bearer "+jwt}});
        console.log(response.status);
        const data = await response.json();
        setStats(data);
        setLoading(false);

        console.log(data)
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
