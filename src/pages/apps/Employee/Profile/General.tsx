import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

// dummy data
// import { bank } from './data';
interface Personal {
    Full_Name: string;
    Gender: string;
    Date_of_Birth: string;
    Marital_Status: string;
    Nationality: string;
    National_ID_Number: string;
    Personal_Tax_ID: string;
    Email_Address: string;
    Phone_Number: string;
}

interface GeneralProps {
    personalData: Personal;
   
}

interface Address {
    Primary_Address: string;
    Country: string;
    City: string;
    State: string;
    Postal_Code: string;
}

interface AddressProp {
    addressData: Address;
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
interface BankProp{
bankData:Bank
}
interface EmergencyProp{
    emergancyData:Emergency
}
const General: React.FC<GeneralProps & AddressProp & EmergencyProp & BankProp> = ({ personalData, addressData,emergancyData,bankData}) => {
    return (
        <>
            <Card key="personal-info">
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                    <h4 className="header-title mb-3">Personal Info</h4>
                    <Row key="personal-info-rows">
                        {Object.entries(personalData).map(([key, value]) => (
                            <Row className='font-14' key={`personal-${key}`}>
                                <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                <Col xs={6} className='mb-1'>{value}</Col>
                            </Row>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
            <Card key="address">
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                    <h4 className="header-title mb-3">Address</h4>
                    <Row key="address-rows">
           {Object.entries(addressData).map(([key, value]) => (
            <React.Fragment key={`address-${key}`}>
            <Row className='font-14'>
                <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                <Col xs={6} className='mb-1'>{value}</Col>
            </Row>
        </React.Fragment>
      ))}
      </Row>
                </Card.Body>
            </Card>
            <Card key="emergency-contact">
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                    <h4 className="header-title mb-3">Emergency Contact</h4>
                    <Row key="emergency-rows">
                      
                                {Object.entries(emergancyData).map(([key, value]) => (
                                    <Row className='font-14' key={`emergency-${key}`}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{value}</Col>
                                    </Row>
                                ))}
                            
                        
                    </Row>
                </Card.Body>
            </Card>
            <Card key="bank-info">
                <Card.Body>
                    <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                    <h4 className="header-title mb-3">Bank Info</h4>
                    <Row key="bank-rows">
                       
                                {Object.entries(bankData).map(([key, value]) => (
                                    <Row className='font-14' key={`bank-${key}`}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{value}</Col>
                                    </Row>
                                ))}
                            
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default General;
