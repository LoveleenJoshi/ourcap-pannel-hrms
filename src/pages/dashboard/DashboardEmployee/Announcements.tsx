import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import logo from "../../../assets/images/logo-sm.png"; // Logo for the admin
import img1 from '../../../assets/images/users/user-11.jpg';
import img2 from '../../../assets/images/users/user-1.jpg';

interface Announcement {
    id: number;
    title: string;
    description: string;
    images: string;
    created_at: string;
    name: string;
}
interface AnnouncementProp{
    announcement:Announcement[]
}

const staticAnnouncements: Announcement[] = [
    {
        id: 1,
        title: "Sample Announcement 1",
        description: "Guys, Our Netherlands office is up for its Q1 AGM meeting.",
        images: img1,
        created_at: "2024-04-01T12:00:00.000Z",
        name: "Admin"
    },
    {
        id: 2,
        title: "Sample Announcement 2",
        description: "Reminder: Submit your timesheets by Friday evening!",
        images: img2,
        created_at: "2024-04-02T12:00:00.000Z",
        name: "Admin"
    }
];

const Announcements: React.FC<AnnouncementProp> = ({announcement}) => {
    const rows = announcement.reduce<Announcement[][]>((acc, val, idx, array) => {
        if (idx % 2 === 0) {
            acc.push(array.slice(idx, idx + 2));
        }
        return acc;
    }, []);

    return (
        <Container fluid style={{ padding: '0.15px' }}> 
        <h4 className="header-title mb-3">News</h4>
        {announcement.length ? (
                rows.map((row, idx) => (
                    <Row key={idx} className="mb-2">
                        {row.map((announcement, index) => (
                            <Col key={index} md={6}>
                                <Card className="mb-1 widget-rounded-circle ">
                                    <Card.Body className='p-1'>
                                    
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <div className="avatar-lg rounded">
                                                    <Card.Img src={announcement.images} className="w-100"/>
                                                </div>
                                            </div>
                                            <div className="col mb-1  rounded">
                                                <h4 className="mb-1 mt-0 font-14" style={{ fontSize: '1rem', lineHeight: '1.5', textAlign: 'left', wordWrap: 'break-word' }}>{announcement.description}</h4>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="logo-container rounded-circle bg-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '1px' }}>
                                                            <Card.Img src={logo} style={{ width: 'auto', height: '100%' }} />
                                                        </div>
                                                        <p className="mb-0 ms-1 text-secondary">{announcement.name}</p>
                                                    </div>
                                                    <p className="mb-0 me-2 text-secondary">{new Date(announcement.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ))
            ) : (
                <p>No announcements</p>
            )}
        </Container>
    );
};

export default Announcements;
