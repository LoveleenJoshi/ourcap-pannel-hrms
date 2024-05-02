import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import config from '../../../../config';

import avatar from '../../../../assets/images/users/user-1.jpg';
import BASE_URL from "../../../../Base_URL/base_url"

interface UserProfileData {
    name: string;
    designation: string;
    email: string;
    phone: string;
    timezone: string;
    department: string;
    office: string;
    profile_image:string
}

const UserProfile : React.FC = () => {
    const [userData, setUserData] = useState<UserProfileData>({
        profile_image:"",
    name:"",
    designation:'',
    email: '',
    phone:'',
    timezone: '',
    department: '',
    office: ''
    });
    useEffect(() => {
       
        const fetchData = async () => {
            try {
                const url = `${BASE_URL}/api/user`;
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${config.API_TOKEN}`
                };
    
                const requestOptions = {
                    method: 'GET',
                    headers: headers,
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    const result = await response.json();
                    setUserData({
                        name:result.data.user.name,
                        profile_image:result.data.user.profile_image,
                        designation:result.data.employee_detail.job_title,
                        email: result.data.user.email,
                        phone:result.data.user.contact_number,
                        timezone: result.data.user.timezone,
                        department: result.data.employee_detail.department,
                        office: result.data.employee_detail.office

                    })
            }
            else {
                console.error("Failed to fetch PersonalData: ", response.statusText);
            }
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
        fetchData();
    }, []);
    return (
        <>
            <Card>
                <Card.Body>
                   

                    <div className="d-flex align-self-start">
                        <img className="d-flex align-self-start rounded-circle me-2"
                         src={userData.profile_image===null||userData.profile_image===""?`${avatar}`:userData.profile_image}
                          alt="" 
                          height="48" />

                        <div className="w-100 ps-1">
                            <h4 className="mt-1 mb-0">{userData.name}</h4>
                            <p className="mb-1 mt-1 text-muted">{userData.department}</p>
                        </div>
                    </div>

                    <h6 className="font-13 text-muted mt-3 text-uppercase">EMAIL</h6>
                    <h5>{userData.email}</h5>

                    <h6 className="font-13 text-muted mt-3 text-uppercase">PHONE</h6>
                    <h5>+91 9928000011</h5>

                    <h6 className="font-13 text-muted mt-3 text-uppercase">TIMEZONE</h6>
                    <h5>GMT +05:30</h5>

                 

                    <hr></hr>

                    <h6 className="font-13 text-muted mt-3 text-uppercase">DEPARTMENT</h6>
                    <h5>{userData.department}</h5>

                    <h6 className="font-13 text-muted mt-3 text-uppercase">OFFICE</h6>
                    <h5>{userData.office}</h5>
                 
                </Card.Body>
            </Card>
        </>
    );
};

export default UserProfile;
