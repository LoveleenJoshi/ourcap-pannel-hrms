import React from 'react';
import { Card } from 'react-bootstrap';

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
  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="header-title mb-3">Holidays</h4>
          {holiday.map((day, index) => (
            <Card className="widget-rounded-circle bg-light mb-2" key={index}>
              <Card.Body className='p-1'>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="avatar-md text-center rounded bg-success text-white">
                      <h3 className='mb-0 mt-0 text-white font-20 pt-1'>{day.holiday_date_to.split('-').pop()}</h3>
                      <p>{new Date(day.holiday_date_to).toLocaleString('default', { month: 'long' }).slice(0, 3)}</p>
                    </div>
                  </div>
                  <div className="col">
                    <h5 className="mb-1 mt-0 font-14">{day.name}</h5>
                    <p className="mb-0 text-secondary">{new Date(day.holiday_date_to).toLocaleString(["en-GB"], {dateStyle:"medium"})} | {day.days}</p>
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