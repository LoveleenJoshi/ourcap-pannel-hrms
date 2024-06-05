import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import config from '../../../../config';

import avatar from '../../../../../src/assets/images/avatar 1.png';
import BASE_URL from "../../../../Base_URL/base_url";

interface UserProfileData {
    name: string;
    designation: string;
    email: string;
    phone: string;
    timezone: string;
    department: string;
    office: string;
    profile_image: string;
}

interface UserProfileProps {
    updateProfile: boolean;
    triggerProfileUpdate: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ updateProfile, triggerProfileUpdate }) => {
    const [userData, setUserData] = useState<UserProfileData>({
        profile_image: "",
        name: "",
        designation: '',
        email: '',
        phone: '',
        timezone: '',
        department: '',
        office: ''
    });

    const fetchData = async () => {
        try {
            const url = `${BASE_URL}/api/user`;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            };

            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const result = await response.json();
                setUserData({
                    name: result.data.user.name,
                    profile_image: result.data.user.profile_image,
                    designation: result.data.employee_detail.job_title,
                    email: result.data.user.email,
                    phone: result.data.user.contact_number,
                    timezone: result.data.user.timezone,
                    department: result.data.employee_detail.department,
                    office: result.data.employee_detail.office
                });
                triggerProfileUpdate();
            } else {
                console.error("Failed to fetch PersonalData: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [updateProfile]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('profile_image', file);

        fetch(`${BASE_URL}/api/update_profile_image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchData(); 
                }
            })
            .catch(error => {
                console.error("Error uploading image: ", error);
            });
    }, [triggerProfileUpdate]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Card>
            <Card.Body>
                <div className="d-flex align-self-start">
                    <div {...getRootProps()} className="d-flex align-self-start rounded-circle me-2" style={{ cursor: 'pointer' }}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <img
                                className="d-flex align-self-start rounded-circle me-2"
                                src={userData.profile_image === null || userData.profile_image === "" ? avatar : userData.profile_image}
                                alt=""
                                height="48"
                                key={userData.profile_image} // Add key attribute to force re-render
                            />
                        )}
                    </div>

                    <div className="w-100 ps-1">
                        <h4 className="mt-1 mb-0">{userData.name}</h4>
                        <p className="mb-1 mt-1 text-muted">{userData.department}</p>
                    </div>
                </div>

                <h6 className="font-13 text-muted mt-3 text-uppercase">EMAIL</h6>
                <h5>{userData.email}</h5>

                <h6 className="font-13 text-muted mt-3 text-uppercase">PHONE</h6>
                <h5>{userData.phone}</h5>

                <h6 className="font-13 text-muted mt-3 text-uppercase">TIMEZONE</h6>
                <h5>{userData.timezone}</h5>

                <hr />

                <h6 className="font-13 text-muted mt-3 text-uppercase">DEPARTMENT</h6>
                <h5>{userData.department}</h5>

                <h6 className="font-13 text-muted mt-3 text-uppercase">OFFICE</h6>
                <h5>{userData.office}</h5>
            </Card.Body>
        </Card>
    );
};

export default UserProfile;
