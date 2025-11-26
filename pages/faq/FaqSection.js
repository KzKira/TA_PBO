import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';



const FaqSection = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div className="wpo-benefits-section">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="wpo-benefits-item">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography>1. What is Eduko?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                   Eduko is an online learning platform that offers interactive courses, video tutorials, and quizzes across various subjects to help learners develop new skills anytime, anywhere.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography>2. Do I need to pay to use Eduko?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Eduko offers both free and premium courses. Premium courses require a one-time payment or a subscription plan, depending on the course provider.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography>3. How do I reset my password?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Go to the login page, click “Forgot Password,” and follow the instructions sent to your registered email address.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography>4. Can I access courses offline?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Some courses allow offline viewing through our mobile app. Simply download the lessons in advance and learn without an internet connection.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FaqSection;