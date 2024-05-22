import React,{useEffect, useState} from "react";
import { Card, Container, Row, Col,Button } from "react-bootstrap";
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
    date:string;
}
interface AnnouncementProp{
    announcement:Announcement[]
}

// const staticAnnouncements: Announcement[] = [
//     {
//         id: 1,
//         title: "Sample Announcement 1",
//         description: "Guys, Our Netherlands office is up for its Q1 AGM meeting.",
//         images: img1,
//         created_at: "2024-04-01T12:00:00.000Z",
//         name: "Admin"
//     },
//     {
//         id: 2,
//         title: "Sample Announcement 2",
//         description: "Reminder: Submit your timesheets by Friday evening!",
//         images: img2,
//         created_at: "2024-04-02T12:00:00.000Z",
//         name: "Admin"
//     }
// ];

const Announcements: React.FC<AnnouncementProp> = ({ announcement }) => {
    const [expandedNewsIndex, setExpandedNewsIndex] = useState<string | null>(null); // Track the unique id of the expanded news item
   const [showModal,setShowModal]=useState(false);
   const [filterdNews,setFilteredNews]=useState<Announcement[]>([])
  

    const toggleViewMore = (uniqueId: string) => {
        setExpandedNewsIndex((prevId) => (prevId === uniqueId ? null : uniqueId));
    };

   
    useEffect(() => {
       
        const currentMonthName = new Date().toLocaleDateString("en-GB", { month: "long" });
        const currentYear = new Date().getFullYear();
    
        const filtered = announcement.filter((announcement) => {
            const [day, month, year] = announcement.date.split(" "); 
            return month === currentMonthName && year === String(currentYear); 
        });
    
        setFilteredNews(filtered);
        console.log(filtered); // Debugging to check what's being filtered
    }, [announcement]);
    
    
    
    const displayNews = showModal ? announcement : filterdNews;
    const rows = [];
    for (let i = 0; i < displayNews.length; i += 2) {
        const pair = displayNews.slice(i, i + 2);
        rows.push(pair);
    }
    
    const handleViewMonthWise=async()=>{
    setShowModal(!showModal)
    }

    return (
        <Container fluid style={{ padding: '0.15px' }}>
            <div className="d-flex justify-content-between align-items-center text-center">
                <h4 className="header-title mb-3">News</h4>
                <Button variant="link" onClick={handleViewMonthWise}>
                    {showModal ? "Show Less" : "View All"}
                </Button>
            </div>
            {rows.length ? rows.map((row, idx) => (
                <Row key={idx} className="mb-2">
                    {row.map((news, index) => (
                        <Col key={index} md={6}>
                            <Card className="mb-1 widget-rounded-circle ">
                                <Card.Body className='p-1'>
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <div className="avatar-lg rounded">
                                                <Card.Img src={news.images} className="w-100 h-100" />
                                            </div>
                                        </div>
                                        <div className="col mb-1 rounded">
                                            <h4
                                                style={{ fontWeight: "500", lineHeight: "1.5" }}
                                                className={`mt-0 mb-0 me-2 text-dark ${expandedNewsIndex === `${news.id}` ? '' : 'sp-line-2'}`}
                                                onClick={() => setExpandedNewsIndex((prevId) => (prevId === `${news.id}` ? null : `${news.id}`))}
                                            >
                                                {news.description}
                                            </h4>
                                            <div className="d-flex justify-content-between mt-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="logo-container rounded-circle bg-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '1px' }}>
                                                        <Card.Img src={logo} style={{ width: 'auto', height: '100%' }} />
                                                    </div>
                                                    <p className="mb-0 ms-1 text-secondary">{news.name}</p>
                                                </div>
                                                <p className="mb-0 me-2 text-secondary">{new Date(news.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )) : (
                <Card className="widget-rounded-circle">
                    <Card.Body className='p-2'>
                        <h4 className="header-title mb-3">No announcements</h4>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );

};

export default Announcements;
