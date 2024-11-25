'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getUserProfile } from 'components/Apis/login';
import Loading from 'components/Loading/Loading';
import { Analytics } from '@vercel/analytics/react';


// SEO 
const metadata = {
  title:{
    default:"Efficient Contract Management for Teams of Any Size with eSign, eStamp & Digital KYC | EaseDraft",
    template:"%s | EaseDraft"
  },
  description:
    'Experience Comprehensive Contract Automation and Management Solution with Digital KYC, eSign & Digital Stamp solutions. Seamlessly create, store, manage, and analyze all your contracts with efficiency, designed for businesses of every size. Book a free demo now to go paper-free contracts or agreements',
  image: 'image-url.jpg',
  card: 'summary_large_image',
  openGraph:{
    title: 'Custom Open Graph Title',
    description: 'Custom Open Graph Description',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Open Graph Title'",
    description: "ustom Twitter Description",
    // creator: "@author_name",
    // images: ["you_url_here"],
  },
};


export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getUserProfile(accessToken);
        console.log(res);
        if (res?.data?.roles[0]?.name === 'ROLE_ADMIN') {
          setAuthorized(true);
        } else {
          router.replace('https://sign.easedraft.com/dashboard');
        }
      } catch (error) {
        console.error('Failed to verify user', error);
        router.replace('https://sign.easedraft.com/dashboard');
      }
    };

    verifyUser();
  }, [accessToken, router]);

  if (!authorized) {
    return <Loading />;
  }

  return (
    <main>
      {children}
      <Analytics />
    </main>
  );
}
