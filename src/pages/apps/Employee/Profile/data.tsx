import avatar3 from '../../../../assets/images/users/user-3.jpg';
import avatar4 from '../../../../assets/images/users/user-4.jpg';
import avatar5 from '../../../../assets/images/users/user-6.jpg';

import img1 from '../../../../assets/images/small/img-4.jpg';
import img2 from '../../../../assets/images/small/img-1.jpg';
import img3 from '../../../../assets/images/small/img-3.jpg';



interface AddressProp {
    Primary_Address: string;
    Country: string;
    City: string;
    State: string;
    Postal_Code: string;
}

interface EmergencyProp {
    Full_Name: string;
    Relationship: string;
    Phone_Number: string;
}

interface BankProp{
    Bank_Name: string;
    Account_Name: string;
    Branch: string;
    Account_Number: string;
    SWIFT: string;
    IBAN: string;
    IFSC: string;
}

interface EmploymentProp{
    Employee_ID: string;
    Joining_Date: string;
    Service_Years: string;
}

interface ProbationProp{
    Probation_Start_Date: string
    Probation_End_Date: string
    Result: string
    Comment: string
    Attached_File: string
}

interface JobTimelineProp {
    from_date: string;
    to_date: string
    job_title: string;
    position_type: string;
    employement_type: string;
    department: string;
    contract: any;
}

interface SalaryProp {
    from_date: string;
    to_date: string
    salary: string;
    payslip: any;
}

interface DocsProp {
    sn: number;
    file: string
}

interface SettingsProp {
    timezone: any;
    timezone_name: string;
}


// const personal:PersonalProp[] = [
    // {
    //     Full_Name:
    //     'Geneva',
    //     Gender:
    //     'Female',
    //     Date_of_Birth:
    //     '15 Jan 1991',
    //     Marital_Status:
    //     'Married',
    //     Nationality:
    //     'Indian',
    //     National_ID_Number:
    //     '831234567110',
    //     Personal_Tax_ID:
    //     'CUEPK1010D',
    //     Email_Address:
    //     'geneva@coretechies.com',
    //     Phone_Number:
    //     '+91 9928000011',
    // },
// ];
// const address:AddressProp[] = [
//     {
//         Primary_Address:
//         'Village Post Bikaner',
//         Country:
//         'India',
//         City:
//         'Bikaner',
//         State:
//         'Rajasthan',
//         Postal_Code:
//         '330011',
//     },
// ];
// const emergency:EmergencyProp[] = [
//     {
//         Full_Name:
//         'John Smith',
//         Relationship:
//         'Father',
//         Phone_Number:
//         '+91 9414000022'
//     },
// ];
const bank:BankProp[] = [
    {
        Bank_Name: 'Federanl Bank' ,
        Account_Name: 'Geneva',
        Branch: 'Bikaner' ,
        Account_Number: '60090050010',
        SWIFT: 'FBIN300011',
        IBAN: '-',
        IFSC: '-',
    },
];
const employment:EmploymentProp[] = [
    {
        Employee_ID: 
        "-",
        Joining_Date:
        "15 Jan 2014",
        Service_Years:
        "10 years 0 months"
       
    },
];
const probation:ProbationProp[] = [
    {
        Probation_Start_Date: '-',
        Probation_End_Date: '-',
        Result: '-',
        Comment: '-',
        Attached_File: '-'
       
    },
];
const job:JobTimelineProp[] = [
    {
        from_date: '16 Jun 2013',
        to_date: '-' ,
        job_title: 'Software Engineer',
        position_type: 'Employee',
        employement_type: 'Full Time',
        department: 'IT',
        contract: '',
       
    },
    {
        from_date: '15 Jan 2011',
        to_date: '15 Jun 2013' ,
        job_title: 'Software Intern',
        position_type: 'Employee',
        employement_type: 'Full Time',
        department: 'IT',
        contract: '',
       
    },
];
const salary:SalaryProp[] = [
    {
        from_date: '01 April 2024',
        to_date: '30 April 2024' ,
        salary: '50000',
        payslip: '',
       
    },
];
const docs:DocsProp[] = [
    {
        sn: 1,
        file: 'Aadhar Card' ,       
    },
    {
        sn: 2,
        file: 'Pan Card' ,       
    },
];
const settings:SettingsProp[] = [
    {
        timezone: 'GMT +05:30' ,   
        timezone_name: 'Kolkata'    
    },
   
];

export { bank, employment, probation, job, salary, docs, settings};
