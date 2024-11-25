'use client';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../../../../../components/Loading/Loading';
import Cookies from 'js-cookie';
// import { Button, Link } from '@mui/material';
// import { Button } from "@nextui-org/react";

function SocialButtons({ noredirect, form }) {
  // async function handleSignin() {
  // 	const response = await fetch(
  // 		"https://api.easedraft.com/oauth2/authorize/google?redirect_uri=https://api.easedraft.com/oauth2/redirect"
  // 	);
  // 	const data = await response.json();
  // 	console.log(data);
  // }
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  async function handleRedirect() {
    console.log(noredirect, form);
    if (!noredirect) {
      if (form) {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');

        var formdata = new FormData();
        form.files.map((e, i) => {
          formdata.append(`files`, form.files[i], `${form.files[i].name}`);
        });
        formdata.append('participants', form.actions);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        const data = await fetch(
          'https://api.lawinzo.com/node/legalAgreement/addAgreementWithOrphan',
          requestOptions
        );

        const json = await data.json();
        const agreement = json.data;
        console.log(json);
        if (json.success) {
          setIsLoading(true);
          router.push(
            `https://api.easedraft.com/oauth2/authorize/google?redirect_uri=https://api.easedraft.com/oauth2/redirect?id=${agreement._id}`
          );
        } else {
          router.push(
            'https://api.easedraft.com/oauth2/authorize/google?redirect_uri=https://api.easedraft.com/oauth2/redirect'
          );
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        router.push(
          'https://api.easedraft.com/oauth2/authorize/google?redirect_uri=https://api.easedraft.com/oauth2/redirect'
        );
      }
    } else {
      console.log('trigg');
      setIsLoading(false);
      router.push(
        'https://api.easedraft.com/oauth2/authorize/google?redirect_uri=https://api.easedraft.com/oauth2/redirect'
      );
    }
  }
  return loading ? (
    <Loading />
  ) : (
    <div className="mb-5">
      <Stack
        direction={{ xs: 'row', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Button
          onClick={handleRedirect}
          type="submit"
          className="bg-red-500 flex items-center gap-3 hover:bg-red-600 text-white rounded w-full py-5"
          // color="error"
        >
          <GoogleIcon color="inherit" />
          Sign in with Google
        </Button>
      </Stack>
    </div>
  );
}

export default SocialButtons;
