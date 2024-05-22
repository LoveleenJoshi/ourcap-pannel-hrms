import React, { useState,useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

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
  const [showAll,setShowAll]=useState(false)
  const [filteredHolidays, setFilteredHolidays] = useState<Holiday[]>([]);
  useEffect(() => {
    const currentMonthName = new Date().toLocaleString('en-GB', { month: 'short' });
    const filtered = holiday.filter(holiday =>{
      const holidayDate = new Date(`${holiday.holiday_date_to} ${new Date().getFullYear()}`);
      const holidayMonth = holidayDate.toLocaleString('en-GB', { month: 'short' });
      return holidayMonth === currentMonthName;
    });
    setFilteredHolidays(filtered);
  }, [holiday]);

  const displayHolidays = showAll ? holiday : filteredHolidays;

  const handleViewMonthWise=async ()=>{
    setShowAll(!showAll)
  }
  return (
    <>
      <Card>
        <Card.Body>
        <div className='d-flex align-items-center justify-content-between'>
        <h4 className="header-title">Holidays</h4>
        <Button variant="link" onClick={handleViewMonthWise}>
           {showAll ? 'Show Less' : 'View All'}</Button>
        </div>
          {displayHolidays.map((day, index) => (
            <Card className="widget-rounded-circle bg-light mb-2" key={index}>
              <Card.Body className='p-1'>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="avatar-md text-center rounded bg-success text-white">
                      {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split('-').pop()}</h3> */}
                      {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split(' -')[0]}</h3> */}
                      {/* <p>{new Date(day.holiday_date_to).toLocaleString('default', { month: 'long' }).slice(0, 3)}</p> */}
                      {/* <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split(' ')[0]}</h3> */}
                      
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
                    {/* <p className="mb-0 text-secondary">{new Date(day.holiday_date_to).toLocaleString(["en-GB"], {dateStyle:"medium"})} | {day.days}</p> */}
                    <p className="mb-0 text-secondary">{day.holiday_date_to} | {day.days}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default Holidays;