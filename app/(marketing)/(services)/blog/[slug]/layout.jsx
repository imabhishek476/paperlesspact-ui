
import { Analytics } from "@vercel/analytics/react";
import { getBlogByLink } from "components/Apis/blog";
export async function generateMetadata({ params}) {
    // console.log(params)
    const res = await getBlogByLink(params?.slug);
    // console.log(res)
    return {
      title: res?.data?.title,
      description:res?.data?.description,
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
    }
  }

export default async function BlogByIdLayout({ children }) {
    return (
        <main>
            {children}
            <Analytics />
        </main>
    );
}