import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../../../components/PageTitle';
import UserProfile from './UserProfile';
import More from './More';

const Profile: React.FC = () => {
    const [updateProfile, setUpdateProfile] = useState(false);

    // Function to trigger profile update
    const triggerProfileUpdate = () => {
        setUpdateProfile(prev => !prev);
    };

    return (
        <React.Fragment>
            <PageTitle title={'My Profile'} />

            <Row>
                <Col xl={{ span: 3, order: 1 }} lg={{ span: 6, order: 1 }}>
                    <UserProfile updateProfile={updateProfile} triggerProfileUpdate={triggerProfileUpdate} />
                </Col>

                <Col xl={{ span: 9, order: 1 }} lg={{ span: 12, order: 2 }}>
                    <More />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Profile;
