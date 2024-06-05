// import React, { useState,useEffect } from 'react';
// import { Button, Card } from 'react-bootstrap';
// import { FiCalendar } from 'react-icons/fi'; 


// interface Holiday {
//   id: number;
//   name: string;
//   holiday_date_to: string;
//   days: string;
// }

// interface HolidaysProps {
//   holiday: Holiday[];
// }

// const Holidays: React.FC<HolidaysProps> = ({ holiday }) => {
//   const [showAll,setShowAll]=useState(false)
//   const [filteredHolidays, setFilteredHolidays] = useState<Holiday[]>([]);
//   useEffect(() => {
//     const currentMonthName = new Date().toLocaleString('en-GB', { month: 'short' });
//     const filtered = holiday.filter(holiday =>{
//       const holidayDate = new Date(`${holiday.holiday_date_to} ${new Date().getFullYear()}`);
//       const holidayMonth = holidayDate.toLocaleString('en-GB', { month: 'short' });
//       return holidayMonth === currentMonthName;
//     });
//     setFilteredHolidays(filtered);
//   }, [holiday]);

//   const displayHolidays = showAll ? holiday : filteredHolidays;

//   const handleViewMonthWise=async ()=>{
//     setShowAll(!showAll)
//   }
//   return (
//     <>
//       <Card>
//         <Card.Body>
//         <div className='d-flex align-items-center justify-content-between'>
//         <h4 className="header-title ">Holidays</h4>
//      <div className='d-flex align-items-center'>
//      <FiCalendar className="ms-2 me-4" size={20}/>
//         <h6 className='text-success me-3'>{new Date().toLocaleString('en-GB', { month: 'short' })}</h6>
//      </div>
      
//         </div>

      
//           {displayHolidays.map((day, index) => (
//             <Card className="widget-rounded-circle bg-light mb-2" key={index}>
//               <Card.Body className='p-1'>
//                 <div className="row align-items-center">
//                   <div className="col-auto">
//                     <div className="avatar-md text-center rounded bg-success text-white">
//                       {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split('-').pop()}</h3> */}
//                       {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split(' -')[0]}</h3> */}
//                       {/* <p>{new Date(day.holiday_date_to).toLocaleString('default', { month: 'long' }).slice(0, 3)}</p> */}
//                       {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split(' ')[0]}</h3> */}
                      
//                       <h3 className='mb-0 mt-0 text-white font-20 pt-1'>
//                       {day.holiday_date_to && day.holiday_date_to.split(' ')[0]}
//                     </h3>
//                     <p className='text-white'>
//                       {day.holiday_date_to && day.holiday_date_to.split(' ')[1]}
//                     </p>
//                     </div>
//                   </div>
//                   <div className="col">
//                     <h5 className="mb-1 mt-0 font-14">{day.name}</h5>
//                     {/* <p className="mb-0 text-secondary">{new Date(day.holiday_date_to).toLocaleString(["en-GB"], {dateStyle:"medium"})} | {day.days}</p> */}
//                     <p className="mb-0 text-secondary">{day.holiday_date_to} | {day.days}</p>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           ))}
//         </Card.Body>
//         <Card.Footer className='text-end'>  <Button variant="link" onClick={handleViewMonthWise}>
//            {showAll ? 'Show Less' : 'View All'}</Button>
//          </Card.Footer>
//       </Card>
//     </>
//   );
// };

// export default Holidays;
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import CustomIcon from './CustomIcon';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Holiday {
  id: number;
  name: string;
  holiday_date_to: string;
  days: string;
}

interface HolidaysProps {
  holiday: Holiday[];
}

const Holidays: React.FC<HolidaysProps> = ({ holiday }) => {
  const [showAll, setShowAll] = useState(false);
  const [filteredHolidays, setFilteredHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    filterHolidaysByMonth(selectedDate);
  }, [holiday, selectedDate]);

  const calendarIconData = {
    attributes: {
      id: 'calendar',
      membership: {
        free: ['solid', 'regular'],
        pro: ['solid', 'regular', 'light', 'duotone'],
      },
      styles: 'regular',
      unicode: 'fa-calendar-alt',
      voted:true,
    },
    id: 'calendar-alt',
    links: {
      self: '/api/icons/calendar-alt',
    },
    type: 'icon',
  }

  const filterHolidaysByMonth = (date: Date | null) => {
    if (date) {
      const selectedMonthName = date.toLocaleString('en-GB', { month: 'short' });
      const filtered = holiday.filter(holiday => {
        const holidayDate = new Date(`${holiday.holiday_date_to} ${new Date().getFullYear()}`);
        const holidayMonth = holidayDate.toLocaleString('en-GB', { month: 'short' });
        return holidayMonth === selectedMonthName;
      });
      setFilteredHolidays(filtered);
    }
  };

  const handleViewMonthWise = () => {
    setShowAll(!showAll);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(prev => !prev);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false); 
    }
  };

  const displayHolidays = showAll ? holiday : filteredHolidays;

  return (
    <div className='mt-3 mb-4'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h4 className="header-title">Holidays</h4>
        <div className='d-flex align-items-center justify-content-center bg-white text-center rounded rounded-4' style={{ padding: "4px 8px", position: "relative" }}>
        {/* <Calendar className="text-primary" size={15} onClick={toggleDatePicker} style={{ cursor: 'pointer', marginRight: '5px', marginTop: "2px" }} /> */}
       
       <CustomIcon  {...calendarIconData.attributes} onClickBtn={toggleDatePicker} unicode={calendarIconData.attributes.unicode} className='me-1 text-primary'/>
       
        <span className='mb-0 text-primary' style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '0' }}>{selectedDate?.toLocaleString('en-GB', { month: 'short' })}</span>
        {showDatePicker && (
          <div className="position-absolute" style={{ zIndex: 1000, top: '40px', right: '0', maxHeight:"240px", overflow:"scroll"}}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              showMonthYearPicker
            />
          </div>
        )}
      </div>
    </div>
      <Card className='mb-4'>
        <Card.Body className='p-2 mt-1'>
          {displayHolidays.length > 0 ? (
            displayHolidays.map((day, index) => (
              <Card className="widget-rounded-circle bg-light mt-1" key={index}>
                <Card.Body className='p-1'>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className={`avatar-md text-center rounded text-white ${day.name === "Core Techies Foundation Day" ? "bg-primary" : "bg-success"}`}>
                        <h3 className='mb-0 mt-0 text-white font-20 pt-1'>
                          {day.holiday_date_to && day.holiday_date_to.split(' ')[0]}
                        </h3>
                        <p className='text-white'>
                          {day.holiday_date_to && day.holiday_date_to.split(' ')[1]}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <h5 className="mb-1 mt-0 font-14">{day.name}</h5>
                      <p className="mb-0 text-secondary">{day.holiday_date_to} | {day.days}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h5 className='text-secondary'>There are no holidays for this month.</h5>
          )}
        </Card.Body>
        <Card.Footer className='text-center bg-white p-2'>
          <Button variant="link" onClick={handleViewMonthWise}>
            {showAll ? 'Show Less' : 'View All'}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Holidays;
