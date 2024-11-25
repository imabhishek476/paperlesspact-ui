import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Button } from '../ui/button';
import { Box, Skeleton, Tooltip, Typography, MenuItem, Select, Snackbar, Alert } from '@mui/material';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRouter } from 'next/navigation';
import {
  deleteNode,
  getAllCategory,
  getcompletedTemplateList,
  publishTemplateById
} from 'components/Apis/template';

import { ThemeProvider, createTheme } from '@mui/material'
import { ChevronLeft, ChevronRight, HardDriveDownload, HardDriveUpload, Pencil, Trash } from 'lucide-react';

import CreateTemplateModal from '../Dashboard/CreateTemplateModal';
import { EasedraftTheme } from 'utils/Theme';
import DeleteModal from './DeleteModal';

const theme = createTheme(EasedraftTheme);

const Template = ({ totalTemplate, setTotalTemplate }) => {

  const [templatesData, setTemplateData] = useState([])
  const [category, setCategory] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(true)
  const [action, setAction] = useState({});
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState("")
  const [snackSuccess, setSnackSuccess] = useState('success')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [tempId, setTempId] = useState()
  const router = useRouter();

  const handleChange = (index, newValue) => {
    setAction({
      ...action,
      [index]: newValue,
    });
    console.log(index);

    if (newValue === 10) {
      handlePublish(index, '1')
    }

    if (newValue == 20) {
      handlePublish(index, '0')
    }

    if (newValue === 30) {
      window.open(`https://sign.easedraft.com/template/new?id=${index}`, '_blank')
    }
    if (newValue === 40) {
      handleDelete(index)
    }

  };
  const handleDeleteOpen = (id) => {
    setTempId(id)
    setDeleteOpen(true)
  }
  const handleDelete = async () => {
    if (tempId) {
      setPopoverOpen(false)
      const res = await deleteNode(tempId);
      if (res) {
        console.log(res);
        setSnackOpen(true)
        setSnackMessage("Deleted Successfully")
        setSnackSuccess('success')
        setUpdate(prev => !prev)
      } else {
        setSnackOpen(true)
        setSnackMessage("Something Went Wrong")
        setSnackSuccess('warning')
      }
      setTempId("")
      setDeleteOpen(false)
    }

  }



  const [page, setPage] = useState({
    size: 5,
    currentPage: 1,
    maxPage: 1,
  });

  const getTemplates = async () => {
    const res = await getcompletedTemplateList({isGlobal:1}, page?.currentPage, page?.size);
    if (res) {
      console.log(res);
      setTemplateData(res?.ref);
      setPage({
        ...page,
        maxPage: res?.totalPages,
      });
      setTotalTemplate(res?.totalItems);
    }
  };

  useEffect(() => {
    getTemplates();
  }, [update]);

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
    const res = await getcompletedTemplateList({isGlobal:1}, page?.currentPage + 1, page?.size);
    if (res) {
      setTemplateData(res?.ref);
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
    const res = await getcompletedTemplateList({isGlobal:1}, page?.currentPage - 1, page?.size);
    if (res) {
      setTemplateData(res?.ref);
    }
    setLoading(false)

  }

  const getCategory = async () => {
    const res = await getAllCategory(null, null, '1');
    if (res) {
      console.log(res);
      setCategory(res.data.ref)
    }
    setLoading(false);
  };


  useEffect(() => {
    getCategory();
  }, []);

  const publishTemplate = async (id, published) => {

    const body = {
      folderTemplateId: id,
      published: published
    };
    const res = await publishTemplateById(body);


    if (res) {
      console.log(res);
      if (published === '0')
        setSnackMessage("Unpublished Successfully")
      else
        setSnackMessage("Published Successfully")

      setSnackSuccess('success')
      setUpdate(prev => !prev)
    } else {
      setSnackMessage("Something Went Wrong")
      setSnackSuccess('warning')
    }
  }

  const handlePublish = (id, published) => {
    setPopoverOpen(false)
    setSnackOpen(true)
    publishTemplate(id, published)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CreateTemplateModal open={open} handleClose={handleClose} category={category} />
        <DeleteModal open={deleteOpen} handleClose={() => setDeleteOpen(false)} deleteById={handleDelete} title={"Are you sure want to delete the template?"} />

        {
          snackOpen && (
            <Snackbar
              open={snackOpen}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setSnackOpen(false)}
              sx={{
                zIndex: 1000,
                mt: 10

              }}
            >
              <Alert
                onClose={() => setSnackOpen(false)}
                severity={snackSuccess}
                variant="filled"
                sx={{ width: '100%', pr: 3, pl: 3 }}
              >
                <Typography sx={{ fontSize: "14px" }} variant="h6">
                  {snackMessage}
                </Typography>

              </Alert>
            </Snackbar>
          )
        }

        <section className="flex flex-col ">
          <div className=" flex flex-col items-center">
            <div className="w-full pb-5">
              <div className="flex flex-col gap-2 ">

                <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Total Templates</h1>
                    <p>{totalTemplate}</p>
                  </div>
                  {/* <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                  <h1 className="text-md font-semibold">Published Templates</h1>
                  <p>50</p>
                </div>
                <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/3 w-full justify-between">
                  <h1 className="text-md font-semibold">Not Published Templates</h1>
                  <p>30</p>
                </div> */}
                  <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                    <Button
                      className="w-full lg:w-fit"
                      onClick={handleOpen}
                      type='button'
                      size="lg"
                    >
                      Create Template
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
                        <div className="col-span-2 md:col-span-1 font-semibold">Sno</div>
                        <div className="col-span-5 sm:col-span-6 font-semibold">Name</div>
                        <div className="col-span-2 sm:col-span-2 font-semibold">Category</div>
                        <div className="hidden md:grid md:col-span-2 font-semibold">Sub Category</div>
                        <div className="col-span-3 sm:col-span-2 md:col-span-1 flex justify-end font-semibold">Action</div>

                      </div>
                      {templatesData && templatesData.length > 0 ? (
                        <div className='flex flex-col min-h-[250px] '>

                          {
                            templatesData?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="hover:cursor-pointer grid grid-cols-12 bg-gray-200 px-2 py-3 border-b border-gray-700 items-center"
                                  >
                                    <div className="col-span-2 md:col-span-1 pl-2">{index + 1 + page.currentPage * 5 - 5}</div>

                                    <div className="col-span-5 sm:col-span-6">
                                      <Tooltip title={item?.name} placement="bottom-start">
                                        <>
                                          <p className='w-40 md:w-96 truncate overflow-hidden'> {(item?.name)}</p>
                                          <p className="grid lg:hidden">
                                            {' '}
                                            {item?.type}
                                          </p>
                                        </>
                                      </Tooltip>
                                    </div>

                                    <div className="col-span-2 sm:col-span-2">
                                      {item?.categoryId?.name}
                                      <br />
                                      <span className=' md:hidden text-sm'>
                                        {
                                          item?.subCategoryId?.name ?
                                            item?.subCategoryId?.name
                                            : 'N/A'
                                        }
                                      </span>
                                    </div>

                                    <div className="hidden md:grid md:col-span-2">
                                      {
                                        item?.subCategoryId?.name ?
                                          item?.subCategoryId?.name
                                          : 'N/A'
                                      }
                                    </div>
                                    <div className="col-span-3 sm:col-span-2 md:col-span-1 flex justify-end">


                                      <div>
                                        <Popover>
                                          <PopoverTrigger>
                                            <button
                                              className="bg-transparent hover:bg-transparent border-none shadow-none py-0"
                                              onClick={() => setPopoverOpen(true)}
                                            >
                                              <MoreHorizIcon sx={{ color: "black" }} />
                                            </button>
                                          </PopoverTrigger>
                                          {
                                            popoverOpen && <PopoverContent className=" max-w-[150px]">
                                              <div className='flex flex-col'>
                                                {
                                                  item?.published === '0' ? <div onClick={() => handlePublish(item?._id, '1')} className='flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2'>
                                                    <HardDriveUpload size={15} />Publish
                                                  </div> :
                                                    <div onClick={() => handlePublish(item?._id, '0')} className='flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2'>
                                                      <HardDriveDownload size={15} /> Unpublish
                                                    </div>
                                                }
                                                <div onClick={() => window.open(`https://sign.easedraft.com/template/new?id=${item?._id}`, '_blank')} className='flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 p-2'>
                                                  <Pencil size={15} />Edit
                                                </div>
                                                <div onClick={() => handleDeleteOpen(item?._id)} className='flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 p-2'>
                                                  <Trash size={15} /> Delete
                                                </div>
                                              </div>
                                            </PopoverContent>
                                          }

                                        </Popover>
                                      </div>


                                    </div>

                                  </div>
                                </>
                              );
                            })
                          }
                          < div className='flex flex-row items-end justify-end pt-5'>
                            <Button onClick={handlePrev} className='bg-gray-300 rounded-none text-black px-3'><ChevronLeft /></Button>
                            <Button className="rounded-none bg-gray-100 text-black border hover:bg-gray-200">{page.currentPage}</Button>
                            <Button onClick={handleNext} className="bg-gray-300 rounded-none text-black px-3"><ChevronRight /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center py-10">
                          <h1>No Template Available</h1>
                        </div>
                      )}

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ThemeProvider>
    </div>
  )
}

export default Template
