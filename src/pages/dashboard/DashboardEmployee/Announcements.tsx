// import React, { useEffect, useState } from "react";
// import { Card, Container, Row, Col, Button } from "react-bootstrap";
// import DatePicker from 'react-datepicker';
// import { FiCalendar } from 'react-icons/fi';
// import "react-datepicker/dist/react-datepicker.css";
// import logo from "../../../assets/images/logo-sm.png"; // Logo for the admin
// import config from "../../../config";

// interface Announcement {
//   id: number;
//   title: string;
//   description: string;
//   images: string;
//   created_at: string;
//   name: string;
//   date: string;
// }

// interface AnnouncementProp {
//   announcement: Announcement[];
// }

// const Announcements: React.FC<AnnouncementProp> = ({ announcement }) => {
//   const [expandedNewsIndex, setExpandedNewsIndex] = useState<string | null>(null);
//   const [filteredNews, setFilteredNews] = useState<Announcement[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const toggleViewMore = (uniqueId: string) => {
//     setExpandedNewsIndex((prevId) => (prevId === uniqueId ? null : uniqueId));
//   };

//   useEffect(() => {
//     const currentMonthName = new Date().toLocaleDateString("en-GB", { month: "long" });
//     const currentYear = new Date().getFullYear();

//     const filtered = announcement.filter((announcement) => {
//       const [day, month, year] = announcement.date.split(" ");
//       return month === currentMonthName && year === String(currentYear);
//     });

//     setFilteredNews(filtered);
//     console.log(filtered); // Debugging to check what's being filtered
//   }, [announcement]);

//   const displayNews = filteredNews;
//   const rows = [];
//   for (let i = 0; i < displayNews.length; i += 2) {
//     const pair = displayNews.slice(i, i + 2);
//     rows.push(pair);
//   }

//   const fetchNews = async (month: string, year: string) => {
//     try {
//       const formData = new FormData();
//       formData.append('month', month);
//       formData.append('year', year);

