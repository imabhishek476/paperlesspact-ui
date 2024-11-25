import { getUserProfile } from '@/Apis/login';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Switch,
  User,
} from '@nextui-org/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Card from './Card';
import { useEnv } from '../Hooks/envHelper/useEnv';
import { Alert, Snackbar } from '@mui/material';

const UpgradePage = ({ data }) => {
  const [details, setDetails] = useState(null);
  const [isYearly, setIsYearly] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const accessToken = Cookies.get('accessToken');
  const router = useRouter();
  const inDevEnvironment = useEnv();
  const logOut = () => {
    if (inDevEnvironment) {
      Cookies.remove('accessToken');
      Cookies.remove('assignedRole');
      Cookies.remove('isLoggedIn');
      Cookies.remove('onbording');
      console.log('in me');
    } else {
      Cookies.remove('accessToken', { domain: '.easedraft.com' });
      Cookies.remove('assignedRole', { domain: '.easedraft.com' });
      Cookies.remove('isLoggedIn', { domain: '.easedraft.com' });
      Cookies.remove('onbording', { domain: '.easedraft.com' });
      console.log('in me');
    }
    router.reload();
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(accessToken);
        setDetails(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="lg:px-[35px] lg:pl-24  px-3">
        <section className="w-full flex flex-col items-center justify-center min-h-[200px] ">
          <div className="flex flex-col items-center justify-center  lg:max-w-[350px] pb-6">
            <h3 className="text-[26px] font-semibold pb-4 text-[#05686E]">
              {data?.title}
            </h3>
            <span className="text-[18px]">{data?.subtitle}</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="cursor-pointer" onClick={() => setIsYearly(false)}>
              Montly
            </span>
            <Switch
              color="secondary"
              size="sm"
              isSelected={isYearly}
              onValueChange={setIsYearly}
            />
            <span className="cursor-pointer" onClick={() => setIsYearly(true)}>
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
        <section className=" md:flex flex-nowrap gap-4 items-stretch align-middle justify-center w-full px-10 ">
          {data?.data?.map((item, index) => {
            return (
              <div key={index} className="my-4 md:my-0 flex justify-center">
                <Card
                  item={item}
                  key={index}
                  quoteType={isYearly ? 'Yearly' : 'Monthly'}
                  index={index}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarMsg={setSnackbarMsg}
                />
              </div>
            );
          })}
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-6 ">
          <div className="flex flex-col items-center justify-center lg:max-w-[350px] pb-6">
            <span className="text-[18px]">
              Prices exclude any applicable taxes.
            </span>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpgradePage;
