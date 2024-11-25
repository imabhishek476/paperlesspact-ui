'use client';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from '@mui/material';
import LexicalEditor from 'components/Lexical';
import { Button } from 'components/ui/button';
import { Minus, MoveLeft, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  updateBlog,
  getBlogsByIds,
} from '.././../../../../components/Apis/blog';
import Loading from '../../../../../components/Loading/Loading';
import PlaygroundNodes from '../../../../../components/Lexical/PlaygroundNodes';
import PlaygroundEditorTheme from '../../../../../components/Lexical/themes/PlaygroundEditorTheme';
import { $generateHtmlFromNodes } from '@lexical/html';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useFormik } from 'formik';
import * as Yup from 'yup';
const blogValidation = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  summary: Yup.string().required('Summary is required!'),
  authorName: Yup.string().required('Author Name is required!'),
  seoLink: Yup.string().required('SEO Link is required!'),
  thamnail: Yup.string().required('Thumbnail Image is required!'),
  cover: Yup.string().required('Cover Image is required!'),
  authorProfile: Yup.string().required('Profile Image is required!'),
  authorSocial: Yup.string().required('Social Link is required!'),
  category: Yup.array()
    .min(1, 'You need at least one Category')
    .required('Category is required!'),
});
const top100Films = [
  { title: 'Criminal ' },
  { title: 'Civil Rights ' },
  { title: 'Family ' },
  { title: 'Intellectual Property ' },
  { title: 'Environmental ' },
  { title: 'Corporate ' },
  { title: 'International ' },
  { title: 'Labor and Employment ' },
  { title: 'Tax ' },
  { title: 'Real Estate and Property ' },
  { title: 'Sexual Harassment ' },
  { title: 'Immigration ' },
  { title: 'Healthcare ' },
  { title: 'Personal Injury ' },
  { title: 'Bankruptcy ' },
  { title: 'Consumer Protection ' },
  { title: 'Elder ' },
  { title: 'Education ' },
  { title: 'Technology and Internet ' },
  { title: 'Sports and Entertainment ' },
];

