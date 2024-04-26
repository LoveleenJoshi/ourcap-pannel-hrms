import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

interface EmployeesOnleave {
   
        id: number;
        name: string;
        avatar: string;
        department: string;
    
}
interface EmployeesOnLeaveProps {
    contacts:EmployeesOnleave[];
  }

const EmployeesOnLeave: React.FC<EmployeesOnLeaveProps> = ({contacts}) => {
    return (
        <>
            <Card>
                <Card.Body>

                    <h4 className="header-title mb-3">On Leave Today
                    </h4>
                    <Row>
                        {(contacts || []).map((user, index) => {
                            return (
                                <Col key={index} lg={3} sm={6} xs={6}>
                                    <Card className="text-center">
                                        <Card.Body className='p-1'>
                                            <div className="pt-1 pb-1">
                                                <img
                                                    src={user.avatar}
                                                    className="rounded-circle img-thumbnail avatar-md"
                                                    alt=""
                                                />

                                                <h5 className="mt-1 mb-0">
                                                    <Link to="#" className="text-dark">
                                                        {user.name}
                                                    </Link>
                                                </h5>

                                                <p className='text-secondary mb-0'>
                                                    {user.department}
                                                </p>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default EmployeesOnLeave;
