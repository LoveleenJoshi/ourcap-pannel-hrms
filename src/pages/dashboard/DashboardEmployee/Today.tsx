import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';



const Today = () => {
    const [currentTime, setCurrentTime] = useState(Today());
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(Today());
      }, 1000); 
      return () => clearInterval(intervalId);
    }, []); 

   

    function Today() {
      const now = new Date();
      const formattedTime =
        now.toLocaleDateString(["en-GB"], {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }).split("/").join(" ") +
        ', ' +
        now.toLocaleString([], { hour: '2-digit', minute: '2-digit'});
      return formattedTime;
    }
    return <>{currentTime}</>;
  }



export default Today;
