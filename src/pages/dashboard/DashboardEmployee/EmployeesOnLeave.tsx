import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import user1 from "../../../assets/images/users/user-3.jpg";

interface EmployeesOnleave {
   
        id: number;
        name: string;
        profile_image: string;
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

                    <h4 className="header-title mb-3">On Leave Today </h4>

                    <div style={{overflow:"auto",whiteSpace:"nowrap"}}>
                   <Row style={{flexWrap:"nowrap"}}>
                   {
                        contacts.length===0?
                        <h5 className='text-secondary'>No one is on leave today.</h5> : (
                           
                        (contacts || []).map((user, index) => {
                            return (
                                <Col key={index} lg={3} sm={6} xs={6}>
                                    <Card className="text-center">
                                        <Card.Body className='p-1'>
                                            <div className="pt-1 pb-1">
                                                <img
                                                    // src={(user.avatar===null?`${avatar1}`:`${user.avatar}`)}
                                                    src={(user.profile_image === null || user.profile_image=== '') ? `${user1}` : `${user.profile_image}`}
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
                        })
                    

                        )
                    }
                   </Row>
                    </div>
                   
                    
                </Card.Body>
            </Card>
        </>
    );
};

export default EmployeesOnLeave;




//*************************************for horizontal scrolling************************ */
{/* <Card>
<Card.Body>
    <h4 className="header-title mb-3">On Leave Today</h4>
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Row style={{ flexWrap: 'nowrap' }}>
            {(contacts || []).map((user, index) => {
                return (
                    <Col key={index} lg={3} sm={6} xs={6} style={{ display: 'inline-block', float: 'none' }}>
                        <Card className="text-center">
                            <Card.Body className='p-1'>
                                <div className="pt-1 pb-1">
                                    <img
                                        src={(user.profile_image === null || user.profile_image === '') ? `${user1}` : `${user.profile_image}`}
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
    </div>
</Card.Body>
</Card> */}