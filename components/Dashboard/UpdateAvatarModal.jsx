import React, { useState } from 'react';
import { updateAvatar } from 'components/Apis/Avatar';
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

const UpdateAvatarModel = ({ handleClose, open, avatar, refreshAvatar }) => {
  const categoriesArray = avatar?.category
    ?.replace(/^\[|\]$/g, '')
    ?.replace(/"/g, '')
    ?.replace(/\[/g, '')
    ?.replace(/\]/g, '')
    ?.split(',')
    ?.map((category) => category.trim());
  const [name, setName] = useState(avatar?.name || '');
  const [category, setCategory] = useState(categoriesArray || []);
  const [imageFile, setImageFile] = useState(avatar?.image || null);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const categoryOption = [
    'Natural',
    'Audiobooks',
    'E-learning',
    'Narration',
    'Games',
  ];
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e, value) => {
    setCategory(value || e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!name) {
      setNameError(!name);
      // return;
    }
    if (!category.length) {
      setCategoryError(!categoryError);
      // return;
    }

    if (!name || !category.length) {
      return;
    }
    const body = {
      name: name,
      category: category,
      image: imageFile,
    };

    try {
      await updateAvatar(avatar._id, body);
      handleClose();
      refreshAvatar();
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 24,
          p: '20px 28px !important',
        }}
      >
        <div className="flex justify-between">
          <Typography variant="h6" component="h2">
            Update Avatar
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
            value={category}
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
          <FormLabel component="legend">Avatar</FormLabel>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            onClick={handleSubmit}
            className="border rounded-md"
            variant="default"
          >
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateAvatarModel;
