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
import { getAudio, createAudio } from 'components/Apis/voice';

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

const CreateVoiceModal = ({ handleClose, open, setUpdate }) => {
  const [name, setName] = useState('');
  const [categoryValue, setCategoryValue] = useState([]);
  const [language, setLanguage] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [audioFileError, setAudioFileError] = useState(false);
  const categoryOption = [
    'Natural',
    'Audiobooks',
    'E-learning',
    'Narration',
    'Games',
  ];
  const languages = ['English', 'Hindi', 'Bengali', 'Punjabi', 'Bihari'];
  const ageOptions = ['Child', 'Youth', 'Middle-Age', 'Older'];
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleCategoryChange = (event, value) => {
    setCategoryValue(value);
    setCategoryError(false);
  };

  const handleLanguageChange = (event, value) => {
    setLanguage(value);
    setLanguageError(false);
  };

  const handleAgeChange = (e, v) => {
    setAge(v);
    setAgeError(false);
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
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderError(false);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioFileError(false);
    } else {
      setAudioFileError(true);
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
    if (!language.length) {
      setLanguageError(!languageError);
      // return;
    }
    if (!age) {
      setAgeError(!ageError);
      // return;
    }
    if (!gender) {
      setGenderError(!genderError);
      // return;
    }
    if (!audioFile) {
      setAudioFileError(!audioFileError);
      // return;
    }
    if (!imageFile) {
      setImageError(!imageError);
      // return;
    }
    if (
      !name ||
      !categoryValue.length ||
      !language.length ||
      !age ||
      !gender ||
      !audioFile ||
      !imageFile
    ) {
      return;
    }
    // Handle audio upload and form submission
    const body = {
      name: name,
      audio: audioFile,
      image: imageFile,
      category: categoryValue,
      language: language,
      gender: gender,
      age: age,
    };
    try {
      const createdVoice = await createAudio(body);
      console.log('Voice created:', createdVoice);
      handleClose();
      setUpdate((prev) => !prev);
    } catch (error) {
      console.error('Error creating voice:', error);
    }

    handleClose();
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
          ...style,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <div className="flex justify-between">
          <Typography variant="h6" component="h2">
            Create Voice
          </Typography>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <TextField
            fullWidth
            label="Voice Name"
            value={name}
            error={nameError}
            color="secondary"
            helperText={nameError ? 'Voice name is required' : ''}
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
          <Autocomplete
            multiple
            id="language"
            options={languages}
            onChange={handleLanguageChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language"
                color="secondary"
                error={languageError}
                helperText={
                  languageError ? 'Language required is required' : ''
                }
              />
            )}
          />
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <Autocomplete
            id="age"
            options={ageOptions}
            onChange={handleAgeChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Age"
                color="secondary"
                error={ageError}
                helperText={ageError ? 'Age required is required' : ''}
              />
            )}
          />
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              style={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                value="male"
                color="secondary"
                control={<Radio color="secondary" />}
                label="Male"
                style={{ marginRight: '20px' }}
              />
              <FormControlLabel
                value="female"
                color="secondary"
                control={<Radio color="secondary" />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <FormLabel component="legend">Audio</FormLabel>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            required
          />
          {audioFileError && (
            <Typography variant="caption" color="error">
              Please select an audio file.
            </Typography>
          )}
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <FormLabel component="legend">Icon</FormLabel>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageError && (
            <Typography variant="caption" color="error">
              Please select an icon.
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

export default CreateVoiceModal;
