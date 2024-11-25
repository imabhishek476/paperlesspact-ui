import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Box, Card, CardContent, CircularProgress, FormControl, Grid, MenuItem, Select, Skeleton, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  deleteBlog,
  getAllBlogs,
  getAllBlogsAll,
  publishBlog,
} from 'components/Apis/blog';
import DeleteModal from '../Dashboard/DeleteModal';
import Loading from '../../components/Loading/Loading';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, HardDriveUpload, Pencil, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {ThemeProvider, createTheme} from '@mui/material'
import { EasedraftTheme } from 'utils/Theme';

const Blogs = ({ totalBlog, setTotalBlog }) => {
  const theme = createTheme(EasedraftTheme);
  const router = useRouter();
  const [action, setAction] = useState({});
  const [loading, setLoading] = useState(true);
  const [Isloading, setIsLoading] = useState(false);
  const [blogsData, setBlogData] = useState(null);
  const [publishedBlog, setPublishedBlog] = useState(null);
  const [blogId, setBlogId] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(false)

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };


  const publishPost = async (id) => {
    setLoading(true)
    setUpdate((prev) => !prev)
    const res = publishBlog(id);
    if (res) {
      console.log(res);
    }
    setLoading(false)
  };
  const [page, setPage] = useState({
    size: 5,
    currentPage: 1,
    maxPage: 1,
  });
  const getblogs = async () => {
    const res = await getAllBlogs(page?.currentPage, page?.size);
    if (res) {
      console.log("hello", res);
      setBlogData(res?.data);
      setPage({
        ...page,
        maxPage: res?.data?.totalPages,
      });
      setPublishedBlog(res?.data?.publishBlogs)
      setTotalBlog(res?.data?.totalItems);
    }
    setLoading(false);
  };
  const handleNext = async (skip) => {
    if (page.currentPage === page.maxPage) {
      return;
    }
    setLoading(true)
    setUpdate((prev) => !prev)
    setPage({
      ...page,
      currentPage: page.currentPage + 1,
    });
    console.log(page?.currentPage + 1)
    console.log(page?.size)
    const response = await getAllBlogs(page?.currentPage + 1, page?.size);
    if (response) {
      setBlogData(response?.data);

    }
    setLoading(false)
  }
  const handlePrev = async (skip) => {
    if (page.currentPage === 1) {
      return;
    }
    setLoading(true)
    setUpdate((prev) => !prev)
    setPage({
      ...page,
      currentPage: page.currentPage - 1,
    });
    const response = await getAllBlogs(
      page.currentPage - 1,
      page.size
    );
    if (response) {
      setBlogData(response?.data)
    }
    setLoading(false)

  }
  const handleNav = (link) => {
    setIsLoading(true)
    router.push(`/blog/${link}`)

  }
  const handlePublish = (id) => {
    publishPost(id);
  }
  const handleEdit = (id) => {
    setIsLoading(true)
    router.push(`/blogs/edit?id=${id}`);
  }
  const handleDelete = (id) => {
    setBlogId(id);
    handleOpen();
  }
  const deleteBlogById = async () => {
    console.log("hi", blogId);
    if (blogId) {
      try {
        const res = await deleteBlog(blogId);
        if (res) {
          setSeverity('success');
          setSnackMessage("Blogs Deleted Successfully");
          setOpenSnack(true);
          handleClose();
          setUpdate((prev)=>!prev)
        }
      } catch (error) {
        console.error(error);
        setSeverity('error');
        setSnackMessage("Something Went Wrong");
        setOpenSnack(true);
      }
      
    }
  };
  useEffect(() => {
    getblogs();
  }, [update]);
  console.log(blogId)
  return (
    Isloading ? <Loading /> :
      <div>
        <ThemeProvider theme={theme}>
        <DeleteModal open={open} handleClose={handleClose}  setOpenSnack={setOpenSnack} deleteById={deleteBlogById} title={"Are you sure want to delete the blog?"}/>
        <section className="flex flex-col border-t">
          <div className=" flex flex-col items-center">
            <div className="w-full pb-5">
              <div className="flex flex-col gap-2 mt-5">

                {/* Create Blog  */}
                <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Total Blogs</h1>
                    <p>{loading ? <CircularProgress size={20} /> : totalBlog}</p>
                  </div>
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Published Blogs</h1>
                    <p>{loading ? <CircularProgress size={20} /> : publishedBlog}</p>
                  </div>
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Not Published Blogs</h1>
                    <p>{loading ? <CircularProgress size={20} /> : (totalBlog ? totalBlog : 0) - (publishedBlog)}</p>
                  </div>
                  <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                    <Button
                      className="w-full lg:w-fit"
                      onClick={() => { setIsLoading(true), router.push('/blogs/new') }}
                      size="lg"
                    >
                      Create Blog
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col">
                  {loading ? (
                    <div className="flex flex-row gap-3">
                      <div className="">
                        <Box sx={{ width: 300 }}>
                          <Skeleton />
                          <Skeleton animation="wave" />
                          <Skeleton animation={false} />
                        </Box>
                      </div>
                      <div className="">
                        <Box sx={{ width: 300 }}>
                          <Skeleton />
                          <Skeleton animation="wave" />
                          <Skeleton animation={false} />
                        </Box>
                      </div>
                      <div className="">
                        <Box sx={{ width: 300 }}>
                          <Skeleton />
                          <Skeleton animation="wave" />
                          <Skeleton animation={false} />
                        </Box>
                      </div>
                      <div className="">
                        <Box sx={{ width: 300 }}>
                          <Skeleton />
                          <Skeleton animation="wave" />
                          <Skeleton animation={false} />
                        </Box>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-12 bg-gray-200 px-2 py-4 border-b border-gray-950">
                        <div className="col-span-2 lg:col-span-1 font-semibold">Sno</div>
                        <div className="col-span-8 lg:col-span-6 font-semibold">Title</div>
                        <div className="col-span-2 hidden lg:grid font-semibold">Type</div>
                        <div className="col-span-2 hidden lg:grid font-semibold">Status</div>
                        <div className="col-span-2 lg:col-span-1 flex justify-end font-semibold">Action</div>
                      </div>
                      {blogsData?.userPosts && blogsData?.userPosts?.length > 0 ? (
                        <div className='flex flex-col min-h-[250px]'>
                          {blogsData?.userPosts?.map((item, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="hover:cursor-pointer grid grid-cols-12 bg-gray-200 px-2 py-3 border-b border-gray-700 items-center"
                                >
                                  <div onClick={() => handleNav(item?.seoLink)} className="col-span-2 lg:col-span-1">{index + 1 + page.currentPage * 5 - 5}</div>
                                  <div onClick={() => handleNav(item?.seoLink)} className="col-span-8 lg:col-span-6 ">
                                    <Tooltip title={item?.title} placement="bottom">
                                      <p className='w-40 md:w-96 truncate overflow-hidden'> {(item?.title)}</p>
                                      <p className="grid lg:hidden">
                                        {' '}
                                        {item?.type?.map((t) => t.title).join(', ')}
                                      </p>
                                    </Tooltip>
                                    {/* <p className="grid lg:hidden">
                                  {' '}
                                  {item?.type?.map((t) => t.title).join(', ')}
                                </p> */}
                                  </div>
                                  <div onClick={() => handleNav(item?.seoLink)} className="col-span-2 hidden lg:grid">
                                    {item?.type?.map((t) => t.title).join(', ')}
                                  </div>
                                  <div onClick={() => handleNav(item?.seoLink)} className="col-span-2 hidden lg:grid">
                                    {Number(item?.isPublished) === 0
                                      ? 'Saved'
                                      : 'Published'}
                                  </div>
                                  <div className="col-span-2 lg:col-span-1 flex justify-end">
                                    <Popover>
                                      <PopoverTrigger>
                                        <button
                                          className="bg-transparent hover:bg-transparent border-none shadow-none py-0"
                                        >
                                          <MoreHorizIcon sx={{ color: "black" }} />
                                        </button>
                                      </PopoverTrigger>
                                      <PopoverContent className=" max-w-[150px]">
                                        <div className='flex flex-col'>
                                          {Number(item?.isPublished) === 0 && <div onClick={() => handlePublish(item?._id)} className='flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2'>
                                            <HardDriveUpload size={15} />Publish
                                          </div>}
                                          <div onClick={() => handleEdit(item?._id)} className='flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 p-2'>
                                            <Pencil size={15} />Edit
                                          </div>
                                          <div onClick={()=>handleDelete(item?._id)} className='flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 p-2'>
                                            <Trash size={15} /> Delete
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>


                              </>
                            );
                          })}
                          < div className='flex flex-row items-end justify-end pt-5'>
                            <Button onClick={handlePrev} className='bg-gray-300 rounded-none text-black px-3'><ChevronLeft /></Button>
                            <Button className="rounded-none bg-gray-100 text-black border hover:bg-gray-200">{page.currentPage}</Button>
                            <Button onClick={handleNext} className="bg-gray-300 rounded-none text-black px-3"><ChevronRight /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center py-10">
                          <h1>No Blog Available</h1>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section >
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleCloseSnack}
          sx={{
            zIndex: 1000,
            mt: 10,
          }}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
        </ThemeProvider>
      </div >
  );
};

export default Blogs;
