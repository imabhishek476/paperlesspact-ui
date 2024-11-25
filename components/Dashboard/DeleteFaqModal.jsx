'use client';
import  React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'components/ui/button';
import { Box } from '@mui/material';
import { deleteFaq } from '../Apis/faq';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: "15px",
  boxShadow: 24,
  p: 3,
};
const DeleteModal = ({ handleClose, open,setUpdate, faqId, setSnackMessage,setSeverity, setOpenSnack }) => {
    const deleteFaqById = async () => {
        try {
          
          if (faqId) {
            const res = await deleteFaq(faqId);
            if (res) {
              handleClose();
              setUpdate((prev) => !prev);
              setSnackMessage("FAQ Deleted Successfully")
              
              setOpenSnack(true);
            }
          } else {
            console.error("faqId not present");
            setSeverity('error')
            setSnackMessage("Something Went Wrong")
            handleClose();
          }
        } catch (error) {
          console.error(error);
          setSeverity('error')
          setSnackMessage("Something Went Wrong")
          setOpenSnack(true);
        }
      };
      
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{fontWeight:"550"}} id="modal-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <div className='my-2'>
              <Typography id="modal-modal-description">
                Are you sure want to delete the faq?
              </Typography>
            </div>
            
            <div className="flex justify-end gap-3 mt-5">
              <Button
                onClick={deleteFaqById}
                className="w-[18%] rounded-lg text-[#f31260] hover:bg-[#f3126033]"
                variant="light"
              >
                Yes
              </Button>
              <Button className="w-[18%] rounded-lg" onClick={handleClose}>No</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteModal;
