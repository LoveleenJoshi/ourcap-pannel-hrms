import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

// dummy data
import { docs } from './data';
import Table from '../../../../components/Table';


/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
    
    return (
        <>
            <Button variant="light" >
                <i className="mdi mdi-download"></i> 
            </Button> {' '}
            <Button variant="danger" >
                <i className="mdi mdi-close"></i> 
            </Button>
        </> 
    );
};

const columns = [
    {
        Header: 'SN',
        accessor: 'sn',
        sort: false,
    },
    {
        Header: 'File Name',
        accessor: 'file',
        sort: false,
    },
    {
        Header: 'Action',
        accessor: 'action',
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
        value: docs.length,
    },
];

// feeds
const Job = () => {

    return (
        <>
           
            
            <Card>
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-upload"></i> Upload
                    </Button>
                    <h4 className="header-title mb-3">Documents</h4>
                    <Row>
                           
                                <>
                                   <Table
                                        columns={columns}
                                        data={docs}
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
