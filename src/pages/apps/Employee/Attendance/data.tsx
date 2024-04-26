import { userAttendanceApi } from "../../../../helpers/api/apiServices";


interface Records {
    date: string;
    day: string
    clockin: string;
    clockout: string;
    scheduledhours: string;
    loggedhours: string;
    overtime: string;
    note: string;
}

interface ExpandableRecords {
    date: string;
    day: string
    clockin: string;
    clockout: string;
    scheduledhours: string;
    loggedhours: string;
    overtime: string;
    note: string;
    subRows: Records[];
}

const dummydata: Records[] = [
    {
        date: '4 Apr 2024',
        day: 'Thu',
        clockin: '9:30 AM',
        clockout: '6:30 PM',
        scheduledhours: '9h 00m',
        loggedhours: '9h 00m',
        overtime: '0h 00m',
        note: 'some note here and tasks done today'
    },
    {
        date: '3 Apr 2024',
        day: 'Wed',
        clockin: '9:30 AM',
        clockout: '6:30 PM',
        scheduledhours: '9h 00m',
        loggedhours: '9h 00m',
        overtime: '0h 00m',
        note: 'some note here and tasks done today'
    },
    {
        date: '2 Apr 2024',
        day: 'Tue',
        clockin: '9:30 AM',
        clockout: '6:30 PM',
        scheduledhours: '9h 00m',
        loggedhours: '9h 00m',
        overtime: '0h 00m',
        note: 'some note here and tasks done today'
    },
    {
        date: '1 Apr 2024',
        day: 'Mon',
        clockin: '9:30 AM',
        clockout: '6:30 PM',
        scheduledhours: '9h 00m',
        loggedhours: '9h 00m',
        overtime: '0h 00m',
        note: 'some note here and tasks done today'
    },
    
];

const expandableRecords: ExpandableRecords[] = [
    {
        date: '1',
        day: 'Thu',
        clockin: '32',
        clockout: 'Burt',
        scheduledhours: '9h 00m',
        loggedhours: 'Kaggle',
        overtime: '0h 00m',
        note: 'some note here and tasks done today',
        subRows: [
            {
                date: '51',
                day: 'Thu',
                clockin: '23',
                clockout: 'Bruno',
                scheduledhours: '9h 00m',
                loggedhours: 'Magmina',
                overtime: '0h 00m',
                note: 'some note here and tasks done today'
            },
        ],
    },
    
];
export { dummydata, expandableRecords };
