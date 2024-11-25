import React from 'react'
import BlogsPreview from '../../../../../components/Blogs/BlogsPreview'
import { getBlogByLink } from 'components/Apis/blog';
export async function generateMetadata({ params}) {
  // console.log(params)
  const res = await getBlogByLink(params?.slug);
  // console.log(res)
  return {
    title: res?.data?.title,
    description:res?.data?.description
  }
}
function Blogs({ params: { slug } }) {
  return (
    <BlogsPreview slug={slug} />
  );
}

export default Blogs;

