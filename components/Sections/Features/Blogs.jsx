'use client';
import { Face } from '@mui/icons-material';
import { CardContent, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import { FaceIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getAllBlogsAll } from '../../Apis/blog';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from '@mui/material/Skeleton';


function Blogs() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const links = [
    {
      title: 'Heading-1',
      slug: '/From Big Law to Business Impact with Mine Ekim, Managing Director, Legal & Compliance, Golden Gate Global',
    },
    {
      title: 'Heading-2',
      slug: '/Blending Legal Expertise and Business Acumen with Genevieve Kelly',
    },
    {
      title: 'Heading-3',
      slug: '/Step By Step Guide: How to Create an Effective Contract Clause Library',
    },
  ];

  const [blogsData, setBlogData] = useState([]);
  const getAllBlog = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogsAll(3);

      if (res) {
        console.log(res.data.ref);
        setBlogData(res?.data.ref);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <>
      <div className="container">
      {blogsData?.length > 0 && (
        <div className="lg:pb-20 pb-10">
          <div className='flex flex-row justify-between mb-10 '> {/* lg:mt-10 mt-5 */}
          <div className="flex flex-row gap-2">
          <h1 className='lg:text-3xl text-2xl after:content-[""] after:absolute relative after:left-full after:ml-2 after:top-1/2 after:-translate-y-1/2 lg:after:w-64 after:h-0.5 text-[#056a70ff] after:bg-[#056a70ff]'>
            Our Blogs
          </h1>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-[#fb8c00] rounded-md border text-white md:mr-5 transition ease-in-out duration-300 hover:bg-[#05686E]"
            onClick={() => router.push('/blog')}
          >
            View All
          </button>
        </div>
          </div>
        
       
        

      {/* Blog Type Listing */}
      {/* <div className="md:flex flex justify-center"> */}
        {/* <div
          role="list"
          className="w-11/12 mt-10 gap-x-4 gap-y-6 flex-wrap justify-center items-start flex"
        >
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              All Blogs
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl recent-blogs-card-tag tags-page inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
          <div role="listitem" className="w-dyn-item">
            <a
              href="#"
              className="shadow-xl recent-blogs-card-tag tags-page inline-block py-2 px-4 bg-[#e8713c] text-black rounded-full transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white text-sm"
              data-faitracker-click-bind="true"
            >
              Contract Management
            </a>
          </div>
        </div> */}
      {/* </div> */}

      {/* Card Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
            {loading &&
              [...Array(3)].map((_, index) => (
              <div className='grid gap-2'>
                    <div className='grid lg:col-span-4 col-span-10'>
                      <Card>
                        <Skeleton variant="rectangular" width="100%" height={300} />
                        <CardContent>
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="40%" />
                        </CardContent>
                      </Card>
                    </div>
              </div>
              ))}

        {blogsData?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between w-full rounded overflow-hidden"
            >
              <Link href={`/blog/${item?.seoLink}`}>
                <img
                  src={item?.thumbnail}
                  alt="Card Image"
                  // className="w-[260px] h-[260px] md:w-[328px] md:h-[300px] object-cover rounded-md"
                  className="w-full lg:w-full md:w-full  h-[260px]  md:h-[300px] object-cover rounded-md"
                />
              </Link>
              {/* <div className="py-3 w-[16.2rem] md:w-[20.2rem] h-[17.2rem] md:h-[18.2rem]"> */}
              <div className="py-3 w-full md:w-full  h-[17.2rem] md:h-[12.2rem]">

                <Link href={'/blog'}>
                  <div className="mb-2 block mt-3">
                    <Chip
                      icon={<FaceIcon />}
                      component="a"
                      href="#basic-chip"
                      label={item?.type[0]?.title}
                    />
                  </div>
                </Link>
                <Link href={`/blog/${item?.seoLink}`}>
                  <div className="font-black lg:text-base md:text-xl mb-1 ">
                    {item?.title}
                  </div>
                  <p className="text-gray-700 lg:text-sm text-sm">
                    {item?.description.slice(0, 160) + '...'}
                  </p>
                </Link>
              </div>
            </div>
          );
        })}


         </div>
         </div>
      )}
      </div>
    </>
  );
}

export default Blogs;