const EditBlog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [authorProfile, setAuhorProfile] = useState(null);
  const authorProfileRef = useRef();
  const [initialValues, setInitialValues] = useState(null);
  const [initialConfig, setInitialConfig] = useState({
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  });

  const id = searchParams.get('id');
  console.log('router', router.query, pathname, searchParams.get('id'));
  const [userInput, setUserInput] = useState({
    title: '',
    category: [],
    summary: '',
    authorName: '',
    seoLink: '',
    authorSocial: '',
  });
  const [error, setError] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [thamnailImg, setThamnailImg] = useState(null);
  const fileRef = useRef();
  const thamnailRef = useRef();
  const contentRef = useRef(null);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);
  const getBlogData = async () => {
    try {
      const res = await getBlogsByIds(id);
      if (res) {
        const data = res?.data;
        setData(data);
        setIsManualEdit(true);
        console.log('data', data);
        console.log(data?.content);

        formik.setTouched({
          cover: true,
          thamnail: true,
          authorProfile: true      
        });

        

        formik.setFieldValue('title', data?.title)
        formik.setFieldValue('category', data?.type)
        formik.setFieldValue('summary', data?.description)
        formik.setFieldValue('authorName', data?.user)
        formik.setFieldValue('content', data?.content)
        formik.setFieldValue('authorSocial', data?.userSocial)
        formik.setFieldValue('seoLink', data?.seoLink)
        formik.setFieldValue('cover', data?.coverImg);
        formik.setFieldValue('thamnail', data?.thumbnail);
        formik.setFieldValue('authorProfile', data?.authorProfile);
      
        console.log(data?.type)
        setUserInput({category: data?.type})
        console.log(formik.values?.category)
        formik.setFieldValue('category', data?.type)
        // setInitialValues({
        //   title: data?.title,
        //   category: data?.category,
        //   summary: data?.description,
        //   authorName: data?.user,
        //   content: data?.content,
        //   authorSocial: data?.userSocial,
        //   seoLink: data?.seoLink,
        // });

        // setUserInput({
          //   title: data?.title || '',
          //   category: data?.category || [],
        //   summary: data?.description || '',
        //   authorName: data?.user || '',
        //   content: data?.content || '',
        //   authorSocial: data?.userSocial || '',
        //   seoLink:data?.seoLink || ''
        // })
        setPublishValue((Number.data?.isPublished) === 1 ? 'publish' : 'save');
        setInitialConfig({
          ...initialConfig,
          editorState:
          typeof data.content === 'string'
          ? data.content
          : JSON.stringify(data.content) || null,
        });
       
        // setUpdate((prev) => !prev);
        // formik.setFieldValue('category', data?.type)

        // setAuhorProfile(data?.image[2]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setIsLoading(false);
    }
  };
  // console.log(initialConfig)
  useEffect(() => {
    getBlogData();
  }, [id]);
  const [publishValue, setPublishValue] = useState('save');
  function handleFileChange(event) {
    if (window.FileReader && event.target.files[0]) {
      const file = new FileReader();
      if (
        event.target.files[0] &&
        event.target.files[0].type.match('image.*')
      ) {
        file.onload = function () {
          formik.setFieldValue('cover', event.target.files[0]);
          // setFiles(event.target.files[0]);
        };
        file.readAsDataURL(event.target.files[0]);
      }
    }
  }
  function handleAuthorProfileChange(event) {
    if (window.FileReader && event.target.files[0]) {
      const file = new FileReader();
      if (
        event.target.files[0] &&
        event.target.files[0].type.match('image.*')
      ) {
        file.onload = function () {
          // setAuhorProfile(event.target.files[0]);
          formik.setFieldValue('authorProfile', event.target.files[0])
        };
        file.readAsDataURL(event.target.files[0]);
      }
    }
  }
  function handleThamnailChange(event) {
    if (window.FileReader && event.target.files[0]) {
      const file = new FileReader();
      if (
        event.target.files[0] &&
        event.target.files[0].type.match('image.*')
      ) {
        file.onload = function () {
          formik.setFieldValue('thamnail', event.target.files[0]);
          // setThamnailImg(event.target.files[0]);
        };
        file.readAsDataURL(event.target.files[0]);
      }
    }
  }
  const handleRemoveImage = () => {
    if (formik.values.cover) {
      // setFiles(null);
      formik.setFieldValue('cover', null);
    }
  };
  const handleRemoveThamnailImage = () => {
    if (formik.values.thamnail) {
      // setThamnailImg(null);
      formik.setFieldValue('thamnail', null);
    }
  };
  const handleChange = (event) => {
    setPublishValue(event.target.value);
  };
  const handleSubmit = async () => {
    // console.log(formik.values);
    // console.log(formik.errors);
    // if (
    //   !formik.values.title ||
    //   !formik.values.seoLink ||
    //   !formik.values.summary ||
    //   !contentRef.current?.getEditorState()?.getCurrentContent()?.hasText() ||
    //   !formik.values.authorName ||
    //   !formik.values.authorSocial ||
    //   !formik.values.thamnail ||
    //   !formik.values.cover ||
    //   !formik.values.authorProfile ||
    //   !formik.values.category
    // ) {
    //   return;
    // }

    let html = null;
    console.log(contentRef);
    contentRef?.current?.update(() => {
      html = $generateHtmlFromNodes(contentRef?.current, null);
    });
    let publish = null;
    if (publishValue === 'save') {
      publish = 0;
    } else {
      publish = 1;
    }
    // console.log(formik.values.cover);
    const body = {
      title: formik.values.title,
      coverImg: formik.values.cover,
      seoLink: formik.values.seoLink,
      thumbnail: formik.values.thamnail,
      category: formik.values.category,
      des: formik.values.summary,
      content: contentRef?.current?.getEditorState(),
      htmlContent: html,
      author: formik.values.authorName,
      authorSocial: formik.values.authorSocial,
      authorProfile: formik.values.authorProfile,
      isPublished: publish,
    };

    console.log(body);
    setIsLoading(true);
    const res = await updateBlog(id, body);
    if (res) {
      console.log(res);
      setUserInput({
        title: '',
        category: [],
        summary: '',
        authorName: '',
        authorSocial: '',
      });
      formik.resetForm();
      handleRemoveImage();
      handleRemoveThamnailImage();
      handleRemoveImage();
      router.push('/dashboard');
      // setAuhorProfile(null);
      formik.setFieldValue("authorProfile", null);
    }
    setIsLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      category: [],
      summary: '',
      authorName: '',
      authorSocial: '',
      seoLink: '',
    },
    validationSchema: blogValidation,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });
  // useEffect(() => {
  //   // if (!isManualEdit) {
  //   //   const generateSeoLink = userInput.title
  //   //     .toLowerCase()
  //   //     .replace(/[\s\W-]+/g, '-')
  //   //     .replace(/^-+|-+$/g, '');
  //   //   setUserInput({ ...userInput, seoLink: generateSeoLink });
  //   // }
  // }, [userInput.title, isManualEdit]);
  const handleTitleChange = (e) => {
    setUserInput({ ...userInput, title: e.target.value });
    setIsManualEdit(false);
  };
  const handleSeoLinkChange = (e) => {
    setUserInput({ ...userInput, seoLink: e.target.value });
    setIsManualEdit(true);
  };
  useEffect(()=>{
    // if(data)
    // {
    //   setInitialValues({
    //     title: data?.title,
    //     category: data?.type,
    //     summary: data?.description,
    //     authorName: data?.user,
    //     content: data?.content,
    //     authorSocial: data?.userSocial,
    //     seoLink:data?.seoLink
    //   })
    console.log(initialValues)
    console.log(formik.values?.category)
    // }

  },[initialValues])
  console.log(formik.values?.category);
  return isloading ? (
    <Loading />
  ) : (
    <div>
      <section className="min-h-screen lg:pt-20 pt-32 flex flex-col pb-10 mb-10">
        <div className="container flex flex-col items-center">
          <div className="flex flex-col bg-white w-full px-5 gap-5 pb-5">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-center">
                <button>
                  <MoveLeft
                    className="mt-5 hover:cursor-pointer "
                    onClick={() => router.push('/dashboard')}
                  />
                </button>
                <h1 className="mt-5 text-base font-bold">Edit Blog</h1>
              </div>
              <Button
                onClick={formik.handleSubmit}
                className="mt-2 capitalize"
              >
                {publishValue}
              </Button>
            </div>
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex flex-col w-full lg:w-9/12 gap-5">
                <div className="flex flex-col gap-3 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p>Title</p>
                  <TextField
                    fullWidth
                    hiddenLabel
                    name="title"
                    value={formik.values?.title}
                    id="filled-hidden-label-small"
                    onChange={(e) => {
                      console.log(e);
                      formik.handleChange(e);
                      const generateSeoLink = e.target.value
                        .toLowerCase()
                        .replace(/[\s\W-]+/g, '-')
                        .replace(/^-+|-+$/g, '');
                      formik.setFieldValue('seoLink', generateSeoLink);
                    }}
                    onBlur={formik.handleBlur}
                    // onChange={handleTitleChange}
                    color="secondary"
                    error={formik.touched.title && formik.errors.title}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{
                      '& label.Mui-focused': {
                        color: '#05686E',
                      },
                      // focused color for input with variant='standard'
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='filled'
                      '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='outlined'
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#05686E',
                        },
                      },
                    }}
                  />
                  <p>Seo link</p>
                  <TextField
                    fullWidth
                    name="seoLink"
                    hiddenLabel
                    disabled={formik.values?.title === ''}
                    value={formik.values?.seoLink}
                    error={formik.touched.seoLink && formik.errors.seoLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.seoLink && formik.errors.seoLink}
                    id="filled-hidden-label-small"
                    sx={{
                      '& label.Mui-focused': {
                        color: '#05686E',
                      },
                      // focused color for input with variant='standard'
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='filled'
                      '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='outlined'
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#05686E',
                        },
                      },
                    }}
                    // onChange={handleSeoLinkChange}
                  />
                </div>
                <div className="flex flex-col gap-3 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p>Summary</p>
                  <TextField
                    fullWidth
                    hiddenLabel
                    name="summary"
                    value={formik.values?.summary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.summary && formik.errors.summary}
                    helperText={formik.touched.summary && formik.errors.summary}
                    id="filled-hidden-label-small"
                    sx={{
                      '& label.Mui-focused': {
                        color: '#05686E',
                      },
                      // focused color for input with variant='standard'
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='filled'
                      '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='outlined'
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#05686E',
                        },
                      },
                    }}
                    // onChange={(e) =>
                    //   setUserInput({ ...userInput, summary: e.target.value })
                    // }
                  />
                </div>
                <div className="flex flex-col gap-3 bg-gray-100 px-4 py-2 rounded-md pb-5 h-full">
                <p>
                  Content{' '}
                </p>
                  {initialConfig?.editorState && (
                    <LexicalEditor
                      editorRef={contentRef}
                      initialConfig={initialConfig}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full lg:w-3/12">
                <div className="flex flex-col  gap-3 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <FormControl>
                    <p className="text-md font-semibold"> Publish a blog</p>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="save"
                      name="radio-buttons-group"
                      value={publishValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="save"
                        control={
                          <Radio
                            sx={{
                              color: '#05686E',
                              '&.Mui-checked': {
                                color: '#05686E',
                              },
                            }}
                          />
                        }
                        label="Save"
                      />
                      <FormControlLabel
                        value="publish"
                        control={
                          <Radio
                            sx={{
                              color: '#05686E',
                              '&.Mui-checked': {
                                color: '#05686E',
                              },
                            }}
                          />
                        }
                        label="Publish"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="flex flex-col  gap-3 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p className="text-md font-semibold">Author</p>
                  <TextField
                    fullWidth
                    hiddenLabel
                    name="authorName"
                    value={formik.values?.authorName}
                    error={
                      formik.touched.authorName && formik.errors.authorName
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.authorName && formik.errors.authorName
                    }
                    id="filled-hidden-label-small"
                    sx={{
                      '& label.Mui-focused': {
                        color: '#05686E',
                      },
                      // focused color for input with variant='standard'
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='filled'
                      '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='outlined'
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#05686E',
                        },
                      },
                    }}
                    // onChange={(e) =>
                    //   setUserInput({ ...userInput, authorName: e.target.value })
                    // }
                    size="small"
                  />
                  <p className="text-md font-semibold">Author Social</p>
                  <TextField
                    fullWidth
                    hiddenLabel
                    name="authorSocial"
                    error={formik.touched.authorName && formik.errors.authorSocial}
                    helperText={formik.touched.authorName && formik.errors.authorSocial}
                    onBlur={formik.handleBlur}
                    sx={{
                      '& label.Mui-focused': {
                        color: '#05686E',
                      },
                      // focused color for input with variant='standard'
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='filled'
                      '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#05686E',
                      },
                      // focused color for input with variant='outlined'
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#05686E',
                        },
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values?.authorSocial}
                    id="filled-hidden-label-small"
                    // onChange={(e) =>
                    //   setUserInput({ ...userInput, authorSocial: e.target.value })
                    // }
                    size="small"
                  />
                  <p className="text-md font-semibold">Blog category</p>
                  {(update || !update) && (
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      // value={userInput.category}
                      // isOptionEqualToValue={(option, value) => {
                      //   console.log(option.title, value.title);
                      //   return option.title === value.title;
                      // }}
                      value={formik.values.category}
                      getOptionSelected={(option,value)=>option.title === value.title}
                      disableCloseOnSelect
                      options={top100Films.sort(
                        (a, b) => -b.title.localeCompare(a.title)
                      )}
                      groupBy={(option) => option.title}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.title}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          error={
                            formik.touched.category && formik.errors.category
                          }
                          helperText={
                            formik.touched.category && formik.errors.category
                          }
                          name="category"
                          sx={{
                            '& label.Mui-focused': {
                              color: '#05686E',
                            },
                            // focused color for input with variant='standard'
                            '& .MuiInput-underline:after': {
                              borderBottomColor: '#05686E',
                            },
                            // focused color for input with variant='filled'
                            '& .MuiFilledInput-underline:after': {
                              borderBottomColor: '#05686E',
                            },
                            // focused color for input with variant='outlined'
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: '#05686E',

                              },
                            },
                          }}
                          onBlur={formik.handleBlur}
                          fullWidth
                          {...params}
                          size="small"
                          hiddenLabel
                        />
                      )}
                      // onChange={formik.handleChange}
                      onChange={(event, newValue) => {
                        // setUserInput({ ...userInput, category: newValue });
                        console.log(formik.values.category);
                        console.log(newValue);
                        formik.setFieldValue('category', newValue);
                        console.log(formik.values.category);
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col  gap-1 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p className="text-md font-semibold">Author Profile</p>
                  <FormLabel sx={{ fontSize: 12, pb: 2 }}>
                    Support upload of JPG & PNG for now
                  </FormLabel>
                  {/* <p className='text-xs pb-3'>Support upload of JPG & PNG for now</p> */}
                  <div
                    className={`border-2 ${ formik.errors.authorProfile ? 'border-rose-500' : ''} flex flex-col gap-2 justify-center items-center ${
                      formik.values?.authorProfile ? 'py-2' : 'py-10'
                    } relative`}
                  >
                    {console.log(formik.touched)}
                    <div className="">
                      <input
                      name='authorProfile'
                      handleBlur={formik.handleBlur}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(event) => {
                          handleAuthorProfileChange(event);
                        }}
                        ref={authorProfileRef}
                      />
                      {formik.values?.authorProfile ? (
                        <div className="">
                          <img
                            alt="authorProfile"
                            className=""
                            src={
                              formik.values?.authorProfile
                                ? typeof formik.values?.authorProfile === 'string'
                                  ? formik.values?.authorProfile
                                  : URL.createObjectURL(formik.values?.authorProfile)
                                : ''
                            }
                            width={200}
                            height={100}
                          ></img>
                          <Tooltip title="Remove Image" arrow>
                            <button
                              className="absolute top-0 right-0"
                              onClick={
                                () => 
                                // setAuhorProfile(null)
                                formik.setFieldValue("authorProfile", null)
                              }
                            >
                              <Trash2 />
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                        <Button
                          // size="sm"
                          onClick={() => {
                            authorProfileRef.current.click();
                          }}
                          className="flex flex-row gap-1"
                        >
                          <Plus size={20} />
                          Add Author Profile
                        </Button>
                      )}
                    </div>
                  </div>
                  { formik.errors.authorProfile && (
                    <p className="text-red-600 text-center">
                      {formik.errors.authorProfile}
                    </p>
                  )}
                </div>
                <div className="flex flex-col  gap-1 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p className="text-md font-semibold">Thamnail image</p>
                  <FormLabel sx={{ fontSize: 12, pb: 2 }}>
                    Support upload of JPG & PNG for now
                  </FormLabel>
                  {/* <p className='text-xs pb-3'>Support upload of JPG & PNG for now</p> */}
                  <div
                    className={`border-2 ${formik.touched.thamnail &&  formik.errors.thamnail ? 'border-rose-500' : ''} flex flex-col gap-2 justify-center items-center ${
                      formik.errors.thamnail ? 'py-10' : 'py-10'
                    } relative`}
                  >
                    <div className="">
                      <input
                      name='thamnail'
                      handleBlur={formik.handleBlur}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(event) => {
                          handleThamnailChange(event);
                        }}
                        ref={thamnailRef}
                      />
                      {formik.values?.thamnail ? (
                        <div className="">
                          <img
                            alt="thamnail"
                            className=""
                            src={
                              formik.values?.thamnail
                                ? typeof formik.values.thamnail === 'string'
                                  ? formik.values.thamnail
                                  : URL.createObjectURL(formik.values.thamnail)
                                : ''
                            }
                            width={200}
                            height={100}
                          ></img>
                          <Tooltip title="Remove Image" arrow>
                            <button
                              className="absolute top-0 right-0"
                              onClick={handleRemoveThamnailImage}
                            >
                              <Trash2 />
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                        <Button
                          // size="sm"
                          onClick={() => {
                            thamnailRef.current.click();
                          }}
                          className="flex flex-row gap-1"
                        >
                          <Plus size={20} />
                          Add Thumbnail Image
                        </Button>
                      )}
                    </div>
                  </div>
                  {formik.touched.thamnail &&  formik.errors.thamnail && (
                    <p className="text-red-600 text-center">
                      {formik.errors.thamnail}
                    </p>
                  )}
                </div>
                <div className="flex flex-col  gap-1 bg-gray-100 px-4 py-2 rounded-md pb-5">
                  <p className="text-md font-semibold">Cover image</p>
                  {/* <p className='text-xs pb-3'>Support upload of JPG & PNG for now</p> */}
                  <FormLabel sx={{ fontSize: 12, pb: 2 }}>
                    Support upload of JPG & PNG for now
                  </FormLabel>
                  <div
                    className={`border-2 ${formik.touched.cover && formik.errors.cover ? 'border-rose-500' : ''} flex flex-col gap-2 justify-center items-center ${
                      !formik.values?.cover && 'py-10'
                    } relative`}
                  >
                    <div className="">
                      <input
                      name='cover'
                      handleBlur={formik.handleBlur}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(event) => {
                          handleFileChange(event);
                        }}
                        ref={fileRef}
                      />
                      {formik.values?.cover ? (
                        <div className="">
                          <img
                            alt="cover"
                            className=""
                            src={
                              formik.values.cover
                                ? typeof formik.values.cover === 'string'
                                  ? formik.values.cover
                                  : URL.createObjectURL(formik.values.cover)
                                : ''
                            }
                            width={200}
                            height={100}
                          ></img>
                          <Tooltip title="Remove Image" arrow>
                            <button
                              className="absolute top-0 right-0"
                              onClick={handleRemoveImage}
                            >
                              <Trash2 />
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                        <Button
                          // size="sm"
                          onClick={() => {
                            fileRef.current.click();
                          }}
                          className="flex flex-row gap-1"
                        >
                          <Plus size={20} />
                          Add Cover Image
                        </Button>
                      )}
                    </div>
                  </div>
                  {formik.touched.cover && formik.errors.cover && (
                    <p className="text-red-600 text-center">
                      {formik.errors.cover}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={formik.handleSubmit}
                className="mt-2 capitalize block w-full lg:hidden"
              >
                {publishValue}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditBlog;
