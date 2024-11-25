'use client';
import React, { useState } from 'react';
import {
  Album,
  BookMarked,
  Briefcase,
  FileCheck2,
  FileSignature,
  Scale,
  ScanEye,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import Form from '../Forms/HeroForms/Form';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const servicesMobile = [
  {
    title: 'e-Sign',
    icon: <FileSignature size={34} />,
    link: '/mobile',
  },
  {
    title: 'Contract Management',
    icon: <Briefcase size={34} />,

    link: '/mobile/contract-management',
  },
  {
    title: 'Adhaar e-Sign',
    icon: <ScanEye size={34} />,
    link: '/mobile/aadhaar-sign',
    badge: 'For India',
  },
  {
    title: 'e-Notary',
    icon: <FileCheck2 size={34} strokeWidth={1} />,
    link: '/e-notary',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Legal Notice',

    icon: <Scale size={34} strokeWidth={1} />,
    link: '/legal-notice',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Online e-Stamp',

    icon: <BookMarked size={34} strokeWidth={1} />,
    link: '/e-stamp',

    badge: 'For India',
    disabled: true,
  },
];
const services = [
  {
    title: 'e-Sign',
    icon: <FileSignature size={34} />,
    link: '/e-sign',
  },
  {
    title: 'Contract Management',
    icon: <Briefcase size={34} />,

    link: '/contract-management',
  },
  {
    title: 'Aadhaar e-Sign',
    icon: <ScanEye size={34} />,
    link: '/aadhaar-sign',
    badge: 'For India',
  },
  {
    title: 'e-Notary',
    icon: <FileCheck2 size={34} strokeWidth={1} />,
    link: '/e-notary',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Legal Notice',

    icon: <Scale size={34} strokeWidth={1} />,
    link: '/legal-notice',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Online e-Stamp',
    icon: <BookMarked size={34} strokeWidth={1} />,
    link: '/e-stamp',
    badge: 'For India',
    disabled: true,
  },
];

const forms = [
  {
    actions: [
      {
        title: 'One Way',
      },
      {
        title: 'Round Trip',
      },
      {
        title: 'Multi City',
      },
    ],
  },
];
const theme = createTheme();

function FormNav({ setLoading }) {
  const path = usePathname();
  const router = useRouter();
  const [action, setAction] = useState(forms[0].actions[0].title);
  return (
    <div className="lg:px-14 lg:pt-24 relative lg:bg-background w-full lg:min-h-[45vh] rounded-lg">
      <div className="lg:w-auto  w-full lg:px-16 lg:h-32 lg:absolute left-1/2 lg:-translate-x-1/2 border rounded-lg shadow-lg lg:-top-16 bg-white lg:flex hidden grid-cols-3 lg:gap-12 gap-5 lg:items-baseline lg:pt-5 p-5 justify-center">
        {services.map((e, i) => {
          console.log(path);
          if (path === e.link || path === '/') {
            // console.log(path==="/" && i===0  )
            // console.log(i)
            // console.log(path)
            if (path === '/' && i === 0) {
              console.log('in');
              return (
                <Link
                  key={i}
                  href={e.link}
                  className="flex flex-col text-[#056a70ff] justify-center gap-2 items-center lg:w-[80px]"
                >
                  {/* {e.badge ? <></> : <div className="mt-6 lg:hidden"></div>} */}
                  {e.badge && (
                    <h3 className="lg:absolute lg:-top-3 px-2 py-0.5 rounded-full text-sm bg-[#e86f3aff] text-background ">
                      {e.badge}
                    </h3>
                  )}
                  {e.icon}
                  <p
                    className={`font-black text-sm leading-none text-[#056a70ff] text-center mt-2`}
                  >
                    {e.title}
                  </p>
                  <div className="absolute lg:inline hidden bottom-0 h-1 w-[80px] bg-[#056a70ff]"></div>
                </Link>
              );
            }
            if (path === e.link) {
              console.log('out');
              return (
                <Link
                  key={i}
                  href={e.link}
                  className="flex flex-col text-[#056a70ff] justify-center gap-2 items-center lg:w-[80px]"
                >
                  {/* {e.badge ? <></> : <div className="mt-6 lg:hidden"></div>} */}
                  {e.badge && (
                    <h3 className="lg:absolute lg:-top-3 px-2 py-0.5 rounded-full text-sm bg-[#e86f3aff] text-background ">
                      {e.badge}
                    </h3>
                  )}
                  {e.icon}
                  <p
                    className={`font-black text-sm leading-none text-[#056a70ff] text-center mt-2`}
                  >
                    {e.title}
                  </p>
                  <div className="absolute lg:inline hidden bottom-0 h-1 w-[80px] bg-[#056a70ff]"></div>
                </Link>
              );
            }
          }
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    key={i}
                    disabled={e?.badge}
                    href={e?.disabled ? '' : e.link}
                    className={`flex ${
                      e?.disabled ? 'cursor-default' : 'opacity-100'
                    } flex-col lg:justify-center gap-2 items-center lg:w-[80px]`}
                  >
                    {/* {e.badge ? <></> : <div className="mt-6 lg:hidden"></div>} */}
                    {e.badge && (
                      <h3
                        className={`${
                          e?.disabled ? 'bg-[#5e5d5d]' : 'bg-[#e86f3aff]'
                        } opacity-100 lg:absolute lg:-top-3 px-2 py-0.5 rounded-full text-sm  text-background `}
                      >
                        {e.badge}
                      </h3>
                    )}
                    <span
                      className={`flex ${
                        e?.disabled
                          ? 'opacity-50 cursor-default'
                          : 'opacity-100'
                      } flex-col lg:justify-center gap-2 items-center lg:w-[80px]`}
                    >
                      {e.icon}
                      <p className="font-medium text-sm leading-none text-center mt-2">
                        {e.title}
                      </p>
                    </span>
                  </Link>
                </TooltipTrigger>
                {e.disabled && (
                  <TooltipContent className="absolute lg:inline hidden top-20 -left-12 w-fit whitespace-nowrap">
                    <p className="text-background">Coming Soon</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* <div className="px-5 lg:inline hidden">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            {forms[0].actions.map((e, i) => {
              console.log(action === e.title);
              return (
                <div
                  key={i}
                  className={`flex gap-1.5 ${
                    action === e.title ? 'bg-blue-200' : ''
                  } relative items-center p-1 px-3 rounded-full border`}
                >
                  <input
                    onChange={(ev) => {
                      if (ev.target.checked) {
                        return setAction(e.title);
                      }
                    }}
                    type="checkbox"
                    checked={action === e.title}
                    className="w-3"
                  />
                  <label htmlFor="" className="text-sm">
                    {e.title}
                  </label>
                </div>
              );
            })}
          </div>
          <p>Book International and Domestic Flights</p>
        </div>
      </div> */}
      <ThemeProvider theme={theme}>
        <Form setLoading={setLoading} />
      </ThemeProvider>
    </div>
  );
}

export default FormNav;
