'use client';
import { Card, CardContent, Chip, Tooltip } from '@mui/material';
import { FaceIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getAllBlogsAll } from '../../../../components/Apis/blog';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Faq from 'components/Sections/Features/Faq';

function Blogs() {
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
  const [pageSize, setPageSize] = useState(6);
  const [blogToShow, setBlogToShow] = useState();
  const [loading, setLoading] = useState(true);

  const getAllBlog = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogsAll(pageSize);

      if (res) {
        setBlogData(res?.data.ref);
        setBlogToShow(res.data.totalItems);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    setPageSize((prevPageNumber) => prevPageNumber + 6);
  };

  useEffect(() => {
    getAllBlog();
  }, [pageSize]);

  return (
    <>
      <section className="bg-[#f3f1ee] ">
        <div className="container flex">
          <div className="flex flex-col justify-center gap-3 relative lg:pt-28 pt-20  lg:pb-14 pb-7 h-10vh lg:pl-0 ">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold leading-[1.1]">
              <span className="text-[#e86f3a]">All Blogs</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Card Listing */}
      <div className="container grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
        {blogsData?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between w-full rounded overflow-hidden mt-10"
            >
              <Link href={`/blog/${item?.seoLink}`}>
                <img
                  src={item?.thumbnail}
                  alt="Card Image"
                  className="w-full lg:w-full md:w-full  h-[260px]   md:h-[300px] object-cover rounded-md"
                />
              </Link>
              {/* <div className="py-3 w-11/12 md:w-11/12 "> */}
              <div className="py-3 w-full md:w-full  h-[17.2rem] md:h-[12.2rem]">
                <Link href={'/blog'}>
                  <div className="mb-2 block ">
                    <Chip
                      icon={<FaceIcon />}
                      component="a"
                      href="#basic-chip"
                      label={item?.type[0]?.title}
                    />
                  </div>
                </Link>
                <Link href={`/blog/${item?.seoLink}`}>
                  <Tooltip title={item?.title}>
                    <div className="font-black lg:text-base md:text-xl mb-1 ">
                      {item?.title}
                    </div>
                  </Tooltip>
                  <p className="text-gray-700 lg:text-sm text-sm">
                    {item?.description.slice(0, 160) + '...'}
                  </p>
                </Link>
              </div>
            </div>
          );
        })}

        {loading &&
          [...Array(3)].map((_, index) => (
            <Grid
              sx={{ mt: 8 }}
              item
              xs={10}
              sm={4}
              key={`card-skeleton-${index}-row-1`}
            >
              <Card>
                <Skeleton variant="rectangular" width="100%" height={300} />
                <CardContent>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}

        {loading &&
          [...Array(3)].map((_, index) => (
            <Grid item xs={10} sm={4} key={`card-skeleton-${index}-row-2`}>
              <Card>
                <Skeleton variant="rectangular" width="100%" height={300} />
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </div>

      {blogToShow > 6 && pageSize < blogToShow && (
        <div className="flex justify-center my-10">
          <button
            className="inline-block px-5 py-2 mx-auto text-black bg-[#fb8c00] rounded-full hover:text-white hover:bg-[#05686E] md:mx-0 transition ease-in-out duration-300"
            onClick={handleLoadMore}
          >
            Load More...
          </button>
        </div>
      )}
      <div className='mt-10 py-10'>
        <Faq/>
      </div>
    </>
  );
}

export default Blogs;
