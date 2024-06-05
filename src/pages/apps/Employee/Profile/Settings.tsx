// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Card, Button, Row, Col } from 'react-bootstrap';
// // import classnames from 'classnames';

// // // dummy data
// // import { settings } from './data';

// // interface Settings {
// //     timezone: any;
// //     timezone_name: string;
// // }
// // interface SettingsProp{
// //     SettingsData:Settings
// // }


// // // feeds
// // const Settings : React.FC< SettingsProp> =({SettingsData})=>  {

// //     return (
// //         <>
           
            
// //             <Card>
// //                 <Card.Body>
// //                     <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end">
// //                         <i className="mdi mdi-pencil"></i> Edit
// //                     </Button>
// //                     <h4 className="header-title mb-3">Timezone Settings</h4>
// //                     <Row>
// //                         {/* {(SettingsData || []).map((info, index) => {
// //                             return(
// //                             <>
// //                                 <Col xs={6} key={index} className='text-secondary pr-0'>Timezone</Col>
// //                                 <Col xs={6} className='mb-1'>{info.timezone}{', '}{info.timezone_name}</Col>     
// //                             </>
// //                             );
// //                         })} */}
// //                          <Row>
// //                         <Col xs={6} className='text-secondary pr-0'>Timezone</Col>
// //                         <Col xs={6} className='mb-1'>{SettingsData.timezone}{', '}{SettingsData.timezone_name}</Col>
// //                     </Row>
// //                     </Row>
// //                 </Card.Body>
// //             </Card>
           
// //         </>
// //     );
// // };

// // export default Settings;
// import React, { useState, useEffect } from 'react';
// import { Card, Button, Row, Col } from 'react-bootstrap';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import config from '../../../../config'; 
// import BASE_URL from '../../../../Base_URL/base_url';// Ensure this path is correct

// interface Timezone {
//     id: number;
//     name: string;
//     timezoneformat: string;
//     offset: string;
// }

// interface Settings {
//     name: string;
//     timezoneformat: string;
// }

// interface SettingsProp {
//     SettingsData: Settings;
// }

// const Settings: React.FC<SettingsProp> = ({ SettingsData }) => {
//     const [timezoneOptions, setTimezoneOptions] = useState<Timezone[]>([]);
//     const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [isEditing, setIsEditing] = useState(false); // Correct use of useState to manage editing state

//     const toggleDropdown = async () => {
//         try {
//             const url = `${BASE_URL}/api/get-timezone`;
//             const headers = {
//                 "Accept": "application/json",
//                 'Authorization': `Bearer ${config.API_TOKEN}`
//             };
//             const requestOptions = {
//                 method: 'GET',
//                 headers: headers,
//             };
//             const response = await fetch(url, requestOptions);
//             if (response.ok) {
//                 const result = await response.json();
               
//                 setTimezoneOptions(result.data.timezones);
//                 setShowDropdown(true);
//             } else {
//                 console.error("Failed to fetch timezone data: ", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error fetching timezone data: ", error);
//         }
//     };

//     useEffect(() => {
//         if (showDropdown && timezoneOptions.length === 0) {
//             toggleDropdown();
//         }
//     }, [showDropdown]);

//     const handleEdit = () => {
//         setIsEditing(true); 
//         setShowDropdown(true); 
//     };

//     const handleCancel = () => {
//         setIsEditing(false); 
//         setShowDropdown(false); 
//     };

    

//     const handleSave = async () => {
//         if (!selectedTimezone) {
//             alert('No timezone selected.');
//             return;
//         }

//         const url = `${BASE_URL}/api/update-timezone`;
//         const headers = {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${config.API_TOKEN}`
//         };
//         const formData = new FormData();
//         formData.append('timezone', selectedTimezone.name);

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: headers,
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update timezone');
//             }

//             const responseData = await response.json();
//             alert( responseData.message);
//             setIsEditing(false); // Exit edit mode
//             setShowDropdown(false); // Hide dropdown
//         } catch (error) {
//             console.error('Error updating timezone:', error);
//         }
//     };

//     return (
//         <>
//             <Card>
//                 <Card.Body>
//                     {!isEditing && (
//                         <Button
//                             variant='outline-primary'
//                             onClick={handleEdit}
//                             className="btn-sm waves-effect waves-light float-end"
//                         >
//                             <i className="mdi mdi-pencil"></i> Edit
//                         </Button>
//                     )}

