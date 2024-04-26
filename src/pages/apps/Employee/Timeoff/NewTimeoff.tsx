import React, { useState } from 'react';
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

interface MemberTypes {
    value: string;
    name: string;
    image: string;
}

const ProjectForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
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

    /*
     *  add selected team members
     */
    const selectTeamMembers = (e: any) => {
        if (e.length !== 0) {
            const isAlreadySelected = selectedTeamMembers.filter((x) => x['name'] === e[0].name);
            if (isAlreadySelected && isAlreadySelected.length === 0) {
                setSelectedTeamMembers([...selectedTeamMembers, e[0]]);
            }
        }
    };

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter Project Name'),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right color-secondary">
                            <span className='badge bg-primary allcaps'><Today></Today></span>
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
                            <form onSubmit={handleSubmit(() => {})}>
                                <Row>
                                    <Col xl={12}>
                                        <FloatingLabel controlId="floatingSelect" label="Time Off Type" className="mb-3">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Select time off type</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                        <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="customRadio3"
                                                    name="customRadio"
                                                    className="form-check-input"
                                                    defaultChecked
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
                                                />
                                                <label className="form-check-label" htmlFor="customRadio2">
                                                    Multiple Days
                                                </label>
                                            </div>
                                            
                                        </div>
                                        <Form.Group className="mb-3">
                                                    <Form.Label>Date</Form.Label>
                                                    <HyperDatepicker
                                                        hideAddon
                                                        value={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                    />
                                        </Form.Group>
                                        

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
                                                    <Form.Label>Due Date</Form.Label>
                                                    <HyperDatepicker
                                                        hideAddon
                                                        value={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="my-3 mt-xl-0">
                                            <Form.Label className="mb-0">Attachment</Form.Label>
                                            <p className="text-muted font-14">
                                            pdf, docx, jpg, png only, max file size: 5 mb (optional).
                                            </p>
                                            <FileUploader />
                                        </Form.Group>

                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Team Members</Form.Label>
                                            <Typeahead
                                                id="select3"
                                                labelKey="name"
                                                multiple={false}
                                                options={teamMembers}
                                                placeholder="select Team Member..."
                                                onChange={selectTeamMembers}
                                            />
                                            <div className="mt-2">
                                                {(selectedTeamMembers || []).map((member, index) => {
                                                    return (
                                                        <OverlayTrigger
                                                            key={index}
                                                            placement="top"
                                                            overlay={<Tooltip id={member.name}>{member.name}</Tooltip>}
                                                        >
                                                            <a
                                                                href="/"
                                                                title={member.name}
                                                                data-original-title="James Anderson"
                                                                className="d-inline-block me-1"
                                                            >
                                                                <img
                                                                    src={member.image}
                                                                    className="rounded-circle avatar-xs"
                                                                    alt="friend"
                                                                />
                                                            </a>
                                                        </OverlayTrigger>
                                                    );
                                                })}
                                            </div>
                                        </Form.Group> */}
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col className="text-center">
                                        
                                        <Button variant="light" className="waves-effect waves-light m-1">
                                            <i className="fe-x me-1"></i> Cancel
                                        </Button>
                                        <Button variant="primary" className="waves-effect waves-light m-1">
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
