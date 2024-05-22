import React, {useState, useEffect, useMemo} from 'react';
import { Card, Button, Dropdown, Row, Col,Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';


// components
import ChartStatistics from '../../../components/ChartStatistics';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import config from '../../../config';
import BASE_URL from '../../../Base_URL/base_url';


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
    const [showModal,setShowModal]=useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const handleClockButton = () => {
    //     // setIsClockedIn((prev) => !prev);
    //     if (isClockedIn) {
    //         setIsClockedIn(false);
    //         setShowModal(true);
    //     } else {
    //         setIsClockedIn(true);
    //         setShowModal(false);
    //     }
    // }

    // const handleClockButton = () => {
    //     if (isClockedIn) {
    //         const currentTime = new Date();
    //         const formattedTime = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    //         setLastClockOutTime(formattedTime);  // Set clock out time before toggling
    //         setShowModal(true);
    //         setIsClockedIn(false);  // Move this after updating the clock out time
    //     } else {
    //         setIsClockedIn(true);
    //         setShowModal(false);
    //         const currentTime = new Date();
    //         if (firstClockInTime === null) {
    //             setFirstClockInTime(currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    //         }
    //     }
    // }
    const handleClockButton = () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isClockedIn) {
            // Clock out logic
            setLastClockOutTime(formattedTime);
            setIsClockedIn(false);
            setShowModal(true);
        } else {
            // Clock in logic
            setIsClockedIn(true);
            setShowModal(false);
            if (firstClockInTime === null) {
                setFirstClockInTime(formattedTime);
            }
        }
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
          sendClockOutTimeToBackend();
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
    
      const sendClockOutTimeToBackend = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/clock-in-clock-out`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${config.API_TOKEN}`
                },
                body: JSON.stringify({ clockOutTime: lastClockOutTime })
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Failed to send clock out time:', error);
        }
    };
    

    //   const handleSubmit = async () => {
    //     if (isSubmitting) return; // Prevents double submission
      
    //     setIsSubmitting(true); // Disable the submit button
    //     try {
    //       const notes = (document.querySelector("textarea") as HTMLTextAreaElement)?.value;
    //       const formData = new FormData();
    //       formData.append("notes", notes);
    //       const response = await fetch("http://35.154.28.156/api/clock-in-clock-out", {
    //         method: "POST",
    //         body: formData,
    //         headers: {
    //           "Accept": "application/json",
    //           "Authorization": `Bearer ${config.API_TOKEN}`
    //         },
    //       });
    //       if (response.ok) {
    //         alert('Notes submitted successfully');
    //         setShowModal(false);
    //       } else {
    //         console.error('Failed to submit notes');
    //         alert('Failed to submit notes');
    //       }
    //     } catch (error) {
    //       console.log(`Some error occurred: ${error}`);
    //       alert(`Some error occurred: ${error}`);
    //     }
    //     setIsSubmitting(false); // Re-enable the submit button
    //   };
      
    const handleSubmit = async () => {
        if (isSubmitting) return; // Prevents double submission
      
        setIsSubmitting(true); // Disable the submit button
        try {
          const notes = (document.querySelector("textarea") as HTMLTextAreaElement)?.value;
          const formData = new FormData();
          formData.append("notes", notes);
          const response = await fetch(`${BASE_URL}/api/clock-in-clock-out`, {
            method: "POST",
            body: formData,
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${config.API_TOKEN}`
            },
          });
          if (response.ok) {
            alert('Notes submitted successfully');
            setShowModal(false);
          } else {
            console.error('Failed to submit notes');
            alert('Failed to submit notes');
          }
        } catch (error) {
          console.log(`Some error occurred: ${error}`);
          alert(`Some error occurred: ${error}`);
        }
        setIsSubmitting(false); // Re-enable the submit button
    };
    
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

            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <ModalHeader closeButton>
                    <ModalTitle >Notes</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <textarea className='form-control' rows={3} placeholder='Enter Notes Here'></textarea>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onClick={()=>setShowModal(false)}>Cancel</Button>
                    {/* <Button variant='primary' onClick={handleSubmit}>Submit</Button> */}
                    <Button variant='primary' onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Clockinout;
