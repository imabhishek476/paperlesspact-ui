'use client';
import Login from '../../../components/Auth/authPages/login';
import { Sheet, SheetContent, SheetHeader } from '../../../components/ui/sheet';
import { useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import {
  Album,
  Bird,
  BookMarked,
  Bookmark,
  Briefcase,
  Clapperboard,
  CreditCard,
  DollarSign,
  FileSignature,
  Fingerprint,
  Gavel,
  Landmark,
  Map,
  MoveRight,
  PenTool,
  Scale,
  ScrollText,
  Stamp,
  Stethoscope,
  Store,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/Loading/Loading';
import Blogs from './Blogs';
import Loading from '../../../components/Loading/Loading';

const theme = createTheme();
function FeatureGallery() {
  // const isBelow990px = useMediaQuery((theme) => theme?.breakpoints.down(990));
  const [open, isOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [actions, setAction] = useState(null);
  const accessToken = Cookies.get('accessToken');
  function handleRedirect(index) {
    console.log(index);
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
    if (!accessToken) {
      return isOpen(true);
    } else {
      console.log('hey', products[index].link);
      setLoading(true);
      window.location.href = products[index].link;
    }
  }
  const products = [
    {
      title: 'Legal',
      description:
        'Simplifying agreement management for lawyers, law firms, and clients.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Scale className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Accounting & Tax',
      description:
        'Streamlining contract management for financial professionals and their clients',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <ScrollText className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Banking & Finance',
      description:
        'Effortlessly managing loan agreements between clients and financial institutions.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Wallet className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Education',
      description:
        'Facilitating seamless contracts for educational institutions, teachers, and staff.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <BookMarked className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Entertainment & Media',
      description:
        'Simplifying agreements for media houses, movie production firms, and talent.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Clapperboard className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Freelances',
      description:
        'Making agreements easy between freelancers and diverse collaborative groups.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Bird className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Government',
      description:
        'Efficient contract management for government offices at all levels.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Landmark className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Non Profit',
      description:
        'Simplifying agreements for non-profit organizations and trusts',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <DollarSign className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Real Estate',
      description:
        'Streamlining contracts for builders, contractors, and property startups.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Map className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Health Care',
      description:
        'Making agreements hassle-free for healthcare professionals and facilities.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Stethoscope className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Retail',
      description: 'Simplifying agreements for retail businesses and outlets',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Store className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Others',
      description:
        'Handling diverse contracts between any parties efficiently.',
      cta: 'Try Now',
      link: 'https://sign.easedraft.com/dashboard',
      icon: <Bookmark className={`w-[40px] h-[40px]`} />,
    },
  ];
  const products2 = [
    {
      title: 'e-Sign',
      description:
        'Secure and streamlined electronic signature solutions for agreements.',
      cta: 'Try Now',
      badge: 'Trending',
      link: '/e-sign',
      icon: <FileSignature className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Agreement Management',
      description: 'Simplifying and organizing the lifecycle of agreements',
      cta: 'Try Now',
      link: '/agreement-management',
      icon: <Album className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Contract Management',
      description:
        'Effortlessly handling and overseeing contracts throughout their duration.',
      cta: 'Try Now',
      link: '/contract-management',
      icon: <Briefcase className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Aadhaar e-Sign',
      description:
        'Utilizing Aadhaar for secure and convenient electronic signatures.',
      cta: 'Try Now',
      link: '/aadhaar-sign',
      icon: <Fingerprint className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'e-Notary',
      description: 'Notarizing documents conveniently and securely online.',
      cta: 'Try Now',
      link: '/e-notary',
      disabled: 'true',
      badge: 'Coming Soon',
      icon: <PenTool className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Legal Notice',
      description:
        'Sending and managing legal notices efficiently through digital platforms.',
      cta: 'Try Now',
      link: '/legal-notice',
      disabled: 'true',
      badge: 'Coming Soon',
      icon: <Gavel sx={{ fontSize: 40 }} className={`w-[40px] h-[40px]`} />,
    },
    {
      title: 'Online e-Stamp',
      description:
        'Facilitating the process of obtaining stamp papers electronically for agreements.',
      cta: 'Try Now',
      link: '/e-stamp',
      disabled: 'true',
      badge: 'Coming Soon',
      icon: <Stamp className={`w-[40px] h-[40px]`} />,
    },
  ];
  const [active, setActive] = useState(false);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="container">
        <div className="lg:py-20 py-10 ">
          <div className="relative w-fit ">
            <h1 className='lg:text-3xl text-2xl after:content-[""] after:absolute relative after:left-full after:ml-2 after:top-1/2 after:-translate-y-1/2 lg:after:w-64 after:h-0.5 text-[#056a70ff] after:bg-[#056a70ff]'>
              Our Ease Solution
            </h1>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 lg:gap-5 gap-3">
            {products.map((e, i) => {
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(true)}
                  onMouseLeave={() => setActive(false)}
                  className={`border flex lg:flex-row flex-col-reverse gap-2 transition-all duration-75 lg:pt-4 p-3 lg:pb-3 lg:px-5  ${
                    !active ? 'opacity-100' : 'opacity-60'
                  } lg:aspect-video w-full ${
                    !active
                      ? 'shadow-[0_2px_4px_0_rgba(5,47,95,0.04),0_12px_16px_0_rgba(52,105,203,0.12)]'
                      : 'shadow-none'
                  } rounded-lg relative hover:shadow-[0_2px_4px_0_rgba(5,47,95,0.04),0_12px_16px_0_rgba(52,105,203,0.12)] hover:opacity-100 group`}
                >
                  {e.badge && (
                    <div
                      className={`absolute -top-4 px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !active ? 'bg-green-500' : 'bg-gray-500'
                      }  text-background`}
                    >
                      {e.badge}
                    </div>
                  )}
                  <div className="h-full w-full flex flex-col justify-between">
                    <div className="">
                      <h1 className="text-sm font-bold">{e.title}</h1>
                      <p className="text-sm mt-1 opacity-50 lg:flex hidden">
                        {e.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-1  group">
                      <button
                        href={''}
                        onClick={() => handleRedirect(i)}
                        className={`text-sm font-semibold ${
                          !active ? 'text-[#e86f3aff]' : 'text-gray-500'
                        } group-hover:grayscale-0 group-hover:text-[#056a70ff]`}
                      >
                        {e.cta}
                      </button>{' '}
                      <MoveRight
                        size={15}
                        className={`relative ${
                          !active ? 'text-[#e86f3aff]' : 'text-gray-500'
                        } group-hover:grayscale-0 group-hover:text-[#056a70ff] right-0 transition-all duration-75 group-hover:-right-1`}
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      !active ? 'grayscale-0' : 'grayscale'
                    } text-[#e86f3aff] relative -top-1 group-hover:grayscale-0 group-hover:text-[#056a70ff]`}
                  >
                    {e.icon}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-fit lg:mt-40 mt-20">
            <h1 className='lg:text-3xl text-2xl after:content-[""] after:absolute relative after:left-full after:ml-2 after:top-1/2 after:-translate-y-1/2 lg:after:w-64 after:h-0.5 text-[#056a70ff] after:bg-[#056a70ff]'>
              Our Products
            </h1>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 lg:gap-5 gap-3">
            {products2.map((e, i) => {
              return (
                <div
                  key={i}
                  onMouseEnter={() => {
                    setActive(true);
                  }}
                  onMouseLeave={() => setActive(false)}
                  className={`border flex lg:flex-row flex-col-reverse gap-2 transition-all duration-75 lg:pt-4 p-3 lg:pb-0 pb-3 lg:px-5  ${
                    !active ? 'opacity-100' : 'opacity-60'
                  } lg:aspect-video w-full ${
                    !active
                      ? 'shadow-[0_2px_4px_0_rgba(5,47,95,0.04),0_12px_16px_0_rgba(52,105,203,0.12)]'
                      : 'shadow-none'
                  } rounded-lg group relative ${
                    e?.disabled
                      ? 'hover:shadow-none hover:text-gray-500'
                      : 'hover:shadow-[0_2px_4px_0_rgba(5,47,95,0.04),0_12px_16px_0_rgba(52,105,203,0.12)]'
                  } hover:opacity-100 group`}
                >
                  {e.badge && (
                    <div
                      className={`absolute -top-4 ${
                        e?.disabled
                          ? 'opacity-0 group-hover:opacity-100 transition-all duration-500'
                          : ''
                      } group-hover:bg-green-500  px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !active ? 'bg-green-500' : 'bg-gray-500'
                      }  text-background`}
                    >
                      {e.badge}
                    </div>
                  )}
                  <div className="h-full w-full flex flex-col justify-between">
                    <div className="">
                      <h1 className="text-sm font-bold">{e.title}</h1>
                      <p className="text-sm mt-1 opacity-50 lg:flex hidden">
                        {e.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 lg:mb-3 ">
                      <Link
                        href={e?.disabled ? '' : e.link}
                        className={`text-sm font-semibold ${
                          !active ? 'text-[#e86f3aff]' : 'text-gray-500'
                        } group-hover:grayscale-0 ${
                          e?.disabled
                            ? 'group-hover:text-gray-500'
                            : 'group-hover:text-[#056a70ff]'
                        }`}
                      >
                        {e.cta}
                      </Link>{' '}
                      <MoveRight
                        size={15}
                        className={`relative ${
                          !active ? 'text-[#e86f3aff]' : 'text-gray-500'
                        } group-hover:grayscale-0 ${
                          e?.disabled
                            ? 'group-hover:text-gray-500'
                            : 'group-hover:text-[#056a70ff]'
                        } right-0 transition-all duration-75 group-hover:-right-1`}
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      !active ? 'grayscale-0' : 'grayscale'
                    } text-[#e86f3aff] relative -top-1 group-hover:grayscale-0 ${
                      e?.disabled
                        ? 'group-hover:text-gray-500'
                        : 'group-hover:text-[#056a70ff]'
                    }`}
                  >
                    {e.icon}
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>

      <ThemeProvider theme={theme}>
        <Sheet open={open} onOpenChange={isOpen}>
          <SheetContent
            side={'right'}
            className="lg:max-w-[40vw] max-w-[100vw] w-full"
          >
            <SheetHeader>
              <Login
                noredirect={true}
                form={{
                  actions,
                  files,
                }}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </ThemeProvider>
    </div>
  );
}

export default FeatureGallery;
