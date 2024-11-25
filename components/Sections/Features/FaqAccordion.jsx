'use client';

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { getAllFaq } from 'components/Apis/faq';
import { usePathname } from 'next/navigation';


const FaqAccordion = () => {
  const [allFaq, setAllFaq] = useState([]);
  const pathname = usePathname();

  

  const [expanded, setExpanded] = useState(0);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getAllFaqs = async () => {
    try {
      const res = await getAllFaq();
      if (res) {
        const data = res?.data?.data?.ref;

        let filterFaq;
        if(pathname === '/'){
          filterFaq = data.filter((item) => item?.page === 'home');
        }
        if(pathname === '/about-us'){
          filterFaq = data.filter((item) => item?.page === 'about');
        }

        setAllFaq(filterFaq);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="lg:pb-20 pb-10">
          <div className='flex flex-row gap-2 mb-10'>
            <h1 className='lg:text-3xl text-2xl after:content-[""] after:absolute relative after:left-full after:ml-2 after:top-1/2 after:-translate-y-1/2 lg:after:w-64 after:h-0.5 text-[#056a70ff] after:bg-[#056a70ff]'>
              FAQs
            </h1>
          </div>
          {allFaq.map((item, index) => (
            <Accordion
              key={index}
              className="bg-gray-100"
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                {expanded === index ? (
                  <span className="bg-[#fb8c00] mr-4 text-white text-lg border-[0.5px] border-gray-200 px-2 
                  w-[28px] rounded-full">
                    -
                  </span>
                ) : (
                  <span className="bg-orange-600 mr-4 text-white text-md border-[0.5px] border-gray-200 px-2 w-[28px] rounded-full">
                    +
                  </span>
                )}
                <Typography className="text-lg font-bold">
                  {item?.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-md mt-1 opacity-70 ml-12">
                  {item?.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {/* Repeat the same pattern for other accordions */}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
