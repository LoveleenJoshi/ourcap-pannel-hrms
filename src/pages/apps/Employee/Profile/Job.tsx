import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

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
    
    return (
        <>
            <Button variant="light" >
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
    contract: any;
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
