import { Analytics } from "@vercel/analytics/react";
export const metadata = {
    title:{
      default:"Efficient Contract Management for Teams of Any Size with eSign, eStamp & Digital KYC | EaseDraft",
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
      description: "Custom Twitter Description",
      // images: [{ url: "Custom twitter img", width: 1200, height: 630 }],
    },
  };
export default async function AadharLayout({ children }) {
    return (
        <main>
            {children}
            <Analytics />
        </main>
    );
}