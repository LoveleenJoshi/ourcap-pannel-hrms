import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

// dummy data
import { salary } from './data';
import Table from '../../../../components/Table';


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
        Header: 'Effective From',
        accessor: 'from_date',
        sort: false,
    },
    {
        Header: 'Effective To',
        accessor: 'to_date',
        sort: false,
    },
    {
        Header: 'Salary',
        accessor: 'salary',
        sort: false,
    },
    {
        Header: 'Payslip',
        accessor: 'payslip',
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
        value: salary.length,
    },
];

// feeds
const Job = () => {

    return (
        <>
           
            
            <Card>
                <Card.Body>
                  
                    <h4 className="header-title mb-3">Salary Record</h4>
                    <Row>
                           
                                <>
                                   <Table
                                        columns={columns}
                                        data={salary}
                                        pageSize={10}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={false}
                                        pagination={false}
                                        isSearchable={false}
                                        tableClass="table-striped dt-responsive nowrap w-100"
                                    />
                                </>
                          
                    </Row>
                </Card.Body>
            </Card>
           
        </>
    );
};

export default Job;
