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
    leave_type_id: string
    leave_notes: string
    attachment: any
    status: string
}

const timeoff: TimeoffProps[] = [
    {
        leaveId: 0,
        user_id: 0,
        name:"-",
        email:"-",
        gender:"-",
        date_to:"-",
        date_from:"-",
        time_to:"-",
        time_from:"-",
        leave_type_id: "-",
        leave_notes: "-",
        attachment: "-",
        status:"pending"
    },    
];




const leavesStatsRecord = [
    {
        text: 'Annual',
        value: '17 Days',
        balance : {
            'Yearly Entitlement':'12 days',
            'Carry Over':'6 days',
            'Requested':'1 day',
            'Carry Over Balance':'5 days',
            'Balance':'17 days'
        },
        settings : {
            'Paid Time off':'Yes',
            'Accrual Frequency':'Yearly',
            'Prorate Accrual':'Yes',
            'Maximum Carry Over':'6 days',
            'Carry Over Expiration':'Dec 31',
        }
    },
    {
        text: 'Paternity ',
        value: '05 Days',
        balance : {
            'Yearly Entitlement':'12 days',
            'Carry Over':'6 days',
            'Requested':'1 day',
            'Carry Over Balance':'5 days',
            'Balance':'17 days'
        },
        settings : {
            'Paid Time off':'Yes',
            'Accrual Frequency':'Yearly',
            'Prorate Accrual':'Yes',
            'Maximum Carry Over':'6 days',
            'Carry Over Expiration':'Dec 31',
        }
    },
    {
        text: 'Sick Leave',
        value: '12 Days',
        balance : {
            'Yearly Entitlement':'12 days',
            'Carry Over':'6 days',
            'Requested':'1 day',
            'Carry Over Balance':'5 days',
            'Balance':'17 days'
        },
        settings : {
            'Paid Time off':'Yes',
            'Accrual Frequency':'Yearly',
            'Prorate Accrual':'Yes',
            'Maximum Carry Over':'6 days',
            'Carry Over Expiration':'Dec 31',
        }
    },
    
];

export { timeoff, leavesStatsRecord };
