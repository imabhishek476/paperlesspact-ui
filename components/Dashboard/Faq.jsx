'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '../ui/button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import {ThemeProvider, createTheme} from '@mui/material'
import { EasedraftTheme } from 'utils/Theme';

import {
  Autocomplete,
  Modal,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Tooltip,
  TextareaAutosize,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import {
  deleteBlog,
  // getAllBlogs,
  getAllBlogsAll,
  publishBlog,
} from 'components/Apis/blog';
import { getFaq, postFaq } from 'components/Apis/faq';
import DeleteFaqModal from '../Dashboard/DeleteFaqModal';
import UpdateFaqModal from './UpdateFaqModal';
import FaqModal from './FaqModal';
import Loading from '../../components/Loading/Loading';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  HardDriveUpload,
  Pencil,
  Trash,
} from 'lucide-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4, // Rounded corners
  '@media (max-width: 600px)': {
    width: '100%',
  },
};

const AdminFaq = ({ totalFAQ, setTotalFAQ }) => {
  const theme = createTheme(EasedraftTheme);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  const router = useRouter();
  const [action, setAction] = useState({});
  const [loading, setLoading] = useState(true);
  const [Isloading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState(null);
  const [blogsData, setBlogData] = useState(null);
  const [publishedBlog, setPublishedBlog] = useState(null);
  const [blogId, setBlogId] = useState('');
  const [faqId, setFaqId] = useState('');
  const handleOpen = () => setOpen(true);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const [update, setUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const publishPost = async (id) => {
    setLoading(true);
    setUpdate((prev) => !prev);
    const res = publishBlog(id);
    if (res) {
      // console.log(res);
    }
    setLoading(false);
  };

  const handleEdit = (id) => {
    setFaqId(id);

    let timer;

    timer = setTimeout(()=>{
      handleOpenUpdate();
      return;
    },300)
    return ()=>{
      clearTimeout(timer)
    }
  };
  const handleDelete = (id) => {
    setFaqId(id);
    handleOpen();
    return;
  };

  // const handleChangeAction = (index, newValue) => {
  //   console.log('index', index);
  //   setAction({
  //     ...action,
  //     [index]: newValue,
  //   });
  //   setFaqId(index);
  //   // if (newValue === 10) {
  //   //   publishPost(index);
  //   // }
  //   if (newValue === 30) {
  //     handleOpen();
  //     newValue = 0;
  //     return;
  //   }
  //   if (newValue == 20) {
  //     handleOpenUpdate();
  //     newValue = 0;
  //     return;
  //   }
  // };
  const [page, setPage] = useState({
    size: 5,
    currentPage: 1,
    maxPage: 1,
  });

  const getAllFaq = async () => {
    const res = await getFaq(page?.currentPage, page?.size);
    console.log(res);
    if (res) {
      console.log(res);
      setFaqData(res?.data?.ref);
      setPage({
        ...page,
        maxPage: res?.data?.totalPages,
      });
      // setPublishedBlog(res?.data?.publishBlogs);
      setTotalFAQ(res?.data?.totalItems);
    }
    setLoading(false);
  };
  const handleNext = async (skip) => {
    if (page.currentPage === page.maxPage) {
      return;
    }
    setLoading(true);
    setUpdate((prev) => !prev);
    setPage({
      ...page,
      currentPage: page.currentPage + 1,
    });
    console.log(page?.currentPage + 1);
    console.log(page?.size);
    const response = await getFaq(page?.currentPage + 1, page?.size);
    if (response) {
      setFaqData(response?.data);
    }
    setLoading(false);
  };
  const handlePrev = async (skip) => {
    if (page.currentPage === 1) {
      return;
    }
    setLoading(true);
    setUpdate((prev) => !prev);
    setPage({
      ...page,
      currentPage: page.currentPage - 1,
    });
    const response = await getFaq(page.currentPage - 1, page.size);
    if (response) {
      setBlogData(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllFaq();
  }, [update]);


  return Isloading ? (
    <Loading />
  ) : (
    <>
      <ThemeProvider theme={theme}>
        <DeleteFaqModal
          setUpdate={setUpdate}
          open={open}
          handleClose={handleClose}
          faqId={faqId}
          setSnackMessage={setSnackMessage}
          setSeverity={setSeverity}
          setOpenSnack={setOpenSnack}
        />
        <UpdateFaqModal
          openModal={openUpdate}
          closeModal={handleCloseUpdate}
          faqId={faqId}
          setUpdate={setUpdate}
          setSnackMessage={setSnackMessage}
          setSeverity={setSeverity}
          setOpenSnack={setOpenSnack}
        />
        <section className="flex flex-col">
          <div className=" flex flex-col items-center ">
            <div className="w-full pb-5">
              <div className="flex flex-col gap-2 mt-5">
                {/* Create Blog  */}
                <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Total FAQ</h1>
                    <p>{loading ? <CircularProgress size={20} /> : totalFAQ}</p>
                  </div>

                  <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                    <Button
                      className="w-full lg:w-fit"
                      onClick={openModal}
                      size="lg"
                    >
                      Create FAQ
                    </Button>

                    {/* Modal  */}
                    <FaqModal
                      closeModal={closeModal}
                      openModal={isModalOpen}
                      onSubmit={getAllFaq}
                      setSnackMessage={setSnackMessage}
                      setSeverity={setSeverity}
                      setOpenSnack={setOpenSnack}
                      setUpdate={setUpdate}
                    />
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
                      {/* <div className="grid grid-cols-12 bg-gray-200 px-2 py-4 border-b border-gray-950">
                      <div className="col-span-2 lg:col-span-1 font-semibold">
                        Sno
                      </div>
                      <div className="col-span-6 lg:col-span-6 font-semibold">
                        Title
                      </div>
                      <div className="col-span-2 lg:col-span-2 font-semibold">
                        Page
                      </div>
                      <div className="col-span-2 lg:col-span-2 flex justify-end font-semibold">
                        Action
                      </div>
                    </div> */}

                      {!loading && faqData && faqData?.length > 0 ? (
                        <div className="flex flex-col min-h-[250px]">
                          {faqData?.map((item, index) => {
                            return (
                              <>
                                <Accordion
                                  sx={{ backgroundColor: '#eee' }}
                                  key={index}
                                  expanded={expanded === index}
                                  onChange={handleChange(index)}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                  >
                                    <Typography
                                      className="hidden"
                                      sx={{ width: ' 6%', flexShrink: 0 }}
                                    >
                                      {index + 1 + page.currentPage * 5 - 5}
                                    </Typography>
                                    <Typography
                                      sx={{ width: '54%', flexShrink: 0 }}
                                    >
                                      {item?.title}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        width: '30%',
                                        color: 'text.secondary',
                                      }}
                                    >
                                      <Chip
                                        className="!rounded-full"
                                        sx={{
                                          backgroundColor: 'transparent',
                                          border: '1px solid black',
                                        }}
                                        label={item?.page?.title || 'Empty'}
                                      />
                                    </Typography>
                                    {/* Select  */}
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div>
                                      <Typography>{item?.message}</Typography>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                      <div className="">
                                        <button
                                          onClick={() =>
                                            handleDelete(item?._id)
                                          }
                                          style={{ border: '1px solid black' }}
                                          className="flex items-center gap-2 inline-block px-3 py-1 mx-auto text-black rounded-full text-sm hover:text-black hover:bg-gray-200 md:mx-0 transition ease-in-out duration-300 w-22"
                                        >
                                          <Trash size={12} />
                                          <div style={{ fontSize: '13px' }}>
                                            Delete
                                          </div>
                                        </button>
                                      </div>
                                      <div className="">
                                        <button
                                          onClick={() => handleEdit(item?._id)}
                                          style={{ border: '1px solid black' }}
                                          className="flex items-center gap-2 inline-block px-4 py-1 mx-auto text-black rounded-full text-sm bg-[#05686E] text-white  md:mx-0 transition ease-in-out duration-300 w-22"
                                        >
                                          <Pencil size={12} />
                                          <div style={{ fontSize: '13px' }}>
                                            Edit
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                              </>
                            );
                          })}
                          <div className="flex flex-row items-end justify-end pt-5">
                            <Button
                              onClick={handlePrev}
                              className="bg-gray-300 rounded-none text-black px-3"
                            >
                              <ChevronLeft />
                            </Button>
                            <Button className="rounded-none bg-gray-100 text-black border hover:bg-gray-200">
                              {page.currentPage}
                            </Button>
                            <Button
                              onClick={handleNext}
                              className="bg-gray-300 rounded-none text-black px-3"
                            >
                              <ChevronRight />
                            </Button>
                          </div>
                        </div>
                      ) : (!loading &&
                        <div className="flex justify-center items-center py-10 border-t">
                          <h1>No FAQ Available</h1>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
};

export default AdminFaq;
