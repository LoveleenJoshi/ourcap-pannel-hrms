import React, {useState, useEffect, useMemo} from 'react';
import { Card, Button, Dropdown, Row, Col } from 'react-bootstrap';


// components
import ChartStatistics from '../../../components/ChartStatistics';


// Helper function to format duration in HH:MM:SS format
function formatDuration(duration:any) {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
  
    return `${hours}h ${minutes}m ${seconds}s`;
  }

const Clockinout = () => {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [firstClockInTime, setFirstClockInTime] = useState<any>(null);
    const [lastClockOutTime, setLastClockOutTime] = useState<any>(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const handleClockButton = () => {
        setIsClockedIn((prev) => !prev);
    }

    useEffect(() => {
        let interval:any;
    
        if (isClockedIn) {
          // Clock In
          const currentTime = new Date();
          firstClockInTime === null ? setFirstClockInTime(`${currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`) : setFirstClockInTime(firstClockInTime);
    
          // Start tracking duration when clocked in
          const startTime = currentTime.getTime();
    
          interval = setInterval(() => {
            // Update the total duration every second
            setTotalDuration((prevDuration) => prevDuration + 1000);
          }, 1000);
        } else {
          // Clock Out
          const currentTime = new Date();
          lastClockOutTime === null ?  setLastClockOutTime("--:--")  :  
          setLastClockOutTime(`${currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`)  ;
    
          // Clear the interval when user clocks out
          clearInterval(interval);
        }
    
        return () => {
          // Clear the interval when component unmounts or user clocks out
          clearInterval(interval);
        };
      }, [isClockedIn]);

    return (
        <>
            <Card>
                <Card.Body>

                    <h4 className="header-title mb-0">Clock In/Out
                        <p className="text-success text-center float-end" ><span><span>{totalDuration > 0 && (<>{formatDuration(totalDuration)}</>)}</span></span></p>
                    </h4>
                    <p className='text-secondary'>Now you're Clocked {isClockedIn ? 'In' : 'Out'}</p>
                    
                    <div className="widget-chart text-center" dir="ltr">
                        <Row className="mt-3 mb-3">
                            <Col className='pr-0'>
                                <div className="bg-light p-1">
                                    <ChartStatistics title="First In" icon="fe-arrow-up" stats={ firstClockInTime === null ? '--:--' : String(firstClockInTime)} variant="success" />
                                </div>
                            </Col>
                            <Col className='pl-0'>
                                <div className="bg-light p-1">
                                    <ChartStatistics title="Last Out" icon="fe-arrow-down" stats={ lastClockOutTime === null ? '--:--' : String(lastClockOutTime)} variant="danger" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col className='d-grid'>
                            <Button variant={ isClockedIn ? 'danger' : 'success'} onClick={handleClockButton} className="rounded-pill waves-effect waves-light p-2" size="lg">
                                Clock {isClockedIn ? 'Out' : 'In'} 
                            </Button>
                        </Col>
                    </Row>


                </Card.Body>
            </Card>
        </>
    );
};

export default Clockinout;
