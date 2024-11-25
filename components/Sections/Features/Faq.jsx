'use client';
import React, { useEffect, useState } from 'react';
import { getAllFaq } from 'components/Apis/faq';
import { Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';

const Faq = () => {
  const [allFaq, setAllFaq] = useState([]);
  const pathname = usePathname();

  const getAllFaqs = async () => {
    try {
      const res = await getAllFaq();
      if (res) {
        const data = res?.data?.data?.ref;

        let filterFaq;
        if(pathname === '/'){
          filterFaq = data.filter((item) => item?.page?.title === 'Home');
        }
        if(pathname === '/about-us'){
          filterFaq = data.filter((item) => item?.page?.title === 'About Us');
        }
        if(pathname === '/dashboard'){
          filterFaq = data.filter((item) => item?.page?.title === 'Admin Dashboard');
        }
        if(pathname === '/blog'){
          filterFaq = data.filter((item) => item?.page?.title === 'Blog');
        }
        if(pathname === '/pricing'){
          filterFaq = data.filter((item) => item?.page?.title === 'Pricing');
        }
        if(pathname === '/contract-management'){
          filterFaq = data.filter((item) => item?.page?.title === 'Contract Management');
        }
        if(pathname === '/aadhaar-sign'){
          filterFaq = data.filter((item) => item?.page?.title === 'Aadhaar e-sign');
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
        {allFaq?.length > 0 && (
          <div className="lg:pb-20 pb-10">
            <div className="flex flex-row gap-2 mb-10">
              <h1 className='lg:text-3xl text-2xl after:content-[""] after:absolute relative after:left-full after:ml-2 after:top-1/2 after:-translate-y-1/2 lg:after:w-64 after:h-0.5 text-[#056a70ff] after:bg-[#056a70ff]'>
                FAQs
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
              {allFaq?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col text-black rounded-md border-[0.4px] border-gray-200 px-6 py-6 w-full h-full"
                >
                  <div className="text-lg font-bold">{item?.title}</div>
                  <div className="text-md mt-1 opacity-70">
                    {/* <Tooltip title={item?.message} placement="bottom"> */}
                    {item?.message}
                    {/* </Tooltip> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
