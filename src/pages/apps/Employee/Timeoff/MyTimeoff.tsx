import React, { useState, useEffect, useRef,ChangeEvent}  from 'react';
import { useForm } from 'react-hook-form';
import { Link, Switch } from 'react-router-dom';
import { Row, Col, Button, Card, Modal } from 'react-bootstrap';
import CountUp from 'react-countup';
// components
import PageTitle from '../../../../components/PageTitle';
import Table from '../../../../components/Table';
import { FormInput } from '../../../../components/';
import config from '../../../../config';

//dummy data
// import { timeoff, leavesStatsRecord } from './data';
import { timeoff } from './data';
// import Loader from '../../../../components/Loader';
import Today from '../../../dashboard/DashboardEmployee/Today';
import BASE_URL from '../../../../Base_URL/base_url';
import DataNotAvailable from '../../../../DataNotAvailable/DataNotAvailable';
import Spinner from "../../../../components/Spinner";

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

// const BalanceModal = ({balancemodal, toggleBalanceModal, balancetype,leaveList}:{balancemodal:any, toggleBalanceModal:any, balancetype:any, leaveList: LeaveDetail[]}) => {
//     return (
//         <>
//          <Modal show={balancemodal} onHide={toggleBalanceModal} size={'sm'}>
//                 <Modal.Header onHide={toggleBalanceModal} >
//                     <h4 className="modal-title">{balancetype}</h4>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <h4 className='mt-0 text-secondary'>Balance</h4>
//                     <p>
//                     {(leaveList || []).map((item, index) => {
//                         return (
//                             item.leave_type === balancetype ?
//                             <>
//                                {Object.entries(item.LeaveBalance).map(([key, value]) => {
//                                     return (
//                                         <Row key={`leavesstatb-${index}-${key}`}>
//                                             <Col xs={7}>{key}:</Col><Col xs={5} className='mb-1'><b>{value}</b></Col> 
//                                         </Row>
//                                         );
//                                 })}
//                             </>
//                             : ''
//                             );
//                     })}
//                     </p>
//                     <hr/>
//                     <h4 className='text-secondary'>Settings</h4>
//                     <p>
//                     {(leaveList|| []).map((item, index) => {
//                         return (
//                             item.leave_type === balancetype ?
//                             <>
//                                {Object.entries(item.LeaveSetting).map(([key, value]) => {
//                                     return (
//                                         <Row key={`leavesstats-${index}-${key}`}>
//                                             <Col xs={7}>{key}:</Col><Col xs={5} className='mb-1'><b>{value}</b></Col> 
//                                         </Row>
//                                         );
//                                 })}
//                             </>
//                             : ''
//                             );
//                     })}
//                     </p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="light" onClick={toggleBalanceModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
const BalanceModal = ({ balancemodal, toggleBalanceModal, balancetype, leaveList }: { balancemodal: any; toggleBalanceModal: any; balancetype: any; leaveList: LeaveDetail[] }) => {
    return (
        <>
            <Modal show={balancemodal} onHide={toggleBalanceModal} size={'sm'}>
                <Modal.Header onHide={toggleBalanceModal}>
                    <h4 className="modal-title">{balancetype}</h4>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='mt-0 text-secondary'>Balance</h4>
                    <p>
                        {(leaveList || []).map((item, index) => {
                            return (
                                item.leave_type === balancetype ?
                                    <>
                                        {Object.entries(item.LeaveBalance).map(([key, value]) => {
                                            if (key !== 'id' && key !== 'user_id' && key !== "carry_over_expiration") {
                                         
                                                const capitalizedKey = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

                                                return (
                                                    <Row key={`leavesstatb-${index}-${key}`}>
                                                        <Col xs={7}>{capitalizedKey.replace(/_/g, ' ')}:</Col><Col xs={5} className='mb-1'><b>{value===null ?0:value}</b></Col>
                                                    </Row>
                                                );
                                            }
                                            return null;
                                        })}
                                    </>
                                    : ''
                            );
                        })}
                    </p>
                    <hr />
                    <h4 className='text-secondary'>Settings</h4>
                    <p>
                        {(leaveList || []).map((item, index) => {
                            return (
                                item.leave_type === balancetype ?
                                    <>
                                        {Object.entries(item.LeaveSetting).map(([key, value]) => {
                                            if(key!=="id" && key !=="leave_type_id")
                                           {     const capitalizedKey = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                                             return (
                                                <Row key={`leavesstats-${index}-${key}`}>
                                                    <Col xs={7}>{capitalizedKey.replace(/_/g, ' ')}:</Col><Col xs={5} className='mb-1'><b>{value}</b></Col>
                                                </Row>
                                            );}
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
            <NoteModal modal={modal} toggleModal={toggleModal} date={row.original.date} note={row.original.leave_notes}/>
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
            {new Date(row.original.date_to).toLocaleString(["en-GB"], {dateStyle:"medium"})}
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







// const LeavesStats = () => {
//     const [balancemodal, setBalanceModal] = useState<boolean>(false);
//     const [balancetype, setBalanceType] = useState('');

//     const[leaveList,setLeaveList]=useState([]);
//     const toggleBalanceModal = () => {
//         setBalanceModal((balancemodal) => !balancemodal);
//     };
//    useEffect(()=>{
//     const fetchData=async()=>{
//         try{
//         const url="http://35.154.28.156/api/user-leave-assign-list";
//         const headers={
//             "Accept":"application/json",
//             "Authorization":`Bearer ${config.API_TOKEN}`
//         }
//         var requestOptions={
//             method:"GET",
//             headers:headers
//         }
//         const response=await fetch(url,requestOptions);
//         if(response.status===200)
//          {   
//         const result = await response.json();
//         setLeaveList(result.data.leave_detail)
//         console.log(result.data.leave_detail)}
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//   fetchData()
//    },[])

//     return (
//         <Row>
//             {(leaveList || []).map((item, index) => {
//                 return (
                    
//                     <Col sm={4} lg={3} xl={3} key={`leavesstat-${index}`}>
//                         <Card className="text-white bg-primary mb-0 border-0" >
//                             <Card.Body className='p-2'>
//                             <div className="d-flex align-items-start ">
//                                 <div className="w-100">
//                                     <Card.Title as="h2" className="text-white mb-1">
//                                         {item.yearly_leave}
//                                     </Card.Title>
//                                     <Card.Text>
//                                         {item.leave_typetext}
//                                     </Card.Text>
//                                 </div>
//                                 <Link to="#" className="text-reset font-20" onClick={() => { setBalanceType(item.text); toggleBalanceModal();}}>
//                                     <i className="mdi mdi-information-outline"></i>
//                                 </Link>
//                             </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
                   
//                 );
//             })}
//             <BalanceModal balancemodal={balancemodal} toggleBalanceModal={toggleBalanceModal} balancetype={balancetype}/>
                   
//         </Row>
//     );
// }
interface LeaveDetail {
    // id: number;
    leave_type: string;
    yearly_leave: number;
    remaining_leave: number;
    LeaveBalance: {
        // id: number;
        // user_id: number;
        // Yearly_Entitlement: number;
        remaining_leave: number;
        carry_over: number;
        total_balance: number;
        carry_over_expiration: string;
        taken: number;
    };
    LeaveSetting: {
        id: number;
        leave_type_id: number;
        paid_time_off: string;
        accurual_frequency: string;
        prorate_accurual: string;
        max_carry_over: string;
        carry_over_expiration: string;
    };
}

const LeavesStats = () => {
    const [balancemodal, setBalanceModal] = useState<boolean>(false);
    const [balancetype, setBalanceType] = useState('');

    const [leaveList, setLeaveList] = useState<LeaveDetail[]>([]);
  
    const toggleBalanceModal = () => {
        setBalanceModal((balancemodal) => !balancemodal);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${BASE_URL}/api/user-leave-assign-list`;
                const headers = {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${config.API_TOKEN}`
                };
                var requestOptions = {
                    method: "GET",
                    headers: headers
                };
                const response = await fetch(url, requestOptions);
                if (response.status === 200) {
                    const result = await response.json();
                    // const modifiedData=result.data.leave_detail.map((item: LeaveDetail)=>(
                    //     {...item,
                    //         LeaveBalance:{
                    //             ...item.LeaveBalance,
                    //             Yearly_Entitlement:item.yearly_leave,
                    //             Carry_Over:item.LeaveBalance.carry_over,
                    //         },
                    //         LeaveSetting:{
                    //             ...item.LeaveSetting,
                    //             Maximum_Carry_Over: item.LeaveSetting.max_carry_over
                    //         }
                    //     }
                       
                    // ))
                    setLeaveList(result.data.leave_detail);
                    console.log(result.data.leave_detail);
                    
                }
            } catch (err) {
                console.log(err);
                
            }
        };
        fetchData();
    }, []);

    
    return (
        <Row>
            {(leaveList || []).map((item, index) => {
                return (
                    <Col sm={4} lg={3} xl={3} key={`leavesstat-${index}`}>
                        <Card className="text-white bg-primary mb-0 border-0" >
                            <Card.Body className='p-2'>
                                <div className="d-flex align-items-start ">
                                    <div className="w-100">
                                        <Card.Title as="h2" className="text-white mb-1">
                                            {/* {`${item.LeaveBalance.remaining_leave}`.padStart(2,"0")} Days */}
                                                  {`${item.LeaveBalance.total_balance===null ?0:item.LeaveBalance.total_balance}`.padStart(2,"0")} Days 
                                        </Card.Title>
                                        <Card.Text>
                                            {item.leave_type}
                                        </Card.Text>
                                    </div>
                                    <Link to="#" className="text-reset font-20" onClick={() => { setBalanceType(item.leave_type); toggleBalanceModal(); }}>
                                        <i className="mdi mdi-information-outline"></i>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
            <BalanceModal balancemodal={balancemodal} toggleBalanceModal={toggleBalanceModal} balancetype={balancetype} leaveList={leaveList}
            />
        </Row>
    );
}


let backuptimeofflist = [...timeoff];
let filtervalue_status = 'All';
let filtervalue_type = 'all'; 

const MyTimeoff = () => {
    const [timeofflist, setTimeoffList] = useState([...timeoff]);
    const [loading, setLoading] = useState(true);
    const [selectedLeaveType,setSelectedLeaveType]=useState("All");
    const [selectedLeaveStatus,setSelectedStatus]=useState("all");
   
    const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null); 
    const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(null);
    const [dataAvailable,setDataAvailable]=useState(true);


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

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
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
                setDataAvailable(true);
                backuptimeofflist = [...result.data.list]; 
                setLoading(false)
            }
            else{
                setDataAvailable(false)
                setLoading(false)
            }
    
          } catch (error:any) {
            console.log(error);
            setDataAvailable(false)
            setLoading(false)
          } finally {
            setLoading(false);
          } 
        };
    
        fetchData(); 
      }, []);

     
      
    //   useEffect(() => {
    //     // If both start and end dates are selected, filter the data
    //     if (selectedDateFrom && selectedDateTo) {
    //         // Adjust end date to include the entire selected day
    //         const adjustedEndDate = new Date(selectedDateTo.getTime() + (24 * 60 * 60 * 1000));
    
    //         const filteredList = backuptimeofflist.filter((day) => {
    //             const startDate = new Date(day.date_from);
    //             const endDate = new Date(day.date_to);
    
    //             // Adjust end date to include the entire day
    //             endDate.setDate(endDate.getDate() + 1);
    
    //             return startDate >= selectedDateFrom && endDate <= adjustedEndDate;
    //         });
    
    //         setTimeoffList(filteredList);
    //     }
    // }, [selectedDateFrom, selectedDateTo]);



    useEffect(() => {
        const filterData = () => {
            let filteredList = [...backuptimeofflist];
    
            if (selectedDateFrom && selectedDateTo) {
                const adjustedEndDate = new Date(selectedDateTo.getTime() + (24 * 60 * 60 * 1000));
    
                filteredList = filteredList.filter((day) => {
                    const startDate = new Date(day.date_from);
                    const endDate = new Date(day.date_to);
                    endDate.setDate(endDate.getDate() + 1);
    
                    return startDate >= selectedDateFrom && endDate <= adjustedEndDate;
                });
            }
    
            if (selectedLeaveType !== 'All') {
                filteredList = filteredList.filter(day => day.leave_type_id === selectedLeaveType);
            }
    
            if (selectedLeaveStatus !== 'all') {
                filteredList = filteredList.filter(day => day.status === selectedLeaveStatus);
            }
    
            setTimeoffList(filteredList);
        };
    
        filterData();
    }, [selectedDateFrom, selectedDateTo, selectedLeaveType, selectedLeaveStatus]);
    

    if(!dataAvailable){
        return <DataNotAvailable/>
      }


      if(loading){
        return(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="md" type="bordered" color="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
        )
     }

    //    const handleTypeFilter = (e:any) => {
    //     const filter = e.target.value; 
        

    //     if(!(filter === 'All')){
    //     const tempArray = [...timeoff]; tempArray.pop(); 
    //     {(backuptimeofflist || []).map((day, index) => {
    //         if(day.leave_type_id === filter) { tempArray.push(day)}
    //     })}
    //     setTimeoffList(tempArray);} else {setTimeoffList(backuptimeofflist)}
    //   };

    //   const handleStatusFilter = (e:any) => {
    //     const filter = e.target.value; 
    //     if(!(filter === 'all')){
    //     const tempArray = [...timeoff]; tempArray.pop(); 
    //     {(backuptimeofflist || []).map((day, index) => {
    //         if(day.status === filter) { tempArray.push(day)}
    //     })}
    //     setTimeoffList(tempArray);} else {setTimeoffList(backuptimeofflist)}
    //   }; 

     /*  const handleStatusFilter = (e:any) => {filtervalue_status = e.target.value; handleFilter()};
      const handleTypeFilter = (e:any) => {filtervalue_type = e.target.value; handleFilter()};

      const handleFilter = () => {
        console.log(filtervalue_type +' '+ filtervalue_status  );
      }; */

    

    //   const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const selectedDate = new Date(e.target.value);
    //     const fieldName = e.target.name;
    
    //     // Determine which date field is being changed and update the corresponding state
    //     if (fieldName === 'date-from') {
    //         setSelectedDateFrom(selectedDate);
    //     } else if (fieldName === 'date-to') {
    //         setSelectedDateTo(selectedDate);
    //     }
    
    //     // If both start and end dates are selected, filter the data
    //     if (selectedDateFrom && selectedDateTo) {
    //         // Adjust end date to include the entire selected day
    //         const adjustedEndDate = new Date(selectedDateTo.getTime() + (24 * 60 * 60 * 1000));
    
    //         const filteredList = backuptimeofflist.filter((day) => {
    //             const startDate = new Date(day.date_from);
    //             const endDate = new Date(day.date_to);
    
    //             // Adjust end date to include the entire day
    //             endDate.setDate(endDate.getDate() + 1);
    
    //             return startDate >= selectedDateFrom && endDate <= adjustedEndDate;
    //         });
    
    //         setTimeoffList(filteredList);
    //     }
    // };
    
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(e.target.value);
        const fieldName = e.target.name;
    
        // Determine which date field is being changed and update the corresponding state
        if (fieldName === 'date-from') {
            setSelectedDateFrom(selectedDate);
        } else if (fieldName === 'date-to') {
            setSelectedDateTo(selectedDate);
        }
    };
    
   const handleStatusFilter=(e:any)=>{
  setSelectedStatus(e.target.value)
   }
    
   const handleTypeFilter=(e:any)=>{
    setSelectedLeaveType(e.target.value)
   }

 

    
    

    // if(loading) return <Loader></Loader>; 
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
                                    {/* <FormInput
                                        label=""
                                        type="date"
                                        name="date-from"
                                        containerClass={'mb-1'}
                                        register={register}
                                        key="date-from"
                                        errors={errors}
                                        control={control}
                                    
                                    /> */}

                                    <FormInput
                                        label=""
                                        type="date"
                                        name="date-from"
                                        containerClass={'mb-1'}
                                        register={register}
                                        key="date-from"
                                        errors={errors}
                                        control={control}
                                        onChange={(e) => {
                                            setSelectedDateFrom(new Date(e.target.value)); // Set selected start date
                                            handleDateChange(e);
                                        }}
                                    />

                                </Col>
                                <Col sm={6} lg={2} xl={2} className='pr-desktop-0'>
                                    {/* <FormInput
                                        label=""
                                        type="date"
                                        name="date-to"
                                        containerClass={'mb-1'}
                                        register={register}
                                        key="date-to"
                                        errors={errors}
                                        control={control}
                                     
                                    /> */}

                                        <FormInput
                                            label=""
                                            type="date"
                                            name="date-to"
                                            containerClass={'mb-1'}
                                            register={register}
                                            key="date-to"
                                            errors={errors}
                                            control={control}
                                            onChange={(e) => {
                                                setSelectedDateTo(new Date(e.target.value)); // Set selected end date
                                                handleDateChange(e);
                                            }}
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
