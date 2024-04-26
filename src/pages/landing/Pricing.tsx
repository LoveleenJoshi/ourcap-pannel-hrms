import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// components
import PricingCard, { PlanItemsTypes } from '../../components/PricingCard';

interface PricingProps {
    plans: PlanItemsTypes[];
}

const BgShapeSVG = () => {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000.000000 350.000000"
            preserveAspectRatio="xMidYMid meet"
            className="w-100"
        >
            <g
                transform="translate(0.000000,350.000000) scale(0.100000,-0.100000)"
                stroke="none"
                className="bg-shape-svg"
            >
                <path
                    d="M8395 3469 c-2378 -45 -4839 -213 -6805 -465 -531 -67 -1508 -211
-1572 -230 -17 -5 -18 -80 -18 -1390 l0 -1384 10000 0 10000 0 -2 1387 -3
1388 -200 32 c-2047 333 -4669 560 -7420 643 -979 29 -2943 39 -3980 19z"
                />
            </g>
        </svg>
    );
};

const Pricing = ({ plans }: PricingProps) => {
    return (
        <>
            <section className="section pb-0 bg-gradient" id="pricing">
                <div className="bg-shape">
                    <BgShapeSVG />
                </div>

                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="text-center mb-4">
                                <h3 className="text-white">Choose Our Pricing Plans</h3>
                                <p className="text-white-50">
                                    The clean and well commented code allows easy customization of the theme.It's
                                    designed for describing your app, agency or business.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <PricingCard
                        plans={plans}
                        containerClass={'align-items-center'}
                        pricingCardClass={'pricing-plan mt-4'}
                    />
                </Container>
            </section>
        </>
    );
};

export default Pricing;
