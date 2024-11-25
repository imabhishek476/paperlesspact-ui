import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PauseIcon from '@mui/icons-material/Pause';
import { Typography, Snackbar, Alert, Chip } from '@mui/material';
import UpdateVoiceModel from './UpdateVoiceModal';
import { Play } from 'lucide-react';
import { HardDriveUpload, Pencil, Trash } from 'lucide-react';
import {
  createAudio,
  updateAudio,
  getAudio,
  publishAudio,
  deleteAudio,
} from 'components/Apis/voice';
const VoiceCard = ({
  voice,
  setUpdate,
  setSnackMessage,
  setSnackOpen,
  setSnackSuccess,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [play, setPlay] = useState(false);
  // const [snackOpen, setSnackOpen] = useState(false);
  // const [snackMessage, setSnackMessage] = useState('');
  // const [snackSuccess, setSnackSuccess] = useState('success');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [action, setAction] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const categoryOption = [
    { category: 'Natural' },
    { category: 'Audiobooks' },
    { category: 'Elearning' },
    { category: 'Narration' },
    { category: 'Games' },
  ];
  const categoriesAndLanguage = `${voice.categories}`;
  const categoriesArray = categoriesAndLanguage
    .replace(/^\[|\]$/g, '')
    .replace(/"/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split(',')
    .map((category) => category.trim());
  const handlePublish = async () => {
    const response = await publishAudio(voice._id); // Call the API to publish the voice
    if (response) {
      console.log('publish');
      setSnackOpen(true);
      setSnackMessage('Publish Successfully');
      setSnackSuccess('success');
      setUpdate((prev) => !prev);
      // refreshAudio();
    } else {
      setSnackOpen(true);
      setSnackMessage('Something Went Wrong');
      setSnackSuccess('warning');
    }
  };
  // Function to handle editing a voice
  const handleEdit = async () => {
    try {
      await updateAudio(voice._id); // Call the API to edit the voice
      console.log('edit');
      setSnackOpen(true);
      setSnackMessage('Edit Successfully');
      setSnackSuccess('success');
      setUpdate((prev) => !prev);
    } catch (error) {
      console.error('Error editing audio data:', error);
      setSnackOpen(true);
      setSnackMessage('Something Went Wrong');
      setSnackSuccess('warning');
    }
  };

  const handleDelete = async () => {
    const res = await deleteAudio(voice._id);
    if (res) {
      console.log('delete');
      setSnackOpen(true);
      setSnackMessage('Deleted Successfully');
      setSnackSuccess('success');
      setUpdate((prev) => !prev);
    } else {
      setSnackOpen(true);
      setSnackMessage('Something Went Wrong');
      setSnackSuccess('warning');
    }
  };
  const [audio] = useState(new Audio(voice.audio)); // Initialize audio element with the URL

  // Function to play the audio
  const playMusic = () => {
    if (!play) {
      audio.play();
    } else {
      audio.pause();
    }
    setPlay((prevPlay) => !prevPlay);
  };

  return (
    <>
      {/* {snackOpen && (
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
      )} */}
      <UpdateVoiceModel
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        voice={voice}
        setUpdate={setUpdate}
        // refreshAudio={refreshAudio}
      />

      <div
        className="flex items-center h-[120px]  shadow-sm  rounded-lg border relative to-black hover:scale-y-105 hover:shadow-lg mr-[30px] pr-[30px]"
        //   key={voice.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="ml-5 -mt-2 p-3 rounded-full bg-blue-100 cursor-pointer hover:bg-blue-300"
          onClick={playMusic}
        >
          {!play ? <Play size={20} /> : <PauseIcon size={20} />}
        </div>

        <div className="h-full w-full justify-start flex flex-col mt-8 mb-4 ml-4">
          <div className="flex gap-2 pt-2 ml-[10px] ">
            <span> {voice?.name}</span>
            {isHovered && (
              <Popover>
                <PopoverTrigger className="absolute top-2 right-2">
                  <button className="bg-transparent hover:bg-transparent border-none shadow-none py-0">
                    <MoreHorizIcon sx={{ color: 'black' }} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className=" max-w-[100px]">
                  <div className="flex flex-col gap-2">
                    {/* {Number(item?.isPublished) === 0 && ( */}
                    <div
                      onClick={handlePublish}
                      className="flex transition-all duration-300 flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer"
                    >
                      <HardDriveUpload size={15} />
                      Publish
                    </div>
                    {/* )} */}
                    <div
                      onClick={() => setOpenUpdateModal(true)}
                      className="flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
                    >
                      <Pencil size={15} />
                      Edit
                    </div>
                    <div
                      onClick={handleDelete}
                      className="flex flex-row items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
                    >
                      <Trash size={15} /> Delete
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="grid grid-cols-2  gap-1">
            {categoriesArray.map((category, index) => (
              <Chip label={category} size="small" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceCard;