//                     {isEditing && (
//                         <div className='d-flex justify-content-end'>
//                             <Button variant="light" onClick={handleCancel} className="me-2">
//                                 Cancel
//                             </Button>
//                             <Button variant="primary" onClick={handleSave} >
//                                 Save
//                             </Button>
//                         </div>
//                     )}
//                     <h4 className="header-title mb-3">Timezone Settings</h4>
//                     <Row>
//                         <Col xs={6} className='text-secondary pr-0'>Timezone</Col>
//                         <Col xs={6} className='mb-1'>
//                             {/* {selectedTimezone ? ` ${selectedTimezone.name}` : `${SettingsData.timezoneformat}, ${SettingsData.name}`} */}
//                             {selectedTimezone ? ` ${selectedTimezone.name}` : ` ${SettingsData.name}`}
//                         </Col>
//                     </Row>
//                 </Card.Body>
//             </Card>
//             {showDropdown && isEditing && (
//                 <Typeahead
//                     labelKey="timezoneformat"
//                     id="basic-typeahead-example"
//                     onChange={(selected) => {
//                         if (selected.length > 0) {
//                             setSelectedTimezone(selected[0]);
//                         }
//                     }}
//                     multiple={false}
//                     options={timezoneOptions}
//                     placeholder="Choose a timezone..."
//                 />
//             )}
//         </>
//     );
// };

// export default Settings;
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import config from '../../../../config';
import BASE_URL from '../../../../Base_URL/base_url'; // Ensure this path is correct

interface Timezone {
    id: number;
    name: string;
    timezoneformat: string;
    offset: string;
}

interface Settings {
    name: string;
    timezoneformat: string;
}

interface SettingsProp {
    SettingsData: Settings;
    setSettingsData: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingS: React.FC<SettingsProp> = ({ SettingsData, setSettingsData }) => {
    const [timezoneOptions, setTimezoneOptions] = useState<Timezone[]>([]);
    const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchTimezones = async () => {
        try {
            const url = `${BASE_URL}/api/get-timezone`;
            const headers = {
                "Accept": "application/json",
                'Authorization': `Bearer ${config.API_TOKEN}`
            };
            const response = await fetch(url, { method: 'GET', headers });
            if (response.ok) {
                const result = await response.json();
                setTimezoneOptions(result.data.timezones);
            } else {
                console.error("Failed to fetch timezone data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching timezone data: ", error);
        }
    };

    useEffect(() => {
        if (isEditing && timezoneOptions.length === 0) {
            fetchTimezones();
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedTimezone(null); // Reset selected timezone on cancel
    };

    const handleSave = async () => {
        if (!selectedTimezone) {
            alert('No timezone selected.');
            return;
        }

        const url = `${BASE_URL}/api/update-timezone`;
        const headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${config.API_TOKEN}`
        };
        const formData = new FormData();
        formData.append('timezone', selectedTimezone.name);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update timezone');
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Update the SettingsData state with the new timezone
            setSettingsData({
                name: selectedTimezone.name,
                timezoneformat: selectedTimezone.timezoneformat,
            });

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating timezone:', error);
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    {!isEditing && (
                        <Button
                            variant='outline-primary'
                            onClick={handleEdit}
                            className="btn-sm waves-effect waves-light float-end"
                        >
                            <i className="mdi mdi-pencil"></i> Edit
                        </Button>
                    )}

                    {isEditing && (
                        <div className='d-flex justify-content-end'>
                            <Button variant="light" onClick={handleCancel} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    )}
                    <h4 className="header-title mb-3">Timezone Settings</h4>
                    <Row>
                        <Col xs={6} className='text-secondary pr-0'>Timezone</Col>
                        <Col xs={6} className='mb-1'>
                            {isEditing ? (
                                <Typeahead
                                    labelKey="name"
                                    id="timezone-typeahead"
                                    onChange={(selected) => {
                                        if (selected.length > 0) {
                                            const selectedTz = selected[0] as Timezone;
                                            setSelectedTimezone(selectedTz);
                                        }
                                    }}
                                    multiple={false}
                                    options={timezoneOptions}
                                    placeholder="Choose a timezone..."
                                    selected={selectedTimezone ? [selectedTimezone] : []}
                                />
                            ) : (
                                `${SettingsData.name}`
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default SettingS;
