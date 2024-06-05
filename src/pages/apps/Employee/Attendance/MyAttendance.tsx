import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Modal } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useForm } from 'react-hook-form';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

// components
import PageTitle from '../../../../components/PageTitle';
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components/';
import { APICore } from '../../../../helpers/api/apiCore';
import config from '../../../../config';
//dummy data
import { dummydata } from './data';

//import { dummydata as data } from './data';
import Spinner from '../../../../components/Spinner';
import Today from '../../../dashboard/DashboardEmployee/Today';
//api data
import { userAttendanceApi } from "../../../../helpers/api/apiServices";
import BASE_URL from '../../../../Base_URL/base_url';
import DataNotAvailable from '../../../../DataNotAvailable/DataNotAvailable';
const api = new APICore();

{/* standard modal */}
const NoteModal = ({ modal, toggleModal, date, note }: { modal: any, toggleModal: any, date: any, note: any }) => {
    return (
        <>
            <Modal show={modal} onHide={toggleModal}>
                <Modal.Header onHide={toggleModal} closeButton>
                    <h4 className="modal-title">Notes on {date}</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {note}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleModal}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
    const [modal, setModal] = useState<boolean>(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
            <Button variant="light" onClick={toggleModal}>
                <i className="mdi mdi-note-text-outline"></i> Note
            </Button>
            <NoteModal modal={modal} toggleModal={toggleModal} date={row.original.date} note={row.original.notes} />
        </>
    );
};

