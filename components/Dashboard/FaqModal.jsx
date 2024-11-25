'use client';
import {
  Autocomplete,
  Box,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { Button } from 'components/ui/button';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postFaq } from 'components/Apis/faq';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: '20px 28px !important',
};

const pageLists = [
  '/',
  'blog',
  'dashboard',
  'about-us',
  'pricing',
  'contract-management',
  'aadhaar-sign',
];

const pageList = [
  {
    title: 'Home',
    value: '/home',
  },
  {
    title: 'Blog',
    value: 'blog',
  },
  {
    title: 'Admin Dashboard',
    value: 'dashboard',
  },

  {
    title: 'About Us',
    value: 'about-us',
  },
  {
    title: 'Pricing',
    value: 'pricing',
  },
  {
    title: 'Contract Management',
    value: 'contract-management',
  },
  {
    title: 'Aadhaar e-Sign',
    value: 'aadhaar-sign',
  },
];

const FaqModal = ({
  closeModal,
  openModal,
  setSnackMessage,
  setSeverity,
  setOpenSnack,
  setUpdate,
}) => {
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(null);
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [contentError, setContentError] = useState(false);
  // const [shrinkTitleValue, setShrinkTitleValue] = useState(false)
  // const [shrinkContentValue, setShrinkContentValue] = useState(false)

  const handleReset = () =>{
    setTitle("");
    setContent("");
    setPage("");
    setContentError(false);
    setTitleError(false);
    setPageError(false);
  }


  //Add faq or Post Faq
  const handleClose = async () => {
    
    title ? setTitleError(false) : setTitleError(true);
    content ? setContentError(false) : setContentError(true);
    page ? setPageError(false) : setPageError(true);

    if(!title && !content && !page){
      setTitleError(true);
      setContentError(true)
      setPageError(true);
      return;
    }
    if(!title){
      setTitleError(true);
      return
    }else{
      if(!content){
        setContentError(true);
        return
      }
      else{
        if(!page){
          setPageError(true);
          return
        }
      }
    }

    try {
      console.log(page)
      const res = await postFaq(title, content, page);

      if (res) {
        setUpdate((prev) => !prev);
        setSnackMessage('FAQ Created Successfully');
        setOpenSnack(true);
        handleReset();
        closeModal();
      }
    } catch (error) {
      console.error('Error creating FAQ:', error);
      // alert(error);
      setSeverity('error')
      setSnackMessage("Something Went Wrong")
      setOpenSnack(true);
      closeModal();
    }
  };

  const handleTitleChange = (event, value) => {
    setTitle(event.target.value);
    setTitleError(false);
    console.log(event.target.value);

    if (!value) {
      setTitleError(false);
    } else setTitleError(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // setPageError(false);
    // if(value?.title){
    //   setPageError(false);
    // }

    console.log(value);
    if (value) {
      setPageError(false);
    } else setPageError(true);
  };

  const handleContentChange = (event, value) => {
    setContent(event.target.value);
    setContentError(false);

    if (!value) {
      setContentError(false);
    } else setContentError(true);
  };
  console.log(page);

  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New FAQ
            </Typography>
            <button onClick={()=>{closeModal();handleReset()}}>
              <CloseIcon />
            </button>
          </div>
          <div className="rounded pt-4 border-black border-solid">
            <TextField
              variant="outlined"
              fullWidth
              color="secondary"
              label="Title"
              value={title}
              error={titleError}
              helperText={titleError ? 'Title is required' : ''}
              onChange={handleTitleChange}
            />
          </div>
          <div className="rounded pt-4 border-black border-solid">

            <Autocomplete
              variant="outlined"
              fullWidth
              value={page? page: null}
              color="secondary"
              options={pageList}
              onChange={handlePageChange}
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, value) =>
                option.title === value.title
              }
              renderInput={(params) => <TextField {...params} error={pageError} helperText={pageError ? 'Page is required' : ''} label="Page" />}
              label="Page"
              
              
            />
          </div>
          <div className="rounded pt-4  border-black border-solid">
            <TextField
              variant="outlined"
              multiline
              fullWidth
              rows={4}
              color="secondary"
              placeholder="Type your Message"
              label="Message"
              value={content}
              error={contentError}
              helperText={contentError ? 'Some message is required' : ''}
              onChange={handleContentChange}
            />
          </div>
          <div className="flex justify-end mt-5">
            <Button onClick={handleClose}>Create</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default FaqModal;
