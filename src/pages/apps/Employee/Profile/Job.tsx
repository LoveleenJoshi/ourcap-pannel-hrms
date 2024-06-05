import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import config from '../../../../config';
// dummy data
// import { employment, probation, job } from './data';
import Table from '../../../../components/Table';
/* const CommonLoop = ({ info }: { info: any }) => {
    return (
        <>
            {Object.entries(info).map(([key, value]) => {
                return (
                    <Row className='font-14'>
                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col><Col xs={6} className='mb-1'>{value}</Col>
                    </Row>
                );
            })}
        </>
    );
} */

/* action column render */

const ActionColumn = ({ row }: { row: any }) => {
    const handleDownload = async () => {
        // Check if the contract URL is available
        if (!row.original.contract || row.original.contract.trim() === "") {
            alert("There is no data available.");
            return;
        }

        try {
            // Log the download attempt
            console.log('Downloading file from:', row.original.contract);

            // Fetch the file as a Blob
            const response = await fetch(row.original.contract, {
                method: 'GET', // Assuming GET, update if necessary
                headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`, // If needed
                    'Content-Type': 'application/pdf',
                    'Accept': 'application/json'
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
            const filename = row.original.contract.split('/').pop() || 'download.pdf';
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
        <>
            <Button variant="light" onClick={handleDownload} >
                <i className="mdi mdi-download"></i> 
            </Button>
        </> 
    );
};

const columns = [
    {
        Header: 'From',
        accessor: 'from_date',
        sort: false,
    },
    {
        Header: 'To',
        accessor: 'to_date',
        sort: false,
    },
    {
        Header: 'Job Title',
        accessor: 'job_title',
        sort: false,
    },
    {
        Header: 'Position Type',
        accessor: 'position_type',
        sort: false,
    },
    {
        Header: 'Employement Type',
        accessor: 'employement_type',
        sort: false,
    },
    {
        Header: 'Department',
        accessor: 'department',
        sort: false,
    },
    {
        Header: 'Contract',
        accessor: 'contract',
        sort: false,
        Cell: ActionColumn
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
        value: 0,
    },
];

// feeds


interface Employment{
    Employee_ID: string;
    Joining_Date: string;
    Service_Years: string;
}

interface EmployementProps{
    jobDataProp:Employment
}

interface Probation{
    Probation_Start_Date: string
    Probation_End_Date: string
    Result: string
    Comment: string
    Attached_File: string
}
interface ProbationProp{
    probationDataProp:Probation
}
interface JobTimeline {
    from_date: string;
    to_date: string
    job_title: string;
    position_type: string;
    employement_type: string;
    department: string;
    contract: string;
}
interface JobTimelineProp {
    JobTimeLineDataProp: JobTimeline[]; 
}
const Job: React.FC<EmployementProps & ProbationProp & JobTimelineProp>= ({jobDataProp, probationDataProp,JobTimeLineDataProp}) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-3">Employment Info</h4>
                    <Row>
                      
                                     {Object.entries(jobDataProp).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{value}</Col>
                                    </React.Fragment>
                                ))}
                            
                    
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-3">Probation</h4>
                    <Row>
                      
                                {Object.entries(probationDataProp).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{value}</Col>
                                    </React.Fragment>
                                ))}
                           
                        
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-3">Job Timeline</h4>
                    <Row>
                        <Table
                            columns={columns}
                            data={JobTimeLineDataProp}
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
           
        </>
    );
};

export default Job;