const AttendanceStats = ({ stats }: { stats: any }) => {
    const attendanceStatsRecord = [
        {
            text: 'Scheduled Hours',
            value: '64h',
        },
        {
            text: 'Logged Hours',
            value: '66h 30m',
        },
        {
            text: 'Overtime',
            value: '2h 30m',
        },
    ];

    return (
        <Row>
            {(stats || []).map((item: any, index: any) => {
                return (
                    <Col sm={4} lg={3} xl={2} key={index}>
                        <Card className="text-white bg-warning mb-0 border-0">
                            <Card.Body className='p-2'>
                                <Card.Title as="h2" className="text-white mb-1">
                                    {item.value}
                                </Card.Title>
                                <Card.Text>
                                    {item.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}

interface AttendanceProps {
    id: number
    user_id: number
    clock_in_date: string
    clock_in_time: string
    clock_out_time: string
    total_hours: string
    duration: string
    Overtime: string
    day: string
    day_of_week: string
    notes: any
    status: string
}

function getMonthName(month: number) {
    switch (month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
    }
};

const MyAttendance = () => {
    const [attendancedata, setAttendanceData] = useState<AttendanceProps[]>([]);
    const [filteredData, setFilteredData] = useState<AttendanceProps[]>([]);

    const [attendancestatsdata, setAttendanceStatsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataAvailable, setDataAvailable] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const [currentmonth, setCurrentMonth] = useState(new Date().getMonth());
    const [defaultmonth, setDefaultMonth] = useState(new Date().getMonth());
    const [defaultattentype, setDefaultAttenType] = useState('attentype-all');

    const methods = useForm({
        defaultValues: {
            password: '12345',
            statictext: 'email@example.com',
            color: '#727cf5',
        },
    });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    function getMonthRange(month: number) {
        switch (month) {
            case 0: return '1 Jan - 31 Jan';
            case 1: return '1 Feb - 28 Feb';
            case 2: return '1 Mar - 31 Mar';
            case 3: return '1 Apr - 30 Apr';
            case 4: return '1 May - 31 May';
            case 5: return '1 Jun - 30 Jun';
            case 6: return '1 Jul - 31 Jul';
            case 7: return '1 Aug - 31 Aug';
            case 8: return '1 Sep - 30 Sep';
            case 9: return '1 Oct - 31 Oct';
            case 10: return '1 Nov - 30 Nov';
            case 11: return '1 Dec - 31 Dec';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `${BASE_URL}/api/get-user-attendance`;
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${config.API_TOKEN}`
                };
                const formdata = new FormData();
                formdata.append("year", new Date().getFullYear().toString());
                formdata.append("month", getMonthName(currentmonth) || "");
    
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: formdata
                };
                const response = await fetch(url, requestOptions);
                if (response.status === 200) {
                    const result = await response.json();
                    setAttendanceData(result.data);
                    setFilteredData(result.data);
                    setAttendanceStatsData(result.data);
                    setDataAvailable(true);
                } else {
                    setError("Failed to fetch attendance data");
                    setDataAvailable(false);
                }
            } catch (error) {
                setDataAvailable(false);
                setError("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [currentmonth]);

    useEffect(() => {
    // Reset filter to "All Records" when month changes
    setDefaultAttenType('attentype-all');
    setFilteredData(attendancedata); // Reset to show all records
}, [currentmonth, attendancedata]);


    const handleMonthChange = (e: any) => {
        setCurrentMonth(parseInt(e.target.value));
        setDefaultAttenType('attentype-all'); // Reset the filter to all records
        setFilteredData(attendancedata); 
    };

    if (!dataAvailable) {
        return <DataNotAvailable />
    }

    function convertTo12HourFormat(time24: any) {
        if (time24) {
            var [hours, minutes, seconds] = time24.split(':');
            var parsedHours = parseInt(hours, 10);
            var suffix = parsedHours >= 12 ? 'PM' : 'AM';
            var displayHours = parsedHours % 12 || 12;
            var displayMinutes = parseInt(minutes, 10).toString().padStart(2, "0"); // Remove leading zeros from minutes
            return `${displayHours}:${displayMinutes} ${suffix}`;
        } else {
            return '';
        }
    }

    const ClockinColumn = ({ row }: { row: any }) => {
        return (
            <>
                {row.original.clock_in_time}
            </>
        );
    };

    const ClockoutColumn = ({ row }: { row: any }) => {
        return (
            <>
                {row.original.clock_out_time}
            </>
        );
    };

    const formatDate = ({ row }: { row: { original: { clock_in_date: string } } }) => {
        if (!row.original.clock_in_date) {
            return ''; // or any other default value you prefer
        }
        const date = new Date(row.original.clock_in_date);
        const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        return formattedDate;
    };

    const columns = [
        {
            Header: 'Date',
            accessor: 'clock_in_date',
            sort: true,
            Cell: formatDate
        },
        {
            Header: 'Day',
            accessor: 'day_of_week',
            sort: false,
        },
        {
            Header: 'Clock In',
            accessor: 'clock_in_time',
            sort: false,
            Cell: ClockinColumn
        },
        {
            Header: 'Clock Out ',
            accessor: 'clock_out_time',
            sort: false,
            Cell: ClockoutColumn
        },
        {
            Header: 'Scheduled Hours',
            accessor: 'schedule_hours',
            sort: false,
        },
        {
            Header: 'Logged Hours',
            accessor: 'logged_hours',
            sort: false,
        },
        {
            Header: 'Overtime',
            accessor: 'overtime',
            sort: false,
        },
        {
            Header: 'Note',
            accessor: 'notes',
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
    ];

    const handleFilter = (e: any) => {
        const filter = e.target.value;
        if (filter === "attentype-missed") {
            const filtered = attendancedata.filter((val) => {
                const isMissed = !val.clock_in_time || !val.clock_out_time;
                const isWeekday = val.day_of_week !== "Sat" && val.day_of_week !== "Sun";
                return isMissed && isWeekday;
            });
            setFilteredData(filtered);
        } else if (filter === "attentype-non") {
            const filtered = attendancedata.filter((val) => {
                const isNonWorkingDay = val.status === "On Leave" && val.clock_in_time && val.clock_out_time;
                return isNonWorkingDay;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(attendancedata.filter(val => val.day_of_week !== "Sat" && val.day_of_week !== "Sun"));
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner size="md" type="bordered" color="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }


    const handleFilterChange = (e: any) => {
        setDefaultAttenType(e.target.value);
    handleFilter(e);
    };
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
                        <h4 className="page-title">My Attendance</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={6} lg={4} xl={8}>
                                    <h4 className="header-title mb-2">Showing <b className='text-primary'>{getMonthName(currentmonth)}</b> Attendance</h4>
                                </Col>
                                <Col sm={6} lg={4} xl={2}>
    <FormInput
        name="select-month"
        label=""
        type="select"
        containerClass="mb-0"
        className="form-select"
        register={register}
        // key="select-month"
        errors={errors}
        value={currentmonth}
        key={`select-month-${currentmonth}`}  // Add a unique key
        control={control}
        defaultValue={currentmonth}
        onChange={(e) => {
            handleMonthChange(e);
        }}
    >
        {(() => {
            const options = [];
            for (let i = defaultmonth; i >= 0; i--) {
                options.push(<option key={i} value={i}>{getMonthRange(i)}</option>);
            }
            return options;
        })()}
    </FormInput>
</Col>
<Col sm={6} lg={4} xl={2}>
    <FormInput
        name="select-recordtype"
        label=""
        type="select"
        containerClass="mb-0"
        className="form-select"
        register={register}
        // key="select-recordtype"
        key={`select-recordtype-${currentmonth}-${defaultattentype}`}  // Add a unique key
        errors={errors}
        control={control}
        value={defaultattentype}
        onChange={handleFilterChange}
    >
        <option key="attentype-all" value="attentype-all">All Records</option>
        <option key="attentype-missed" value="attentype-missed">Missed Clock in/out</option>
        <option key="attentype-non" value="attentype-non">Clocking on Non-working days</option>
    </FormInput>
</Col>

                            </Row>
                            <hr></hr>
                            <hr></hr>
                            <Table
                                columns={columns}
                                data={filteredData}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MyAttendance;
