'use client';
import { Button } from '../../../components/ui/button';
import { User, Users } from 'lucide-react';
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();
import React, { useRef, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import {
  Album,
  BookMarked,
  Briefcase,
  FileCheck2,
  FileSignature,
  Scale,
  ScanEye,
} from 'lucide-react';

import GoogleDrivePicker from '../shared/GoogleDrivePicker';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../components/ui/sheet';
import Login from '../../../components/Auth/authPages/login';
import { useMediaQuery } from '@mui/material';
import { Badge } from '../../../components/ui/badge';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '../../../components/Loading/Loading';
// import Loading from '@/app/loading';
// import dynamic from 'next/dynamic';
// const PDFViewer = dynamic(() => import('../../../components/PDFviewer/PdfViewer'), {
//   ssr: false,
// });
// import Login from '../../../components/Auth/authPages/login';

const actionLink = [
  {
    icon: <User className="lg:w-[28px] w-24 " />,
    title: 'Only Me',
    description: 'I am the sole signer',
    action: 'only-me',
  },
  {
    icon: (
      <div className="flex items-center gap-2">
        <User className="lg:w-[28px] w-6 " />
        <Users className="lg:w-[28px] w-6 " />
      </div>
    ),
    title: 'Me & Others',
    description: 'Others and I will sign',
    action: 'me-others',
  },
  {
    icon: (
      <div className="flex items-center gap-2">
        <Users className="lg:w-[28px] w-6 " />
        <Users className="lg:w-[28px] w-6 " />
      </div>
    ),
    title: 'Others only',
    description: 'Others will sign',
    action: 'others',
  },
];
const servicesMobile = [
  {
    title: 'e-Sign',
    icon: <FileSignature size={34} />,

    link: '/mobile',
  },
  {
    title: 'Agreement Management',
    icon: <Album size={34} />,

    link: '/mobile/agreement-management',
  },
  {
    title: 'Contract Management',
    icon: <Briefcase size={34} />,

    link: '/mobile/contract-management',
  },
  {
    title: 'Aadhaar e-Sign',
    icon: <ScanEye size={34} />,
    link: '/mobile/aadhaar-sign',
    badge: 'For India',
  },
  {
    title: 'e-Notary',
    icon: <FileCheck2 strokeWidth={1} size={34} />,
    link: '/mobile/e-notary',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Legal Notice',
    icon: <Scale strokeWidth={1} size={34} />,
    link: '/mobile/legal-notice',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Online e-Stamp',
    icon: <BookMarked strokeWidth={1} size={34} />,
    link: '/mobile/e-stamp',
    badge: 'For India',
    disabled: true,
  },
];
const services = [
  {
    title: 'e-Sign',
    icon: <FileSignature size={34} />,

    link: '/e-sign',
  },
  {
    title: 'Agreement Management',
    icon: <Album size={34} />,

    link: '/agreement-management',
  },
  {
    title: 'Contract Management',
    icon: <Briefcase size={34} />,

    link: '/contract-management',
  },
  {
    title: 'Aadhaar e-Sign',
    icon: <ScanEye size={34} />,
    link: '/aadhaar-sign',
    badge: 'For India',
  },
  {
    title: 'e-Notary',
    icon: <FileCheck2 strokeWidth={1} size={34} />,
    link: '/e-notary',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Legal Notice',
    icon: <Scale strokeWidth={1} size={34} />,
    link: '/legal-notice',
    badge: 'For India',
    disabled: true,
  },
  {
    title: 'Online e-Stamp',
    icon: <BookMarked strokeWidth={1} size={34} />,
    link: '/e-stamp',
    badge: 'For India',
    disabled: true,
  },
];

function Form({ setLoading }) {
  const path = usePathname();
  const [actions, setAction] = useState(null);
  const [files, setFiles] = useState([]);

  const [preview, setPreview] = useState([]);
  const fileRef = useRef();
  const [modalfile, setModalFile] = useState(null);
  const [modalfiledetails, setModalFiledetails] = useState(null);
  const [error, setError] = useState({
    status: false,
    message: {
      title: '',
      message: '',
    },
  });
  const [actionError, setActionError] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const googleDriveRef = useRef(null);
  const [open, isOpen] = useState(false);
  const [openFile, isOpenFile] = useState(false);
  const router = useRouter();
  const isBelow990px = useMediaQuery((theme) => theme.breakpoints.down(990));
  console.log(path);
  function handleFileChange(event) {
    console.log(event.target.files[0]);
    if (files.length > 0) {
      return;
    }
    if (window.FileReader && event.target.files[0]) {
      setFiles([...files, ...event.target.files]);
      const file = new FileReader();
      if (
        event.target.files[0] &&
        event.target.files[0].type.match('image.*')
      ) {
        file.onload = function () {
          setPreview([...preview, file.result]);
        };
        file.readAsDataURL(event.target.files[0]);
      } else {
        setPreview([...preview, null]);
      }
    }
  }

  function handlePreview() {
    console.log('Hello');
    // setFilePickAction(false);
    const file = files[0];
    console.log('click 1');
    if (file) {
      const fileReader = new FileReader();
      console.log('click 2');
      if (!file?.url) {
        console.log('click 3');
        fileReader.onload = (e) => {
          const dataUrl = e.target.result;

          // Set the source of the iframe to the data URL
          // iframeRef.current.src = dataUrl;
          console.log(file.type);
          setModalFiledetails(file);
          setModalFile(dataUrl);
          isOpenFile(true);
          // console.log(modalfile);
        };

        // Read the contents of the file as a data URL
        fileReader.readAsDataURL(file);
      } else {
        console.log('click 4');
        setModalFiledetails(file);
        setModalFile(file.url);
        isOpenFile(true);
        // fileReader.onload = (e) => {
        // 	const dataUrl = e.target.result;
        // 	console.log(dataUrl);
        // 	// Set the source of the iframe to the data URL
        // 	// iframeRef.current.src = dataUrl;
        // 	console.log(file.type);

        // 	setModalFile(dataUrl);
        // 	onOpen();
        // 	// console.log(modalfile);
        // };

        // // Read the contents of the file as a data URL
        // fileReader.readAsDataURL(file);
      }
    }
  }

  function handleSubmit() {
    if (!actions || files.length === 0) {
      if (!actions) {
        setActionError(true);
      }
      if (files.length === 0) {
        setFilesError(true);
      }
      return;
    }
    if (Cookies.get('accessToken')) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Cookies.get('accessToken')}`);
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Cache-Control', '');

      var formdata = new FormData();
      formdata.append('signees', '[]');
      formdata.append('participants', actions);
      files.map((e, i) => {
        formdata.append(`files`, files[i], `${files[i].name}`);
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://api.lawinzo.com/node/legalAgreement/addAgreement',
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const data = JSON.parse(result);
          console.log(data.data);
          const id = data.data._id;
          setAction(null);
          setFiles([]);
          if (typeof window !== 'undefined') {
            window.location.href = `https://sign.easedraft.com/document/new?id=${id}`;
          }
          setLoading(true);
        })
        .catch((error) => {
          setLoading(false);
          setError({
            status: true,
            message: {
              title: 'Please Retry',
              message: 'Something went wrong please retry after somtime.',
            },
          });
          console.log('error', error);
        });
    } else {
      isOpen(true);
    }
  }
  return (
    <>
      <div>
        <AlertDialog
          open={error.status}
          onOpenChange={() =>
            setError({
              message: {},
              status: !error.status,
            })
          }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{error.message.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {error.message.message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction className="text-background hover:bg-[#056b70d4]">
                Continue
              </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog open={openFile} onOpenChange={isOpenFile}>
          <DialogContent className="lg:max-w-[1000px] max-w-[90%]">
            <DialogHeader>
              <DialogTitle className="line-clamp-1 text-left">
                {modalfiledetails?.name.slice(0, 24)}
                {modalfiledetails?.name.length > 25 ? '... .pdf' : ''}
              </DialogTitle>
              <DialogDescription>
                <iframe
                  src={modalfile}
                  frameborder="0"
                  className="w-full md:min-h-[70vh] min-h-[500px]"
                ></iframe>
                {/* {modalfiledetails.id ? (
                  <iframe
                    src={modalfile}
                    frameborder="0"
                    className="w-full lg:min-h-[70vh] min-h-[500px]"
                  ></iframe>
                ) : (
                  <iframe
                    src={`http://view.officeapps.live.com/op/view.aspx?src=${modalfile}`}
                    frameborder="0"
                    className="w-full lg:min-h-[70vh] min-h-[500px]"
                  ></iframe>
                )} */}

                {/* <PDFViewer /> */}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="hidden lg:inline">
          <div className="grid grid-cols-3 lg:gap-5 gap-2">
            {actionLink.map((e, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setAction(e.action);
                    setActionError(false);
                  }}
                  className={`${
                    actions && actions == e.action
                      ? 'bg-[#3db1b7] text-gray-100 border-[#05686E] shadow-lg'
                      : 'text-gray-600'
                  } flex lg:flex-row ${
                    actionError && 'border-red-500 text-red-500'
                  } flex-col w-full h-full items-center lg:px-10 lg:p-3 py-3 px-1 lg:gap-5 gap-2 lg:aspect-[2/.5] border rounded-lg cursor-pointer hover:bg-[#3db1b7] hover:text-gray-100 hover:border-[#05686E] hover:shadow-lg`}
                >
                  {e.icon}
                  <div className="">
                    <h1 className="font-bold lg:text-xl text-sm lg:text-left text-center">
                      {e.title}
                    </h1>
                    <p className="text-sm lg:text-left text-center">
                      {e.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex relative flex-wrap gap-5 lg:justify-between justify-start items-start py-3 pt-6 border-b">
            <div className="flex items-center gap-8">
              <div className="">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(event) => {
                    handleFileChange(event);
                    setFilesError(false);
                  }}
                  ref={fileRef}
                />
                <Button
                  // size="sm"
                  onClick={() => {
                    if (files.length > 0) {
                      return;
                    }
                    fileRef.current.click();
                  }}
                  className={`font-semibold ${
                    filesError
                      ? 'border-red-500 text-red-500'
                      : 'border-[#05686E] text-[#05686E]'
                  } rounded-full border bg-transparent hover:bg-[#f7f7f7] lg:h-11 h-9 lg:px-5 px-3`}
                >
                  Choose File From Local
                </Button>
                <p
                  className={`text-sm font-semibold mt-1 text-gray-700 ${
                    filesError && 'text-red-500'
                  }`}
                >
                  Supported formats : .pdf
                </p>
              </div>
              {files.length > 0 && (
                <div className="flex items-center gap-2">
                  <h1>
                    {files[0]?.name.slice(0, 25)}
                    {files[0]?.name.length > 25 ? '.....' : ''}
                  </h1>
                  <Button
                    size="sm"
                    className="font-medium lg:inline hidden text-sm text-background"
                    onClick={handlePreview}
                  >
                    View file for preview
                  </Button>
                  {files.length > 1 && (
                    <>
                      <h1>+{files.length - 1} files</h1>
                      <Button
                        size="sm"
                        className="font-medium text-sm text-background"
                      >
                        View all
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex absolute right-0 lg:relative items-stretch lg:gap-3 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <GoogleDrivePicker
                      setFiles={setFiles}
                      files={files}
                      googleDriveRef={googleDriveRef}
                      setPreview={setPreview}
                      preview={preview}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="absolute lg:inline hidden top-12 -left-16 w-fit whitespace-nowrap">
                    <p className="text-background">Coming Soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <Button
                // size="sm"
                className="font-semibold rounded-full border bg-transparent border-[#05686E] text-[#05686E] hover:bg-[#f7f7f7] lg:h-11 h-9 lg:px-5 px-3"
              >
                Add Template
              </Button> */}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg mt-5 lg:hidden">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-lg font-bold">
              Select the Service
            </label>
            <video
              src="/images/easedraft.gif"
              autoPlay={true}
              loop
              muted
              className="rounded-lg w-10 aspect-square"
            ></video>
          </div>
          <Select
            onValueChange={(e) => {
              if (
                services.filter((el) => el.link === e && el.disabled === true)
                  .length > 0
              ) {
                return;
              }

              router.push(e);
            }}
            defaultValue={path === '/' ? '/e-sign' : path}
          >
            <SelectTrigger className="w-full py-3 mb-5 mt-2 flex items-center text-[#056a70ff] font-bold h-14 bg-background">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {services.map((e, i) => {
                console.log(e);
                return (
                  <SelectItem
                    disabled={e.disabled}
                    value={e.link}
                    className={``}
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        e.disabled ? 'opacity-60' : 'opacity-100'
                      }`}
                    >
                      {e.icon}{' '}
                      <h1
                        className={`text-lg ${
                          e.disabled ? 'opacity-60' : 'opacity-100'
                        }`}
                      >
                        {e.title}
                      </h1>
                      {e.badge && (
                        <h1
                          className={`text-sm px-3 py-1 border rounded-lg  ${
                            e.disabled ? 'bg-[#5e5d5d]' : 'bg-[#e86f3aff]'
                          }`}
                        >
                          {e.badge}
                        </h1>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-3 lg:gap-5 gap-2">
            {actionLink.map((e, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setAction(e.action);
                    setActionError(false);
                  }}
                  className={`${
                    actions && actions == e.action
                      ? 'bg-[#3db1b7] text-gray-100 border-[#05686E] shadow-lg'
                      : 'text-gray-600'
                  } flex lg:flex-row ${
                    actionError && 'border-red-500 text-red-500'
                  } flex-col w-full h-full items-center lg:px-10 lg:p-3 py-3 px-1 lg:gap-5 gap-2 lg:aspect-[2/.5] border rounded-lg cursor-pointer hover:bg-[#3db1b7] hover:text-gray-100 hover:border-[#05686E] hover:shadow-lg`}
                >
                  {e.icon}
                  <div className="">
                    <h1 className="font-bold lg:text-xl text-sm lg:text-left text-center">
                      {e.title}
                    </h1>
                    <p className="text-sm lg:text-left text-center">
                      {e.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex relative flex-wrap gap-5 lg:justify-between justify-start items-start py-3 pt-6 border-b">
            <div className="flex flex-col items-start gap-5">
              <div className="">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={(event) => {
                    handleFileChange(event);
                    setFilesError(false);
                  }}
                  ref={fileRef}
                />
                <Button
                  // size="sm"
                  onClick={() => fileRef.current.click()}
                  className={`font-semibold ${
                    filesError
                      ? 'border-red-500 text-red-500'
                      : 'border-[#05686E] text-[#05686E]'
                  } rounded-full border bg-transparent  hover:bg-[#f7f7f7] lg:h-11 h-9 lg:px-5 px-3`}
                >
                  Choose File From Local
                </Button>
                <p
                  className={`text-sm font-semibold mt-1 text-gray-700 ${
                    filesError && 'text-red-500'
                  }`}
                >
                  Supported formats : .pdf, .docx, .doc
                </p>
              </div>
              {files.length > 0 && (
                <div className="flex lg:items-stretch items-center flex-wrap gap-2">
                  <h1>
                    {files[0]?.name.slice(0, 25)}
                    {files[0]?.name.length > 25 ? '.....' : ''}
                  </h1>
                  <Button
                    size="sm"
                    className="font-medium whitespace-nowrap lg:inline hidden  lg:h-11 h-8 text-sm"
                    // onClick={() => {
                    //   // setFilePickAction(false);
                    //   const file = files[0];
                    //   console.log('click 1');
                    //   if (file) {
                    //     const fileReader = new FileReader();
                    //     console.log('click 2');
                    //     if (!file?.url) {
                    //       console.log('click 3');
                    //       fileReader.onload = (e) => {
                    //         const dataUrl = e.target.result;

                    //         // Set the source of the iframe to the data URL
                    //         // iframeRef.current.src = dataUrl;
                    //         console.log(file.type);
                    //         setModalFiledetails(file);
                    //         setModalFile(dataUrl);
                    //         isOpenFile(true);
                    //         // console.log(modalfile);
                    //       };

                    //       // Read the contents of the file as a data URL
                    //       fileReader.readAsDataURL(file);
                    //     } else {
                    //       console.log('click 4');
                    //       setModalFiledetails(file);
                    //       setModalFile(file.url);
                    //       isOpenFile(true);
                    //       // fileReader.onload = (e) => {
                    //       // 	const dataUrl = e.target.result;
                    //       // 	console.log(dataUrl);
                    //       // 	// Set the source of the iframe to the data URL
                    //       // 	// iframeRef.current.src = dataUrl;
                    //       // 	console.log(file.type);

                    //       // 	setModalFile(dataUrl);
                    //       // 	onOpen();
                    //       // 	// console.log(modalfile);
                    //       // };

                    //       // // Read the contents of the file as a data URL
                    //       // fileReader.readAsDataURL(file);
                    //     }
                    //   }
                    // }}
                    onClick={handlePreview}
                  >
                    View file for preview
                  </Button>
                  {files.length > 1 && (
                    <>
                      <h1 className="flex items-center">
                        +{files.length - 1} files
                      </h1>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            size="sm"
                            className="font-medium  lg:inline  lg:h-11 h-8 text-sm"
                          >
                            View all
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <ul>
                            {files.map((e, i) => {
                              return (
                                <li
                                  onClick={() => {
                                    // setFilePickAction(false);
                                    const file = e;
                                    // console.log('click 1');
                                    if (file) {
                                      const fileReader = new FileReader();
                                      // console.log('click 2');
                                      if (!file?.url) {
                                        // console.log('click 3');
                                        fileReader.onload = (e) => {
                                          const dataUrl = e.target.result;

                                          // Set the source of the iframe to the data URL
                                          // iframeRef.current.src = dataUrl;
                                          // console.log(file.type);
                                          // setModalFiledetails(file);
                                          // setModalFile(dataUrl);
                                          // isOpenFile(true);
                                          // console.log(modalfile);
                                        };

                                        // Read the contents of the file as a data URL
                                        fileReader.readAsDataURL(file);
                                      } else {
                                        // console.log('click 4');
                                        // setModalFiledetails(file);
                                        // setModalFile(file.url);
                                        // isOpenFile(true);
                                        // fileReader.onload = (e) => {
                                        // 	const dataUrl = e.target.result;
                                        // 	console.log(dataUrl);
                                        // 	// Set the source of the iframe to the data URL
                                        // 	// iframeRef.current.src = dataUrl;
                                        // 	console.log(file.type);
                                        // 	setModalFile(dataUrl);
                                        // 	onOpen();
                                        // 	// console.log(modalfile);
                                        // };
                                        // // Read the contents of the file as a data URL
                                        // fileReader.readAsDataURL(file);
                                      }
                                    }
                                  }}
                                  className="py-2 cursor-pointer hover:bg-accent px-4 border-b"
                                >
                                  {e.name.slice(0, 25)}{' '}
                                  {e.name.length > 25 ? '...' : ''}
                                </li>
                              );
                            })}
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex absolute right-0 lg:relative items-stretch lg:gap-3 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <GoogleDrivePicker
                      setFiles={setFiles}
                      files={files}
                      googleDriveRef={googleDriveRef}
                      setPreview={setPreview}
                      preview={preview}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="absolute lg:inline hidden top-12 -left-16 w-fit whitespace-nowrap">
                    <p className="text-background">Get file from drive</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <Button
                // size="sm"
                className="font-semibold rounded-full border bg-transparent border-[#05686E] text-[#05686E] hover:bg-[#f7f7f7] lg:h-11 h-9 lg:px-5 px-3"
              >
                Add Template
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="h-12 mt-5 lg:mt-0 text-background w-full lg:w-fit bg-[linear-gradient(90deg,rgba(230,135,92,1)30%,rgba(232,113,60,1)75%)] px-16 rounded-full font-bold text-xl lg:absolute -bottom-6 left-1/2 lg:-translate-x-1/2"
      >
        Submit
      </Button>
      <Sheet open={open} onOpenChange={isOpen}>
        <SheetContent
          side={isBelow990px ? 'bottom' : 'right'}
          className="lg:max-w-[40vw] max-w-[100vw] w-full"
        >
          <SheetHeader>
            <Login
              form={{
                actions,
                files,
              }}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Form;
