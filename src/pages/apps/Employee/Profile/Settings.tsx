import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

// dummy data
import { settings } from './data';





// feeds
const Job = () => {

    return (
        <>
           
            
            <Card>
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                    <h4 className="header-title mb-3">Timezone Settings</h4>
                    <Row>
                        {(settings || []).map((info, index) => {
                            return(
                            <>
                                <Col xs={6} className='text-secondary pr-0'>Timezone</Col><Col xs={6} className='mb-1'>{info.timezone}{', '}{info.timezone_name}</Col>     
                            </>
                            );
                        })}
                    </Row>
                </Card.Body>
            </Card>
           
        </>
    );
};

export default Job;
