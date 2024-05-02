import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import config from '../../../config';
import EmployeesOnLeave from './EmployeesOnLeave';
import Clockinout from './Clockinout';
import Holidays from './Holidays';
import Today from './Today';
import { error } from 'console';
import BASE_URL from '../../../Base_URL/base_url';
// import { emplyeesonleaveList, holidayList } from './data';

interface Holiday {

    id: number
    office_id: number
    name: string
    holiday_date_to: string
    holiday_date_from: string
    days: string
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
 
};
interface EmployeesOnleave {
   
  id: number;
  name: string;
  profile_image: string;
  department: string;

}

const Dashboard = () => {
  const [holidaylist, setHolidayList] = useState<Holiday[]>([]);
  const [leaveList,setLeaveList]=useState<EmployeesOnleave[]>([]);
  // const [employeeLeaveList,setEmploeeLeaveList]=useState<EmployeesOnLeave[]>([]);
  // const [loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const url = `${BASE_URL}/api/get-holiday`;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${config.API_TOKEN}`
          };
         
          const requestOptions = {
            method: 'GET',
            headers: headers,
          };
        const response = await fetch(url, requestOptions); 
        if(response.status===201){
            const result = await response.json();
            setHolidayList(result.data.holiday);
            console.log()
        }else{
          console.error("Failed to fetch Holidays : " )
        }

      } catch (error:any) {
        console.error(error);
      } 
    };

    fetchData(); 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const url = `${BASE_URL}/api/dashboard`;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${config.API_TOKEN}`
          };
         
          const requestOptions = {
            method: 'GET',
            headers: headers,
          };
        const response = await fetch(url, requestOptions); 
        if(response.status===200){
            const result = await response.json();
          setLeaveList(result.data.leave);
            // console.log(result.data.leave)
        }else{
          console.error("Failed to fetch Holidays : " )
        }

      } catch (error:any) {
        console.error(error);
      } 
    };

    fetchData(); 
  }, []);

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right color-secondary">
                            <span className='badge bg-primary allcaps'><Today></Today></span>
                        </div> 
                         <div className="page-title-right">
                            <form className="d-flex align-items-center mb-3">
                                <div className="input-group input-group-sm">
                                   
                                </div>
                            </form>
                        </div> 
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>


            <Row className='flex-column-reverse flex-md-row'>
                <Col lg={8} xl={8} >
                    <EmployeesOnLeave contacts={leaveList}/>
                </Col>
                <Col lg={4} xl={4}  >
                    <Clockinout/>
               
                    <Holidays holiday={holidaylist}/>
                  
                </Col>
                
            </Row>

        </>
    );
};

export default Dashboard;
