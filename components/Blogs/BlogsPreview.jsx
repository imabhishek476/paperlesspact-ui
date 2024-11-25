'use client'
import Avatar from '@mui/material/Avatar';
import { Link } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { Linkedin } from 'lucide-react';
import { getBlogByLink, getBlogsByIds } from '../Apis/blog';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {formatDate} from '../../utils/TimeDateHelper'
import Loading from 'components/Loading/Loading';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogsPreview = ({slug}) => {
    const [isLoading,setIsLoading]=useState(true)
    const [blogsData, setBlogData] = useState(null);
    const router=useRouter()
    const getblogs = async () => {
      const res = await getBlogByLink(slug);
      if (res) {
        console.log(res)
        setBlogData(res?.data);
      }
      setIsLoading(false)
    };
    useEffect(() => {
      getblogs();
    }, [slug]);
  
    return (
      isLoading? <Loading />:
      <div div className="min-h-screen">
        <section className=" bg-[#f3f1ee] max-w-full overflow-hidden relative md:h-full pt-28 pb-5">
          <div className='flex flex-col-reverse gap-5 lg:flex-row justify-between container items-center py-10'>
            <div className='flex flex-col gap-5'>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link sx={{color:"#05686E"}} className='text-[#05686E]' href="/blog">
                  Blog
                </Link>,
                {/* <Link
                  className='text-[#05686E]'
                  href="/blog"
                >
                  {blogsData?.type[0]?.title}
                </Link>, */}
                <div
                  className='text-black'
                >
                  {blogsData?.title}
                </div>,
              </Breadcrumbs>
              <h1 className='text-2xl lg:text-4xl leading-[30px] lg:leading-[60px]'> {blogsData?.title}</h1>
              <div className="flex items-center">
                <div className="w-12">
                <Avatar sx={{ bgcolor: '#05686E',color:"white" }} alt={blogsData?.user} src={blogsData?.authorProfile} >{blogsData?.user?.slice(0,1)}</Avatar>
                </div>
                <i className="md:ml-2 text-gray-700 text-base md:text-sm">
                  By {blogsData?.user} <i>• {formatDate(blogsData?.createdAt)}</i>
                </i>
                <div className="ml-[0.4rem] bg-[#0077b5] py-1 px-1 rounded-full text-white border-blue-100">
                {blogsData?.userSocial ?  <Linkedin onClick={()=>router.push(blogsData?.userSocial)} className='hover:cursor-pointer' size={12} /> :"" }  
                </div>
              </div>
            </div>
            <div className=''>
              <img
                src={blogsData?.thumbnail}
                alt="Image"
                className="object-contain  "
              />
            </div>
          </div>
        </section>
        <div className="container flex justify-center items-start pt-20">
          <div id="yourContainerId" className="w-full flex mt-20 flex-col gap-y-10" dangerouslySetInnerHTML={{ __html: blogsData?.htmlContent }}>
          </div>
        </div>
        <div className="border-b-2 border-black-500 my-10"></div>
      </div>
    );
}

export default BlogsPreview
