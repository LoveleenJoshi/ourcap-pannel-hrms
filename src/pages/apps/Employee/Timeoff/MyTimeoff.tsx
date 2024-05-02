import React, { useState, useEffect, useRef }  from 'react';
import { Link, Switch } from 'react-router-dom';
import { Row, Col, Button, Card, Modal } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useForm } from 'react-hook-form';
// components
import PageTitle from '../../../../components/PageTitle';
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components/';
import config from '../../../../config';

//dummy data
import { timeoff, leavesStatsRecord } from './data';
import Loader from '../../../../components/Loader';
import Today from '../../../dashboard/DashboardEmployee/Today';
import BASE_URL from '../../../../Base_URL/base_url';

interface TimeoffProps {
    leaveId: number
    user_id: number
    name: string
    email: string
    gender: string
    date_to: string
    date_from: string
    time_to: string
    time_from: string
    leave_notes: string
    attachment: any
    status: string
}

{/* standard modal */}
const NoteModal = ({modal, toggleModal, date, note}:{modal:any, toggleModal:any, date:any, note:any}) => {
    return (
        <>
         <Modal show={modal} onHide={toggleModal}>
                <Modal.Header onHide={toggleModal} >
                    <h4 className="modal-title">Note</h4>
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

const BalanceModal = ({balancemodal, toggleBalanceModal, balancetype}:{balancemodal:any, toggleBalanceModal:any, balancetype:any}) => {
    return (
        <>
         <Modal show={balancemodal} onHide={toggleBalanceModal} size={'sm'}>
                <Modal.Header onHide={toggleBalanceModal} >
                    <h4 className="modal-title">{balancetype}</h4>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='mt-0 text-secondary'>Balance</h4>
                    <p>
                    {(leavesStatsRecord || []).map((item, index) => {
                        return (
                            item.text === balancetype ?
                            <>
                               {Object.entries(item.balance).map(([key, value]) => {
                                    return (
                                        <Row key={`leavesstatb-${index}-${key}`}>
                                            <Col xs={7}>{key}:</Col><Col xs={5} className='mb-1'><b>{value}</b></Col> 
                                        </Row>
                                        );
                                })}
                            </>
                            : ''
                            );
                    })}
                    </p>
                    <hr/>
                    <h4 className='text-secondary'>Settings</h4>
                    <p>
                    {(leavesStatsRecord || []).map((item, index) => {
                        return (
                            item.text === balancetype ?
                            <>
                               {Object.entries(item.settings).map(([key, value]) => {
                                    return (
                                        <Row key={`leavesstats-${index}-${key}`}>
                                            <Col xs={7}>{key}:</Col><Col xs={5} className='mb-1'><b>{value}</b></Col> 
                                        </Row>
                                        );
                                })}
                            </>
                            : ''
                            );
                    })}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleBalanceModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
    let statustype;
    switch (row.original.status) {
        case 'pending': statustype = 'warning'; break;
        case 'approved': statustype = 'success'; break;
        case 'cancelled': statustype = 'secondary'; break;
        case 'rejected': statustype = 'danger'; break;
        default: statustype = 'secondary';
    }
    return (
        <>
            <span className={`badge capitalise badge-soft-${statustype}`}>{row.original.status}</span> {' '}
            <>{ statustype === 'warning' ? <Button variant="outline-danger" size="sm">
                <i className="mdi mdi-close"></i> Cancel
            </Button>  : '' }</>
             
        </>
    );
};

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
    const [modal, setModal] = useState<boolean>(false);

    const toggleModal = () => {
        setModal((modal) => !modal);
    };
    return (
        <>
            <Button variant="light" onClick={toggleModal}>
                <i className="mdi mdi-note-text-outline"></i> Note
            </Button>
            <NoteModal modal={modal} toggleModal={toggleModal} date={row.original.date} note={row.original.note}/>
        </> 
    );
};

/* date from column render */
const DateFromColumn = ({ row }: { row: any }) => {
    return (
        <>
            {new Date(row.original.date_from).toLocaleString(["en-GB"], {dateStyle:"medium"})}
        </>
    );
};

/* date to column render */
const DateToColumn = ({ row }: { row: any }) => {
    return (
        <>
            {new Date(row.original.date_from).toLocaleString(["en-GB"], {dateStyle:"medium"})}
        </>
    );
};

/* time to column render */
const TimeDurationColumn = ({ row }: { row: any }) => {
    function convertTo12HourFormat(time24:any) {
        if(time24){
        var [hours, minutes] = time24.split(':');
        var suffix = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        //minutes = minutes.padStart(2, '0'); // Formatting minutes to always have two digits
        var time12 = hours + ':' + minutes + ' ' + suffix;
        return time12;}
        else return '';
    }
    return (
        <>
            {convertTo12HourFormat(row.original.time_from)} - {convertTo12HourFormat(row.original.time_to)}
        </>
    );
};

const columns = [
    {
        Header: 'From',
        accessor: 'date_from',
        sort: true,
        Cell: DateFromColumn
    },
    {
        Header: 'To',
        accessor: 'date_to',
        sort: true,
        Cell: DateToColumn
    },
    {
        Header: 'Time Duration',
        accessor: 'time_from',
        Cell: TimeDurationColumn
    },
    
    {
        Header: 'Type',
        accessor: 'leave_type_id',
        sort: true,
    },
    {
        Header: 'Attachement',
        accessor: 'attachment',
        sort: false,
    },
    {
        Header: 'Note',
        accessor: 'leave_notes',
        sort: false,
        Cell: ActionColumn
    },
    {
        Header: 'Status ',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn
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






const LeavesStats = () => {
    const [balancemodal, setBalanceModal] = useState<boolean>(false);
    const [balancetype, setBalanceType] = useState('');
    const toggleBalanceModal = () => {
        setBalanceModal((balancemodal) => !balancemodal);
    };


    return (
        <Row>
            {(leavesStatsRecord || []).map((item, index) => {
                return (
                    
                    <Col sm={4} lg={3} xl={3} key={`leavesstat-${index}`}>
                        <Card className="text-white bg-primary mb-0 border-0" >
                            <Card.Body className='p-2'>
                            <div className="d-flex align-items-start ">
                                <div className="w-100">
                                    <Card.Title as="h2" className="text-white mb-1">
                                        {item.value}
                                    </Card.Title>
                                    <Card.Text>
                                        {item.text}
                                    </Card.Text>
                                </div>
                                <Link to="#" className="text-reset font-20" onClick={() => { setBalanceType(item.text); toggleBalanceModal();}}>
                                    <i className="mdi mdi-information-outline"></i>
                                </Link>
                            </div>
                            </Card.Body>
                        </Card>
                    </Col>
                   
                );
            })}
            <BalanceModal balancemodal={balancemodal} toggleBalanceModal={toggleBalanceModal} balancetype={balancetype}/>
                   
        </Row>
    );
}

let backuptimeofflist = [...timeoff];
let filtervalue_status = 'All';
let filtervalue_type = 'all'; 

const MyTimeoff = () => {
    const [timeofflist, setTimeoffList] = useState([...timeoff]);
    const [loading, setLoading] = useState(true);
   


    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `${BASE_URL}/api/get-single-user-leave-list`;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
              };
             
              var requestOptions = {
                method: 'GET',
                headers: headers,
              };
            const response = await fetch(url, requestOptions); 
            if(response.status === 200){
                const result = await response.json();
                setTimeoffList(result.data.list);
                backuptimeofflist = [...result.data.list]; 
                
            }
    
          } catch (error:any) {
            console.log(error);
          } finally {
            setLoading(false);
          } 
        };
    
        fetchData(); 
      }, []);

       const handleTypeFilter = (e:any) => {
        const filter = e.target.value; 
        if(!(filter === 'All')){
        const tempArray = [...timeoff]; tempArray.pop(); 
        {(backuptimeofflist || []).map((day, index) => {
            if(day.leave_type_id === filter) { tempArray.push(day)}
        })}
        setTimeoffList(tempArray);} else {setTimeoffList(backuptimeofflist)}
      };

      const handleStatusFilter = (e:any) => {
        const filter = e.target.value; 
        if(!(filter === 'all')){
        const tempArray = [...timeoff]; tempArray.pop(); 
        {(backuptimeofflist || []).map((day, index) => {
            if(day.status === filter) { tempArray.push(day)}
        })}
        setTimeoffList(tempArray);} else {setTimeoffList(backuptimeofflist)}
      }; 

     /*  const handleStatusFilter = (e:any) => {filtervalue_status = e.target.value; handleFilter()};
      const handleTypeFilter = (e:any) => {filtervalue_type = e.target.value; handleFilter()};

      const handleFilter = () => {
        console.log(filtervalue_type +' '+ filtervalue_status  );
      }; */

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

    if(loading) return <Loader></Loader>; 
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
                        <h4 className="page-title">My Time Off</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='mb-4'>
                    <LeavesStats/>
                </Col>
            </Row>
            
            <Row>
                <Col>
                
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={6} lg={2} xl={4}>
                                <h4 className="header-title mb-2">My Requests</h4>
                                </Col>
                                <Col sm={6} lg={2} xl={2} className='pr-desktop-0'>
                                    <FormInput
                                        label=""
                                        type="date"
                                        name="date-from"
                                        containerClass={'mb-1'}
                                        register={register}
                                        key="date-from"
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col sm={6} lg={2} xl={2} className='pr-desktop-0'>
                                    <FormInput
                                        label=""
                                        type="date"
                                        name="date-to"
                                        containerClass={'mb-1'}
                                        register={register}
                                        key="date-to"
                                        errors={errors}
                                        control={control}
                                        
                                    />
                                </Col>
                                <Col sm={6} lg={2} xl={2} className='pr-desktop-0'>
                                    <FormInput
                                        name="select-leavetype"
                                        label=""
                                        type="select"
                                        containerClass="mb-1"
                                        className="form-select"
                                        register={register}
                                        key="select-leavetype"
                                        errors={errors}
                                        control={control}
                                        onChange={handleTypeFilter}
                                        
                                    >
                                        <option value="All">All Types</option>
                                        <option value="Annual">Annual</option>
                                        <option value="Paternity">Paternity</option>
                                        <option value="Sick Leave">Sick Leave</option>
                                    </FormInput>
                                </Col>
                                <Col sm={6} lg={2} xl={2} >
                                    <FormInput
                                        name="select-leavestatus"
                                        label=""
                                        type="select"
                                        containerClass="mb-1"
                                        className="form-select"
                                        register={register}
                                        key="select-leavestatus"
                                        errors={errors}
                                        control={control}
                                        onChange={handleStatusFilter}
                                        
                                    >
                                        <option value="all">All Status</option>
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="rejected">Rejected</option>
                                    </FormInput>
                                </Col>
                            </Row>
                           
                            <hr></hr>
                            <Table
                                columns={columns}
                                data={timeofflist}
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

export default MyTimeoff;
