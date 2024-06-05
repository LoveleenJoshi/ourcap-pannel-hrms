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
import SettingS from './Settings';
// import { bank } from './data';
import BASE_URL from "../../../../Base_URL/base_url";
import DataNotAvailable from '../../../../DataNotAvailable/DataNotAvailable';
import Spinner from "../../../../components/Spinner";

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
interface JobTimeline {
    from_date: string;
    to_date: string
    job_title: string;
    position_type: string;
    employement_type: string;
    department: string;
    contract: any;
}

interface Salary {
    effective_from: string;
    effective_to: string
    total_salary: string;
    link: string;
}
interface Docs {
    sn: number;
    title:string;
    document_file: string;
    id:number
}
interface Timezone {
    id?: number;
    name: string;
    timezoneformat: string;
    offset?: string;
}
interface Settings {
    name: string;
    timezoneformat: string;
}


///////////////////////////////////////////////////////////////
///Function to convert date into date-month-year format
function convertDateFormat(dateString:string) 
:string{
    // Parse the input date string
    const [year, month, day] = dateString.split('-');
    
    // Array of full month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Get the full name of the month
    const monthFullName = monthNames[parseInt(month, 10) - 1];
    
    // Construct the desired output string
    const formattedDate = `${day} ${monthFullName} ${year}`;
    
    return formattedDate;
}
const More = () => {
    const [loading,setLoading]=useState(true)
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

const [jobTimeLine,setJobTime]=useState<JobTimeline>({
    from_date: "",
    to_date: "",
    job_title: "",
    position_type:"",
    employement_type:"",
    department: "",
    contract: null
})

// const [salaryData, setSalarydata] = useState<Salary>({
//     salary_period: "",
//     generated_on: "",
//     total_salary: "",
//     link: ""
// })
const [salaryData, setSalarydata] = useState<Salary[]>([]);
const [docsData, setDocsdata] = useState<Docs[]>([]);
const [timezone,setTimeZone]=useState<Timezone[]>([]);
const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
const [settingsData, setSettingsData] = useState<Settings>({
    name: '',
    timezoneformat: '',
});
const [dataAvailable,setDataAvailable]=useState(true);

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true)
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
                setDataAvailable(true)
                // console.log( result.data.user.name)
                setUserData({
                    Full_Name: result.data.user.name,
                    Gender: result.data.user.gender,
                    Date_of_Birth: convertDateFormat(result.data.user.date_of_birth),
                    Marital_Status: result.data.user.marital_status,
                    Nationality: result.data.user.nationality,
                    National_ID_Number: result.data.user.national_id_number,
                    Personal_Tax_ID: result.data.user.personal_tax_id,
                    Email_Address: result.data.user.email,
                    Phone_Number: result.data.user.contact_number,
                });
                // setTimeZone({ 
                //     name: result.data.user.timezone, 
                //     timezoneformat: result.data.user.timezone,
                //     id: undefined,  // Explicitly set undefined if necessary
                //     offset: undefined  // Explicitly set undefined if necessary
                // });
            //     const timezoneName = result.data.user.timezone; // Assume this is a string
            // // Create a new timezone object with this name
            // const newTimezone:Timezone = {
            //     name: timezoneName,
            //     timezoneformat: timezoneName,  
            //     id: undefined,  
            //     offset: undefined  
            // };
            // setTimezone([newTimezone]);
            // setSelectedTimezone(newTimezone);
            // console.log(newTimezone.name)
            const timezoneName = result.data.user.timezone; // Assume this is a string
            const newTimezone: Timezone = {
                name: timezoneName,
                timezoneformat: timezoneName,
                id: undefined,
                offset: undefined
            };
            setTimeZone([newTimezone]);
            setSelectedTimezone(newTimezone);
            setSettingsData({
                name: timezoneName,
                timezoneformat: timezoneName
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
                    Joining_Date: convertDateFormat(result.data.employee_detail.date_of_join),
                    Service_Years: result.data.employee_detail.service_of_year
                });
                const { start_date, end_date, result:newResult, comment, attachments } = result.data.probationDetails[0];

      
            setProbation({
                Probation_Start_Date:convertDateFormat(start_date),
                Probation_End_Date: convertDateFormat(end_date),
                Result: newResult,
                Comment: comment,
                Attached_File: attachments
            });
            setJobTime({
                from_date: convertDateFormat(result.data.employee_detail.date_of_join ),
                to_date:  convertDateFormat(result.data.employee_detail.effective_date),
                job_title:  result.data.employee_detail.job_title,
                position_type: result.data.employee_detail.position,
                employement_type: result.data.employee_detail.employee_type,
                department: result.data.employee_detail.department,
                contract: null
            })
        
            setSalarydata(result.data.getMonthWiseSalary)
            setDocsdata(result.data.uploadedDocument); 
            console.log(result.data.uploadedDocument);
            setLoading(false)
            
                // console.log(  `Gender: ${result.data.user.gender}`)
            } else {
                console.error("Failed to fetch PersonalData: ", response.statusText);
                setDataAvailable(false)
                setLoading(false)
            }
        } catch (error:any) {
            console.error("Error fetching data: ", error);
            setDataAvailable(false)
            setLoading(false)
        }
    };
    fetchData();
}, []); 

if(!dataAvailable){
  return  <DataNotAvailable/>
}


    if(loading){
        return(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="md" type="bordered" color="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
        )
     

}
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
                                <General  
                                personalData={userData} 
                                setPersonalData={setUserData}  
                                addressData={Address} 
                                setAddressData={setAddress}
                                emergancyData={emergancy} 
                                setEmergencyData={setEmergancy}
                                bankData={bankdata}
                                setBankDetailsData={setBankData}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="job" className="p-0">
                                <Job  jobDataProp={jobRelatedData} probationDataProp={probation}  JobTimeLineDataProp={[jobTimeLine]}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="payroll" className="p-0">
                            <Payroll SalaryData={salaryData}/>  
                                {/* <Payroll />  */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="documents" className="p-0">
                                <Documents DocsData={docsData} setDocsDataMain={setDocsdata}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="settings" className="p-0">
                                {/* <Settings SettingsData={timezone}/> */}
                                {timezone.length > 0 && (
                                    <SettingS SettingsData={settingsData} setSettingsData={setSettingsData} />
                                )}
                                
                            </Tab.Pane>
                           
                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>

           

        </>
    );
};

export default More;
