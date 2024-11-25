'use client';
import React, { useState } from 'react';
import Card from './Card';
import { ThemeProvider, createTheme } from '@mui/material';
import { Switch } from '../../../components/ui/switch';
import Faq from '../Features/Faq';

const PricingComponent = ({ data }) => {
  const [isYearly, setIsYearly] = useState(true);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#151513',
      },
      secondary: {
        main: '#E8713C',
      },
    },
  });
  return (
    <div className="container">
      <div className="lg:py-20 py-10 mt-10 ">
        <ThemeProvider theme={theme}>
          <section className="w-full flex flex-col items-center justify-center min-h-[200px] ">
            <div className="flex flex-col items-center justify-center pb-6 my-4">
              <h3 className="text-[30px] md:text-[40px] font-bold pb-4 text-[#05686E]">
                {data?.title}
              </h3>
              <span className="text-[12px] md:text-[24px]">
                {data?.subtitle}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span
                className="cursor-pointer"
                onClick={() => setIsYearly(false)}
              >
                Montly
              </span>
              <Switch
                // color="secondary"
                // size="sm"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span
                className="cursor-pointer"
                onClick={() => setIsYearly(true)}
              >
                Yearly
              </span>
              {isYearly ? (
                <span className="font-medium text-white text-[16px] rounded-md border  bg-[#05686E] px-2 py-1 ">
                  Save up to {data?.discount}%
                </span>
              ) : (
                <span className="font-medium text-white text-[16px] rounded-md border  bg-[#05686E50] px-2 py-1 ">
                  Save up to {data?.discount}%
                </span>
              )}
            </div>
          </section>
          <div className="md:flex flex-nowrap gap-4 items-stretch align-middle justify-center w-full mt-10">
            {data?.data?.map((item, index) => {
              return (
                <div key={index} className="my-4 md:my-0 flex justify-center">
                  <Card
                    item={item}
                    key={index}
                    quoteType={isYearly ? 'Yearly' : 'Monthly'}
                    // quoteType={'Monthly'}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
          <section className="w-full flex flex-col items-center justify-center mt-6 mb-10">
            <div className="flex flex-col items-center justify-center lg:max-w-[350px] pb-6">
              <span className="text-[16px]">
                Prices exclude any applicable taxes.
              </span>
            </div>
            <div className="flex flex-col items-center justify-center  pb-6">
              <h3 className="text-[26px] md:text-[40px] font-semibold pb-4 text-[#05686E]">
                {data.faqTitle || 'Questions? We have answers.'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch justify-center pb-6 px-5 md:px-10">
              {data?.faq?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="my-4 md:my-0 flex flex-col lg:max-w-[350px] justify-start"
                  >
                    <span className="font-bold pb-2 text-[18px]">
                      {item.title}
                    </span>
                    <span className="text-[16px] font-light">{item.body}</span>
                  </div>
                );
              })}
            </div>
          </section>
          <Faq/>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PricingComponent;
