import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

// dummy data
// import { salary } from './data';
import Table from '../../../../components/Table';
import config from "../../../../config"


/* action column render */
// const ActionColumn = ({ row }: { row: any }) => {
    
//     return (
//         <>
//             <Button variant="light" >
//                 <i className="mdi mdi-download"></i> 
//             </Button>
//         </> 
//     );
// };
// const ActionColumn = ({ row }: { row: any }) => {
//     const handleDownload = () => {
//         const link = document.createElement('a');
//         link.href = row.original.link;
//         link.target = '_blank';
//         link.rel = 'noopener noreferrer';
//         link.type = 'application/pdf';
//         const filename = row.original.link.split('/').pop() || 'payslip.pdf';
//         console.log('Downloading payslip:', row.original.link);
//         link.setAttribute('download', filename);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <button className="btn btn-light" onClick={handleDownload}>
//             <i className="mdi mdi-download"></i> 
//         </button>
//     );
// };

const ActionColumn = ({ row }: { row: any }) => {
    const handleDownload = async () => {
        try {
            // Log the download attempt
            console.log('Downloading file from:', row.original.link);

            // Fetch the file as a Blob
            const response = await fetch(row.original.link, {
                method: 'GET', // Assuming GET, update if necessary
                headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`, // If needed
                    'Content-Type': 'application/pdf'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }

         
            const blob = await response.blob();

         
            const url = window.URL.createObjectURL(blob);

        
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            const filename = row.original.link.split('/').pop() || 'download.pdf';
            a.download = filename; 
            document.body.appendChild(a);
            a.click();

           
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert("Your file has been downloaded!"); 
        } catch (error) {
            console.error('Download error:', error);
            alert("Failed to download the file.");
        }
    };

    return (
        <button className="btn btn-light" onClick={handleDownload}>
            <i className="mdi mdi-download"></i>
        </button>
    );
};

interface Salary {
    effective_from: string;
    effective_to: string
    total_salary: string;
    link:String;
}
interface SalaryProp {
    SalaryData: Salary[];
}

// const columns = [
//     {
//         Header: 'Effective From',
//         accessor: 'from_date',
//         sort: false,
//     },
//     {
//         Header: 'Effective To',
//         accessor: 'to_date',
//         sort: false,
//     },
//     {
//         Header: 'Salary',
//         accessor: 'salary',
//         sort: false,
//     },
//     {
//         Header: 'Payslip',
//         accessor: 'payslip',
//         sort: false,
//         Cell: ActionColumn
//     },
// ];

const columns = [
    {
        Header: 'effective_from',
        accessor: 'effective_from',
        sort: false,
    },
    {
        Header: 'effective_to',
        accessor: 'effective_to',
        sort: false,
    },
    {
        Header: 'Total Salary',
        accessor: 'total_salary',
        sort: false,
    },
    {
        Header: 'Payslip',
        accessor: 'link', // Assuming 'link' contains the URL for the payslip
        sort: false,
        Cell: ActionColumn
        // Cell: ({ row }: { row: any }) => (
        //     <a href={row.original.link} target="_blank" rel="noopener noreferrer" download>
        //         View Payslip
        //     </a>
        // ),
   
    },
];


const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value:0,
    },
];

// feeds
// const Job : React.FC< SalaryProp> =({SalaryData})=> {
//     // const Job =()=> {
//     return (
//         <>
           
            
//             <Card>
//                 <Card.Body>
                  
//                     <h4 className="header-title mb-3">Salary Record</h4>
//                     <Row>
                           
//                                 <>
//                                    <Table
//                                         columns={columns}
//                                         data={[SalaryData]}
//                                         pageSize={10}
//                                         sizePerPageList={sizePerPageList}
//                                         isSortable={false}
//                                         pagination={false}
//                                         isSearchable={false}
//                                         tableClass="table-striped dt-responsive nowrap w-100"
//                                     />
//                                 </>
                          
//                     </Row>
//                 </Card.Body>
//             </Card>
           
//         </>
//     );
// };

// export default Job;
const Payroll : React.FC< SalaryProp> =({SalaryData})=>{
    // console.log(SalaryData)
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">Salary Record</h4>
                <Row>
                    <Table
                        columns={columns}
                        data={SalaryData}
                        pageSize={10}
                        sizePerPageList={sizePerPageList}
                        isSortable={false}
                        pagination={false}
                        isSearchable={false}
                        tableClass="table-striped dt-responsive nowrap w-100"
                    />
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Payroll;