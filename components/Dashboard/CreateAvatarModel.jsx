import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Autocomplete,
  Box,
  Modal,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GalleryHorizontal, GalleryVertical } from 'lucide-react';
import { createAvatar } from 'components/Apis/Avatar';

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
  '@media (max-width: 600px)': {
    width: '100%',
    maxWidth: 350,
  },
};

const CreateAvatarModal = ({ handleClose, open, refreshAvatar }) => {
  const [name, setName] = useState('');
  const [categoryValue, setCategoryValue] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryOption = [
    'Natural',
    'Audiobooks',
    'E-learning',
    'Narration',
    'Games',
  ];
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleCategoryChange = (event, value) => {
    setCategoryValue(value);
    setCategoryError(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setNameError(!name);
      // return;
    }
    if (!categoryValue.length) {
      setCategoryError(!categoryError);
      // return;
    }
    if (!imageFile) {
      setImageError(!imageError);
      // return;
    }
    if (!name || !categoryValue.length || !imageFile) {
      return;
    }
    const body = {
      name: name,
      image: imageFile,
      category: categoryValue,
    };
    try {
      const createdAvatar = await createAvatar(body);
      console.log('Avatar created:', body);
      handleClose();
    } catch (error) {
      console.error('Error creating avatar:', error);
    }

    handleClose();
    refreshAvatar();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between">
          <Typography variant="h6" component="h2">
            Create Avatar
          </Typography>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <TextField
            fullWidth
            label="Avatar Name"
            value={name}
            error={nameError}
            color="secondary"
            helperText={nameError ? 'Avatar name is required' : ''}
            onChange={handleNameChange}
          />
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <Autocomplete
            multiple
            id="categories"
            options={categoryOption}
            onChange={handleCategoryChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                color="secondary"
                error={categoryError}
                helperText={
                  categoryError ? 'Category required is required' : ''
                }
              />
            )}
          />
        </div>

        <div className="rounded pt-4 border-black border-solid">
          <FormLabel component="legend">Image</FormLabel>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageError && (
            <Typography variant="caption" color="error">
              Please select an image file.
            </Typography>
          )}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            onClick={handleSubmit}
            className="border rounded-md"
            variant="default"
          >
            Create
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAvatarModal;