//       const response = await fetch('https://app.ourcap.app/api/get-news', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${config.API_TOKEN}`
//         },
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       if (data.status === 'success') {
//         setFilteredNews(data.data.news);
//       } else {
//         setFilteredNews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setFilteredNews([]);
//     }
//   };

//   const toggleDatePicker = () => {
//     setShowDatePicker(prev => !prev);
//   };

//   const handleDateChange = (date: Date | null) => {
//     if (date) {
//       setSelectedDate(date);
//       setShowDatePicker(false); // Close the DatePicker after a date is selected

//       const month = date.toLocaleDateString("en-GB", { month: "long" });
//       const year = date.getFullYear().toString();

//       fetchNews(month, year);
//     }
//   };

//   return (
//     <Container fluid style={{ padding: '0.15px' }}>
//       <div className="d-flex justify-content-between align-items-center text-center mb-2">
//         <h4 className="header-title">News</h4>

//         <div className='d-flex align-items-center justify-content-center bg-white text-center rounded rounded-4' style={{ padding: "4px 8px", position: "relative" }}>
//           <FiCalendar className="text-primary" size={15} onClick={toggleDatePicker} style={{ cursor: 'pointer', marginRight: '5px', marginTop: "2px" }} />
//           <span className='mb-0 text-primary' style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '0' }}>{selectedDate?.toLocaleString('en-GB', { month: 'short' })}</span>
//           {showDatePicker && (
//             <div className="position-absolute" style={{ zIndex: 1000, top: '40px', right: '0', maxHeight: "300px", overflow: "scroll" }}>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={handleDateChange}
//                 inline
//                 showMonthYearPicker
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {filteredNews.length > 0 ? (
//         rows.map((row, idx) => (
//           <Row key={idx} className="mb-2">
//             {row.map((news, index) => (
//               <Col key={index} md={6}>
//                 <Card className="mb-1 widget-rounded-circle">
//                   <Card.Body className='p-1'>
//                     <div className="row align-items-center">
//                       <div className="col-auto">
//                         <div className="avatar-lg rounded">
//                           <Card.Img src={news.images} className="w-100 h-100" />
//                         </div>
//                       </div>
//                       <div className="col mb-1 rounded">
//                         <h4
//                           style={{ fontWeight: "500", lineHeight: "1.5" }}
//                           className={`mt-0 mb-0 me-2 text-dark ${expandedNewsIndex === `${news.id}` ? '' : 'sp-line-2'}`}
//                           onClick={() => setExpandedNewsIndex((prevId) => (prevId === `${news.id}` ? null : `${news.id}`))}
//                         >
//                           {news.description}
//                         </h4>
//                         <div className="d-flex justify-content-between mt-2">
//                           <div className="d-flex align-items-center">
//                             <div className="logo-container rounded-circle bg-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '1px' }}>
//                               <Card.Img src={logo} style={{ width: 'auto', height: '100%' }} />
//                             </div>
//                             <p className="mb-0 ms-1 text-secondary">{news.name}</p>
//                           </div>
//                           <p className="mb-0 me-2 text-secondary">{new Date(news.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ))
//       ) : (
//         <Card className="widget-rounded-circle">
//           <Card.Body>
//             <h5 className='text-secondary'>There are no news for this month.</h5>
//           </Card.Body>
//         </Card>
//       )}

//       <div className="text-center">
//         {/* Button placeholder, if needed later */}
//       </div>
//     </Container>
//   );
// };


import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';
// import { FiCalendar } from 'react-icons/fi';
import CustomIcon from "./CustomIcon";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../../assets/images/logo-sm.png"; // Logo for the admin
import config from "../../../config";
import BASE_URL from "../../../Base_URL/base_url";

interface Announcement {
  id: number;
  title: string;
  description: string;
  images: string;
  created_at: string;
  name: string;
  date: string;
}

interface AnnouncementProp {
  announcement: Announcement[];
}

const Announcements: React.FC<AnnouncementProp> = ({ announcement }) => {
  const [expandedNewsIndex, setExpandedNewsIndex] = useState<string | null>(null);
  const [filteredNews, setFilteredNews] = useState<Announcement[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAll, setShowAll] = useState(false);

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

  const displayNews = showAll ? filteredNews : filteredNews.slice(0, 4);
  const rows = [];
  for (let i = 0; i < displayNews.length; i += 2) {
    const pair = displayNews.slice(i, i + 2);
    rows.push(pair);
  }

  const fetchNews = async (month: string, year: string) => {
    try {
      const formData = new FormData();
      formData.append('month', month);
      formData.append('year', year);

      const response = await fetch(`${BASE_URL}/api/get-news`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.API_TOKEN}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setFilteredNews(data.data.news);
      } else {
        setFilteredNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setFilteredNews([]);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(prev => !prev);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false); // Close the DatePicker after a date is selected

      const month = date.toLocaleDateString("en-GB", { month: "long" });
      const year = date.getFullYear().toString();

      fetchNews(month, year);
    }
  };

  const handleToggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  return (
    <Container fluid style={{ padding: '0.15px' }}>
      <div className="d-flex justify-content-between align-items-center text-center mb-2">
        <h4 className="header-title">Announcements</h4>

        <div className='d-flex align-items-center justify-content-center bg-white text-center rounded rounded-4' style={{ padding: "4px 8px", position: "relative" }}>
          {/* <FiCalendar className="text-primary" size={15} onClick={toggleDatePicker} style={{ cursor: 'pointer', marginRight: '5px', marginTop: "2px" }} /> */}
         
         <CustomIcon {...calendarIconData.attributes} onClickBtn={toggleDatePicker} unicode={calendarIconData.attributes.unicode} className="text-primary me-1"/>
          <span className='mb-0 text-primary' style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '0' }}>{selectedDate?.toLocaleString('en-GB', { month: 'short' })}</span>
          {showDatePicker && (
            <div className="position-absolute" style={{ zIndex: 1000, top: '40px', right: '0', maxHeight: "240px", overflow: "scroll" }}>
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

      {filteredNews.length > 0 ? (
        rows.map((row, idx) => (
          <Row key={idx} className="mb-2">
            {row.map((news, index) => (
              <Col key={index} md={6}>
                <Card className="mb-1 widget-rounded-circle">
                  <Card.Body className='p-1'>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div className="avatar-lg rounded">
                          <Card.Img src={news.images} className="w-100 h-100" />
                        </div>
                      </div>
                      <div className="col mb-1 rounded">
                        <h5
                          style={{
                            lineHeight: "1.5" }}
                          className={`mt-0 mb-0 me-2 font-14 ${expandedNewsIndex === `${news.id}` ? '' : 'sp-line-2'}`}
                          onClick={() => setExpandedNewsIndex((prevId) => (prevId === `${news.id}` ? null : `${news.id}`))}
                        >
                          {news.description}
                        </h5>
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
        ))
      ) : (
        <Card className="widget-rounded-circle">
          <Card.Body>
            <h5 className='text-secondary'>There are no news for this month.</h5>
          </Card.Body>
        </Card>
      )}

      <div className="text-center">
      <Button variant="link" className="text-center" onClick={handleToggleShowAll}>
          {showAll ? "Show Less" : "View All"}
        </Button>
      </div>
    </Container>
  );
};

export default Announcements;
