import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// components
import FAQs from '../../components/FAQs';

interface FAQProps {
    rawFaqs: {
        id: number;
        question: string;
        answer: string;
        titleClass?: string;
        textClass?: string;
    }[];
}

const FAQ = ({ rawFaqs }: FAQProps) => {
    return (
        <>
            <section className="section bg-body" id="faq">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="text-center mb-5">
                                <h3>Frequently Asked Questions</h3>
                                <p className="text-muted">At solmen va esser necessi far uniform grammatica.</p>
                            </div>
                        </Col>
                    </Row>

                    {/* question/answer */}
                    <FAQs rawFaqs={rawFaqs} />
                </Container>
            </section>
        </>
    );
};

export default FAQ;
