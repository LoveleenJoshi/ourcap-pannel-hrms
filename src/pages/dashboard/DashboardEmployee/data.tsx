import React, { useState, useEffect }  from 'react';
import config from '../../../config';

import avatar1 from '../../../assets/images/users/user-2.jpg';
import avatar2 from '../../../assets/images/users/user-3.jpg';
import avatar3 from '../../../assets/images/users/user-4.jpg';
import avatar4 from '../../../assets/images/users/user-5.jpg';
import avatar5 from '../../../assets/images/users/user-6.jpg';

const emplyeesonleaveList = [
    {
        id: 1,
        avatar: avatar1,
        name: 'Tomaslau',
        department: 'IT'
    },
    {
        id: 2,
        avatar: avatar2,
        name: 'Erwin E. Brown',
        department: 'Sales'
    },
    {
        id: 3,
        avatar: avatar3,
        name: 'Margeret V. Ligon',
        department: 'Marketing'
    },
    {
        id: 4,
        avatar: avatar4,
        name: 'Jose D. Delacruz',
        department: 'IT'
    },
    {
        id: 5,
        avatar: avatar5,
        name: 'Luke J. Sain',
        department: 'IT'
    },
];

interface holidayListProps {
    holiday: 
        {
            id: number
            name: string
            holiday_date_to: string
            days: string
        }[]
};

let holidayList = [
  {
      id: 0,
      name: '-',
      holiday_date_to: '01 Jan',
      days: "-",
  },
 
];
 



export { emplyeesonleaveList, holidayList };
