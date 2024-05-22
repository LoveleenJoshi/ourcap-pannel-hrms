import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, Button, FloatingLabel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typeahead } from 'react-bootstrap-typeahead';

// components
import PageTitle from '../../../../components/PageTitle';
import HyperDatepicker from '../../../../components/Datepicker';
import FileUploader from '../../../../components/FileUploader';
import { FormInput } from '../../../../components/';
import Today from '../../../dashboard/DashboardEmployee/Today';

import avatar1 from '../../../../assets/images/users/user-6.jpg';
import avatar2 from '../../../../assets/images/users/user-7.jpg';
import avatar3 from '../../../../assets/images/users/user-8.jpg';
import avatar4 from '../../../../assets/images/users/user-9.jpg';
import avatar5 from '../../../../assets/images/users/user-10.jpg';
import avatar6 from '../../../../assets/images/users/user-4.jpg';
import avatar7 from '../../../../assets/images/users/user-5.jpg';
import avatar8 from '../../../../assets/images/users/user-1.jpg';
import BASE_URL from '../../../../Base_URL/base_url';
import config from '../../../../config';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

interface MemberTypes {
    value: string;
    name: string;
    image: string;
}

interface leaveOptionType {
    id: number;
    leave_type: string;
}

const ProjectForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [selectedTimeOffType, setSelectedTimeOffType] = useState("");
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [timeOffType, setTimeOffType] = useState<leaveOptionType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [leaveDuration, setLeaveDuration] = useState("single");
    const [startTime, setStartTime] = useState<string | null>('09:30');
    const [endTime, setEndTime] = useState<string | null>('18:30');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${BASE_URL}/api/user-leave-assign-list`;
                const headers = {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${config.API_TOKEN}`
                };
                const requestedOptions = {
                    method: "GET",
                    headers: headers
                };
                const response = await fetch(url, requestedOptions);
                if (response.status === 200) {
                    const result = await response.json();
                    setTimeOffType(result.data.leave_detail);
                } else {
                    console.error('Error fetching data:', response.status);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [selectedTimeOffType]);

    const handleTimeOFFChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedType = e.target.value;
        setSelectedTimeOffType(newSelectedType);
    };

    const formatTime = (date: Date, time: string) => {
        const [hours, minutes] = time.split(':');
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validation
        if (leaveDuration === 'single') {
            setEndDate(startDate);
        } else if (startDate > endDate) {
            alert('Start date must be earlier than or equal to end date.');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();

        if (selectedTimeOffType) {
            formData.append("leave_type_id", selectedTimeOffType);
        }

        formData.append("date_from", startDate.toISOString().split('T')[0]);
        formData.append("date_to", endDate.toISOString().split('T')[0]);
        formData.append("time_from", formatTime(startDate,"09:30"));
        formData.append("time_to", formatTime(endDate,"18:30"));
        // formData.append("time_from", formatTime(startDate, startTime ?? '00:00'));
        // formData.append("time_to", formatTime(endDate, endTime ?? '00:00'));
        formData.append("status", "pending");

        const leaveNotesElement = document.querySelector('textarea[name="overview"]') as HTMLTextAreaElement | null;
        if (leaveNotesElement && leaveNotesElement.value) {
            formData.append("leave_notes", leaveNotesElement.value);
        }

        const fileInputElement = document.querySelector('input[type="file"]') as HTMLInputElement | null;
        if (fileInputElement && fileInputElement.files && fileInputElement.files[0]) {
            formData.append("attachment", fileInputElement.files[0]);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/leave-request`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${config.API_TOKEN}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(`Submission failed: ${errorData.message}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Submission successful!');
        } catch (error) {
            console.error('Submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const [teamMembers] = useState<MemberTypes[]>([
        { value: 'Shreyu N', name: 'Shreyu N', image: avatar2 },
        { value: 'Greeva N', name: 'Greeva N', image: avatar5 },
        { value: 'Dhyanu B', name: 'Dhyanu B', image: avatar4 },
        { value: 'Mannat B', name: 'Mannat B', image: avatar6 },
        { value: 'Katu S', name: 'Katu S', image: avatar7 },
        { value: 'Nik N', name: 'Nik N', image: avatar1 },
        { value: 'Rik N', name: 'Rik N', image: avatar8 },
    ]);
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<MemberTypes[]>([
        { value: 'Shreyu N', name: 'Shreyu N', image: avatar1 },
        { value: 'Greeva N', name: 'Greeva N', image: avatar2 },
        { value: 'Dhyanu B', name: 'Dhyanu B', image: avatar3 },
    ]);

    const selectTeamMembers = (e: any) => {
        if (e.length !== 0) {
            const isAlreadySelected = selectedTeamMembers.filter((x) => x['name'] === e[0].name);
            if (isAlreadySelected && isAlreadySelected.length === 0) {
                setSelectedTeamMembers([...selectedTeamMembers, e[0]]);
            }
        }
    };

    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter Project Name'),
        })
    );

    const methods = useForm({ resolver: schemaResolver });
    const {
        register,
        control,
        formState: { errors },
    } = methods;

    const handleReset = async () => {
        setSelectedTimeOffType("");
        setLeaveDuration("single");
        setStartDate(new Date());
        setEndDate(new Date());
        setStartTime('09:30');
        setEndTime('18:30');
        const overviewInput = document.querySelector('textarea[name="overview"]') as HTMLTextAreaElement;
        if (overviewInput) {
            overviewInput.value = "";
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right color-secondary">
                            <span className='badge bg-primary allcaps'><Today /></span>
                        </div>
                        <div className="page-title-right">
                            <form className="d-flex align-items-center mb-3">
                                <div className="input-group input-group-sm">

                                </div>
                            </form>
                        </div>
                        <h4 className="page-title">New Time Off Request</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xl={12}>
                                        <FloatingLabel controlId="floatingSelect" label="Time Off Type" className="mb-3">
                                            <Form.Select onChange={handleTimeOFFChange}
                                                value={selectedTimeOffType}
                                                aria-label="Floating label select example">
                                                <option value="">Select time off type</option>
                                                {
                                                    timeOffType.map(val =>
                                                        <option key={val.id} value={val.id}>{val.leave_type}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </FloatingLabel>
                                        <div className="mb-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="customRadio3"
                                                    name="customRadio"
                                                    className="form-check-input"
                                                    value="single"
                                                    checked={leaveDuration === "single"}
                                                    onChange={() => setLeaveDuration("single")}
                                                />
                                                <label className="form-check-label" htmlFor="customRadio3">
                                                    Single Day
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="customRadio2"
                                                    name="customRadio"
                                                    className="form-check-input"
                                                    value="multiple"
                                                    checked={leaveDuration === "multiple"}
                                                    onChange={() => setLeaveDuration("multiple")}
                                                />
                                                <label className="form-check-label" htmlFor="customRadio2">
                                                    Multiple Days
                                                </label>
                                            </div>
                                        </div>

                                        {leaveDuration === "single" && (
                                            <Form.Group className="mb-3">
                                                {/* <Form.Label>Date</Form.Label> */}
                                                <Form.Label>Select Date</Form.Label>
                                                <HyperDatepicker
                                                    hideAddon
                                                    value={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                />
                                            </Form.Group>
                                        )}

                                      

                                        {leaveDuration === "multiple" && (
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Start Date</Form.Label>
                                                        <HyperDatepicker
                                                            hideAddon
                                                            value={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group className="mb-3">
                                                        {/* <Form.Label>Due Date</Form.Label> */}
                                                        <Form.Label>End Date</Form.Label>
                                                        <HyperDatepicker
                                                            hideAddon
                                                            value={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}
                                         
                                         {/* <Form.Group as={Row} className="mb-3" controlId="formStartTime">
                                            <Form.Label column sm="4">
                                                Start Time
                                            </Form.Label>
                                            <Col sm="8">
                                                <TimePicker
                                                    onChange={setStartTime}
                                                    value={startTime}
                                                    disableClock
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formEndTime">
                                            <Form.Label column sm="4">
                                                End Time
                                            </Form.Label>
                                            <Col sm="8">
                                                <TimePicker
                                                    onChange={setEndTime}
                                                    value={endTime}
                                                    disableClock
                                                />
                                            </Col>
                                        </Form.Group> */}
                                        <FormInput
                                            name="overview"
                                            label=""
                                            placeholder="Notes (Optional)"
                                            type="textarea"
                                            rows="5"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="overview"
                                            errors={errors}
                                            control={control}
                                        />

                                        <Form.Group className="my-3 mt-xl-0">
                                            <Form.Label className="mb-0">Attachment</Form.Label>
                                            <p className="text-muted font-14">
                                                pdf, docx, jpg, png only, max file size: 5 mb (optional).
                                            </p>
                                            <FileUploader />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col className="text-center">
                                        <Button variant="light" 
                                        onClick={handleReset}
                                        className="waves-effect waves-light m-1">
                                            <i className="fe-x me-1"></i> Cancel
                                        </Button>
                                        <Button variant="primary" className="waves-effect waves-light m-1" type="submit" disabled={isSubmitting}>
                                            <i className="fe-check-circle me-1"></i> Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProjectForm;
