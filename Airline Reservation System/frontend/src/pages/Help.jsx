import React, { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from './Navbar';

function FAQ() {
  const [faqs, setFAQs] = useState([
    {
      question: "How can I book a flight?",
      answer: "To book a flight, simply visit our homepage and navigate to the 'Book a Flight' section. Use our intuitive search feature to find available flights that match your travel preferences. After selecting your ideal flight, provide passenger details to complete the booking. You have the option to book as a guest or registered user for added convenience."
    },
    {
      question: "How can I make my payments?",
      answer: "First you need to book a flight and get online tickets.Then before boarding in the airport cashier section , validate your onlie ticket and make the payment."
    },
    {
      question: "What are the benefits I can get by sign up for this airline system?",
      answer: "You can enjoy discounts based on you membership status. We have frequent and gold memberships.Based on your ooking count from your register account we will upgrade your membership.Frequent membership and gold membership offer 5% and 9% discounts respectively. "
    },
    {
      question:"Can I change my flight booking?",
      answer: "Yes, but you can't do that online.You have to meet the authorities at airport to make the change based on the availability of the seats in your desired flight."
    },
    {
        question:"What is the baggage allowance of your airline?",
        answer:"As a general guide, carry-on baggage should have maximum length of 22 in (56 cm), width of 18 in (45 cm) and depth of 10 in (25 cm). These dimensions include wheels, handles, side pockets, etc. Some airlines also enforce weight limitations, typically starting at 5kg/11lbs."
    },
    {
        question:"Can I do payment via creditcard?",
        answer:"For the time being we don't allow users to pay via credit card at the time of booking ticket.But at the airport while making payment  you can use it."
    }


  ]);

  return (
    <>
    <NavBar />
    
    <Container  sx={{marginTop:8}}> 
      <Typography variant="h4" component="h1" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ borderTop:'2px solid rgba(0, 0, 0, 0.3)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
    </>
  );
}

export default FAQ;
