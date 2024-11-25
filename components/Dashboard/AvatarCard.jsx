import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UpdateAvatarModal from './UpdateAvatarModal';
import { Snackbar, Alert, Chip } from '@mui/material';
import { HardDriveUpload, Pencil, Trash } from 'lucide-react';
import { publishAvatar, deleteAvatar } from 'components/Apis/Avatar';
import { Play } from 'lucide-react'; // Assuming this is for playing audio

const AvatarCard = ({
  avatar,
  refreshAvatar,
  setSnackMessage,
  setSnackOpen,
  setSnackSuccess,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [snackOpen, setSnackOpen] = useState(false);
  // const [snackMessage, setSnackMessage] = useState('');
  // const [snackSuccess, setSnackSuccess] = useState('success');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handlePublish = async () => {
    const res = await publishAvatar(avatar._id);
    if (res) {
      setSnackOpen(true);
      setSnackMessage('Published Successfully');
      setSnackSuccess('success');
      console.log('chal raha');
      refreshAvatar();
    } else {
      setSnackOpen(true);
      setSnackMessage('Something went wrong');
      setSnackSuccess('error');
    }
  };
  const handleDelete = async () => {
    const res = await deleteAvatar(avatar._id);
    if (res) {
      setSnackOpen(true);
      setSnackMessage('Deleted Successfully');
      setSnackSuccess('success');

      await refreshAvatar();
    } else {
      setSnackOpen(true);
      setSnackMessage('Something went wrong');
      setSnackSuccess('error');
    }
  };
  const categoriesArray = avatar?.category
    ?.replace(/^\[|\]$/g, '')
    ?.replace(/"/g, '')
    ?.replace(/\[/g, '')
    ?.replace(/\]/g, '')
    ?.split(',')
    // const categoriesArray = JSON.parse(voice.categories)
    ?.map((category) => category.trim());
  return (
    <>
      {
        // <Snackbar
        //   open={snackOpen}
        //   autoHideDuration={2000}
        //   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        //   sx={{
        //     zIndex: 1000,
        //     mt: 10,
        //   }}
        //   onClose={() => setSnackOpen(false)}
        // >
        //   <Alert
        //     onClose={() => setSnackOpen(false)}
        //     severity={snackSuccess}
        //     variant="filled"
        //     sx={{ width: '100%', pr: 3, pl: 3 }}
        //   >
        //     {snackMessage}
        //   </Alert>
        // </Snackbar>
      }
      <UpdateAvatarModal
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        avatar={avatar}
        refreshAvatar={refreshAvatar}
      />
      <div
        className="flex items-center justify-between h-full w-full  shadow-sm rounded-lg border relative to-black hover:scale-y-105 hover:shadow-lg mr-[30px] "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full w-full m-2 flex flex-col justify-start">
          <div className="pt-5 pl-3 ">
            <span className="text-lg font-bold flex">{avatar.name}</span>
          </div>

          <div className=" grid grid-cols-2 ml-1  pb-3 gap-2">
            {categoriesArray &&
              categoriesArray.map((category, index) => (
                <Chip label={category} size="small" style={{ text: '20px' }} />
              ))}
          </div>
          {isHovered && (
            <Popover>
              <PopoverTrigger className="absolute top-0 right-3">
                <button className="bg-transparent hover:bg-transparent border-none shadow-none py-0">
                  <MoreHorizIcon sx={{ color: 'black' }} />
                </button>
              </PopoverTrigger>

              <PopoverContent className="max-w-[100px]">
                <div className="flex flex-col gap-2">
                  <div
                    onClick={() => setOpenUpdateModal(true)}
                    className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
                  >
                    <Pencil size={15} />
                    Edit
                  </div>
                  <div
                    onClick={handlePublish}
                    className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
                  >
                    <HardDriveUpload size={15} />
                    Publish
                  </div>

                  <div
                    onClick={handleDelete}
                    className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
                  >
                    <Trash size={15} /> Delete
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <img
          className="w-[100px] h-[100px]  mr-[4px] rounded  "
          src={avatar.image} // Assuming image URL is in the avatar object
          alt={avatar.name}
        />
      </div>
    </>
  );
};

export default AvatarCard;
