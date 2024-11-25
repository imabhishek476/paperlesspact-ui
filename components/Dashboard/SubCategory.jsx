import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { Button } from '../ui/button';
import {
  Box,
  Skeleton,
  Tooltip,
  Typography,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { useRouter } from 'next/navigation';
import {
  deleteSubCategory,
  getAllCategory,
  getAllSubCategory,
  publishSubCategoryById,
  getCategoryById
} from 'components/Apis/template';

import { ThemeProvider, createTheme } from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  HardDriveDownload,
  HardDriveUpload,
  Pencil,
  Trash,
} from 'lucide-react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CreateSubCategoryModal from '../Dashboard/CreateSubCategoryModal';
import { EasedraftTheme } from 'utils/Theme';
import DeleteModal from './DeleteModal';

const theme = createTheme(EasedraftTheme);

const SubCategory = ({ totalSubCategory, setTotalSubCategory }) => {
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSuccess, setSnackSuccess] = useState('success');
  const [editMode, setEditMode] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editCategoryName, setEditCategoryName] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editSubCategoryId, setEditSubCategoryId] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [catId, setCatId] = useState("")

  const handleEdit = (index) => {
    setPopoverOpen(false)
    console.log(index);
    getOneCategory(index?.categoryId)
    setEditMode(true)
    setName(index?.name)
    setEditCategoryId(index?.categoryId)
    setEditSubCategoryId(index?._id)
    handleOpen()
  };

  const getOneCategory = async (id) => {
    if (id) {
      const res = await getCategoryById(id);
      console.log(res)
      if (res) {
        setEditCategoryName(res?.data?.ref?.name);
      }
    }
  };
  const handleDeleteOpen = (id) => {
    setCatId(id)
    setDeleteOpen(true)

  }
  const handleDelete = async () => {
    if (catId) {
      const res = await deleteSubCategory(catId);
      setPopoverOpen(false)
      setLoading(true)
      if (res) {
        console.log(res);
        setSnackOpen(true);
        setSnackMessage('Deleted Successfully');
        setSnackSuccess('success');
        setUpdate((prev) => !prev);
      } else {
        setSnackMessage('Something Went Wrong');
        setSnackSuccess('warning');
      }
      setDeleteOpen(false)
      setCatId("")
    }

  };

  const [page, setPage] = useState({
    size: 5,
    currentPage: 1,
    maxPage: 1,
  });

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
    const res = await getAllSubCategory(page?.currentPage + 1, page?.size);
    if (res) {
      setSubCategoriesData(res?.data?.ref);
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
    const res = await getAllSubCategory(page?.currentPage - 1, page?.size);
    if (res) {
      setSubCategoriesData(res?.data?.ref);
    }
    setLoading(false);
  };

  const getSubCategory = async () => {
    const res = await getAllSubCategory(page?.currentPage, page?.size);
    if (res) {
      console.log(res);
      setPage({
        ...page,
        maxPage: res?.data?.totalPages,
      });
      setSubCategoriesData(res?.data?.ref);
      setTotalSubCategory(res?.data?.totalItems);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSubCategory();
  }, [update]);

  const publishSubCategory = async (id, published) => {
    const body = {
      subCategoryId: id,
      published: published,
    };
    setLoading(true)
    const res = await publishSubCategoryById(body);

    if (res) {
      console.log(res);
      if (published === '0')
        setSnackMessage('Unpublished Successfully');
      else setSnackMessage(' Published Successfully');

      setSnackSuccess('success');
      setUpdate((prev) => !prev);
    } else {
      setSnackMessage('Something Went Wrong');
      setSnackSuccess('warning');
    }
  };

  const handlePublish = (id, published) => {
    setPopoverOpen(false)
    setSnackOpen(true);
    publishSubCategory(id, published);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CreateSubCategoryModal
          open={open}
          handleClose={handleClose}
          category={category}
          setUpdate={setUpdate}
          setSnackOpen={setSnackOpen}
          setSnackSuccess={setSnackSuccess}
          setSnackMessage={setSnackMessage}
          editMode={editMode}
          name={name}
          setName={setName}
          nameError={nameError}
          setNameError={setNameError}
          setEditMode={setEditMode}
          editCategoryId={editCategoryId}
          editCategoryName={editCategoryName}
          editSubCategoryId={editSubCategoryId}
          setEditSubCategoryId={setEditSubCategoryId}
          setLoading={setLoading}
        />
        <DeleteModal open={deleteOpen} handleClose={() => setDeleteOpen(false)} deleteById={handleDelete} title={"Are you sure want to delete the subcategory?"} />
        {snackOpen && (
          <Snackbar
            open={snackOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={() => setSnackOpen(false)}
            sx={{
              zIndex: 1000,
              mt: 10,
            }}
          >
            <Alert
              onClose={() => setSnackOpen(false)}
              severity={snackSuccess}
              variant="filled"
              sx={{ width: '100%', pr: 3, pl: 3 }}
            >
              <Typography sx={{ fontSize: '14px' }} variant="h6">
                {snackMessage}
              </Typography>
            </Alert>
          </Snackbar>
        )}

        <section className="flex flex-col ">
          <div className=" flex flex-col items-center">
            <div className="w-full pb-5">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">
                      Total Sub Categories
                    </h1>
                    <p>{totalSubCategory}</p>
                  </div>
                  {/* <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">
                      Published Sub Categories
                    </h1>
                    <p>50</p>
                  </div>
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/3 w-full justify-between">
                    <h1 className="text-md font-semibold">
                      Not Published Sub Categories
                    </h1>
                    <p>30</p>
                  </div> */}
                  <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                    <Button
                      className="w-full lg:w-fit"
                      onClick={handleOpen}
                      type="button"
                      size="lg"
                    >
                      Create Sub Category
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
                        <div className="col-span-2 sm:col-span-1 font-semibold">
                          Sno
                        </div>
                        <div className="col-span-8 sm:col-span-5 font-semibold">
                          Name
                        </div>
                        <div className="hidden sm:grid sm:col-span-3 font-semibold">
                          Category{' '}
                        </div>
                        <div className="hidden sm:grid sm:col-span-2 font-semibold">
                          Status
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex justify-end font-semibold">
                          Action
                        </div>
                      </div>
                      {subCategoriesData && subCategoriesData.length > 0 ? (
                        <div className="flex flex-col min-h-[250px] ">
                          {subCategoriesData?.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <div
                                  key={index}
                                  className="hover:cursor-pointer grid grid-cols-12 bg-gray-200 px-2 py-3 border-b border-gray-700 items-center"
                                >
                                  <div className="col-span-2 sm:col-span-1 pl-2">
                                    {index + 1 + page.currentPage * 5 - 5}
                                  </div>

                                  <div className="col-span-8 sm:col-span-5">
                                    <Tooltip
                                      title={item?.name}
                                      placement="bottom-start"
                                    >
                                      <>
                                        <p className="w-40 md:w-96 truncate overflow-hidden justify-center">
                                          {' '}
                                          {item?.name}
                                        </p>
                                        {/* <p className="grid lg:hidden">
                                          {' '}
                                          {item?.type
                                            ?.map((t) => t.name)
                                            .join(', ')}
                                        </p> */}
                                      </>
                                    </Tooltip>
                                    <div className='flex flex-col gap-1'>
                                      <span className="sm:hidden text-[1rem]">
                                        {item?.categoryName ? item?.categoryName : 'Category'}
                                      </span>
                                      <span className="sm:hidden text-sm">
                                        {item?.published === '1'
                                          ? 'Published'
                                          : 'Not Published'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="hidden sm:grid sm:col-span-3">
                                    {item?.categoryName ? item?.categoryName : 'Category'}
                                  </div>

                                  <div className="hidden sm:grid sm:col-span-2">
                                    {item?.published === '1'
                                      ? 'Published'
                                      : 'Not Published'}
                                  </div>

                                  <div className="col-span-2 sm:col-span-1 flex justify-end">
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
                                            <div className='flex flex-col '>
                                              {
                                                item?.published === '0' ? <div onClick={() => handlePublish(item?._id, '1')} className='flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2'>
                                                  <HardDriveUpload size={15} />Publish
                                                </div> :
                                                  <div onClick={() => handlePublish(item?._id, '0')} className='flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2'>
                                                    <HardDriveDownload size={15} /> Unpublish
                                                  </div>
                                              }
                                              <div onClick={() => handleEdit(item)} className='flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 p-2'>
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
                      ) : (
                        <div className="flex justify-center items-center py-10">
                          <h1>No Sub Category Available</h1>
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
  );
};

export default SubCategory;
