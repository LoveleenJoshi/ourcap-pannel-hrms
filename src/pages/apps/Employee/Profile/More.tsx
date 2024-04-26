import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Tab, Nav, Dropdown } from 'react-bootstrap';
import classnames from 'classnames';

// data
import General from './General';
import config from '../../../../config';
import Job from './Job';
import Payroll from './Payroll';
import Documents from './Documents';
import Settings from './Settings';
import { bank } from './data';
import BASE_URL from "../../../../Base_URL/base_url"
// more


interface Personal {
    Full_Name: 
    string;
    Gender:
    string;
    Date_of_Birth:
    string;
    Marital_Status:
    string;
    Nationality:
    string;
    National_ID_Number:
    string;
    Personal_Tax_ID:
    string;
    Email_Address:
    string;
    Phone_Number:
    string;
}

interface Address {
    Primary_Address: string;
    Country: string;
    City: string;
    State: string;
    Postal_Code: string;
}

interface Emergency {
    Full_Name: string;
    Relationship: string;
    Phone_Number: string;
}

interface Bank{
    Bank_Name: string;
    Account_Name: string;
    Branch: string;
    Account_Number: string;
    SWIFT: string;
    PAN: string;
    IFSC: string;
}

interface Employment{
    Employee_ID: string;
    Joining_Date: string;
    Service_Years: string;
}
interface Probation{
    Probation_Start_Date: string
    Probation_End_Date: string
    Result: string
    Comment: string
    Attached_File: string
}

const More = () => {
const [userData,setUserData]= useState<Personal>({
    Full_Name: '',
    Gender: '',
    Date_of_Birth: '',
    Marital_Status: '',
    Nationality: '',
    National_ID_Number: '',
    Personal_Tax_ID: '',
    Email_Address: '',
    Phone_Number: '',
});
const [Address,setAddress]=useState<Address>({
    Primary_Address: "",
    Country: '',
    City: '',
    State: '',
    Postal_Code: ''
})


const [emergancy,setEmergancy]=useState<Emergency>({
    Full_Name: "",
    Relationship:"",
    Phone_Number:""
})
const [bankdata,setBankData]=useState<Bank>({
    Bank_Name: " ",
    Account_Name: " ",
    Branch: '',
    Account_Number: '',
    SWIFT: '',
    PAN: '',
    IFSC:'',
})


const [jobRelatedData,setJobData]=useState<Employment>({
    Employee_ID:"",
    Joining_Date: "",
    Service_Years:""
})


const [probation,setProbation]=useState<Probation>({
    Probation_Start_Date:"",
    Probation_End_Date:"",
    Result: "",
    Comment: "",
    Attached_File:""
})
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
                console.log( result.data.user.name)
                setUserData({
                    Full_Name: result.data.user.name,
                    Gender: result.data.user.gender,
                    Date_of_Birth: result.data.user.date_of_birth,
                    Marital_Status: result.data.user.marital_status,
                    Nationality: result.data.user.nationality,
                    National_ID_Number: result.data.user.national_id_number,
                    Personal_Tax_ID: result.data.user.personal_tax_id,
                    Email_Address: result.data.user.email,
                    Phone_Number: result.data.user.contact_number,
                });
                setAddress({
                    Primary_Address: result.data.addresses.primary_address,
                    Country: result.data.addresses.country_name,
                    City:result.data.addresses.city_id ,
                    State:result.data.addresses.state_name ,
                    Postal_Code: result.data.addresses.postal_code
                });
                setEmergancy({
                    Full_Name: result.data.emergencyUserDetaile.emergency_contact_name,
                     Relationship:result.data.emergencyUserDetaile.relation,
                     Phone_Number:result.data.emergencyUserDetaile.emergency_contact_number
                });
                setBankData({
                    Bank_Name: result.data.bank_detail.name,
                    Account_Name: result.data.bank_detail.account_holder_name ,
                    Branch:  result.data.bank_detail.branch,
                    Account_Number: result.data.bank_detail.account_number,
                    SWIFT:result.data.bank_detail.shift_bic,
                     PAN: result.data.bank_detail.pan_number,
                    IFSC: result.data.bank_detail.ifsc_code
                });
                setJobData({
                    Employee_ID: result.data.employee_detail.employee_id,
                    Joining_Date: result.data.employee_detail.date_of_join,
                    Service_Years: result.data.employee_detail.service_of_year
                });
                const { start_date, end_date, result:newResult, comment, attachments } = result.data.probationDetails[0];

            // Assuming setProbation is a function that handles the fetched data
            setProbation({
                Probation_Start_Date: start_date,
                Probation_End_Date: end_date,
                Result: newResult,
                Comment: comment,
                Attached_File: attachments
            });
                // setProbation({
                //     Probation_Start_Date:result.data.probationDetails[0].start_date,
                //     Probation_End_Date:result.data.probationDetails[0].end_date,
                //     Result: result.data.probationDetails[0].result,
                //     Comment: result.data.probationDetails[0].comment,
                //     Attached_File:result.data.probationDetails[0].attachments
                // })
                console.log(  `Gender: ${result.data.user.gender}`)
            } else {
                console.error("Failed to fetch PersonalData: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    fetchData();
}, []); 



    return (
        <>
            <Tab.Container defaultActiveKey="general">
                <Card>
                    <Card.Body className="p-0">
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            <Nav.Item as="li">
                                <Nav.Link className="cursor-pointer px-3 py-2" eventKey="general">
                                    <i className="mdi mdi-pencil-box-multiple font-18 d-md-none d-block"></i>
                                    <span className="d-none d-md-block">General</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="cursor-pointer px-3 py-2" eventKey="job">
                                    <i className="mdi mdi-image font-18 d-md-none d-block"></i>
                                    <span className="d-none d-md-block">Job</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="cursor-pointer px-3 py-2" eventKey="payroll">
                                    <i className="mdi mdi-book-open-variant font-18 d-md-none d-block"></i>
                                    <span className="d-none d-md-block">Payroll</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="cursor-pointer px-3 py-2" eventKey="documents">
                                    <i className="mdi mdi-book-open-variant font-18 d-md-none d-block"></i>
                                    <span className="d-none d-md-block">Documents</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="cursor-pointer px-3 py-2" eventKey="settings">
                                    <i className="mdi mdi-book-open-variant font-18 d-md-none d-block"></i>
                                    <span className="d-none d-md-block">Account Settings</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

    
                        <Tab.Content className="pt-0">
                            <Tab.Pane eventKey="general" className="p-0">
                                <General  personalData={userData} addressData={Address} emergancyData={emergancy} bankData={bankdata}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="job" className="p-0">
                                <Job  jobDataProp={jobRelatedData} probationDataProp={probation}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="payroll" className="p-0">
                                <Payroll/> 
                            </Tab.Pane>
                            <Tab.Pane eventKey="documents" className="p-0">
                                <Documents/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="settings" className="p-0">
                                <Settings/>
                            </Tab.Pane>
                           
                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>

           

        </>
    );
};

export default More;
