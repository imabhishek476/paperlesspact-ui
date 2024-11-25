import React, { useState } from 'react';
import { updateAudio } from 'components/Apis/voice';
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

const UpdateVoiceModel = ({ handleClose, open, voice, setUpdate }) => {
  const categoriesArray = voice.categories
    .replace(/^\[|\]$/g, '')
    .replace(/"/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split(',')
    .map((category) => category.trim());
  // const categoriesArray = JSON.parse(voice.categories)
  // .map((category) =>
  //   category.trim()
  // );
  // const languageArray = JSON.parse(voice.language).map((language) =>
  //   language.trim()
  // );
  const languageArray = voice?.language
    .replace(/^\[|\]$/g, '')
    .replace(/"/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split(',')
    .map((category) => category.trim());
  const [name, setName] = useState(voice?.name || '');
  const [category, setCategory] = useState(categoriesArray || null);
  const [language, setLanguage] = useState(languageArray || null);
  const [age, setAge] = useState(voice?.age || '');
  const [gender, setGender] = useState(voice?.gender || '');
  const [audioFile, setAudioFile] = useState(voice?.audio || null);
  const [nameError, setNameError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [audioFileError, setAudioFileError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageFile, setImageFile] = useState(voice?.image || null);

  const categoryOption = [
    'Natural',
    'Audiobooks',
    'Elearning',
    'Narration',
    'Games',
  ];
  const languages = ['English', 'Hindi', 'Bengali', 'Punjabi', 'Bihari'];
  const ageOptions = ['Child', 'Youth', 'Middle-Age', 'Older'];
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleCategoryChange = (e, value) => {
    setCategory(value);
    setCategoryError(false);
  };

  const handleLanguageChange = (e, value) => {
    setLanguage(value);
    setLanguageError(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleAgeChange = (e, value) => {
    setAge(value);
    setAgeError(false);
  };

  const handleGenderChange = (e, value) => {
    setGender(value);
    setGenderError(false);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioFileError(false);
  };

  const handleSubmit = async () => {
    if (!name) {
      setNameError(!nameError);
      // return;
    }
    console.log(category);
    if (!category.length) {
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
    if (
      !name ||
      !category.length ||
      !language.length ||
      !age ||
      !gender ||
      !audioFile
    ) {
      return;
    }
    const body = {
      name: name,
      category: category,
      language: language,
      age: age,
      gender: gender,
      audio: audioFile,
      image: imageFile,
    };
    console.log('body', body);
    try {
      await updateAudio(voice._id, body);

      handleClose();
      setUpdate((prev) => !prev);

      // refreshAudio();
    } catch (error) {
      console.error('Error updating voice:', error);
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
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <div className="flex justify-between">
          <Typography variant="h6" component="h2">
            Update Voice
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
            value={category}
            onChange={handleCategoryChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                error={categoryError}
                helperText={
                  categoryError ? 'Category required is required' : ''
                }
                color="secondary"
              />
            )}
          />
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <Autocomplete
            multiple
            id="language"
            options={languages}
            value={language}
            onChange={handleLanguageChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language"
                error={languageError}
                helperText={
                  languageError ? 'Language required is required' : ''
                }
                color="secondary"
              />
            )}
          />
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <Autocomplete
            id="age"
            options={ageOptions}
            value={age}
            onChange={handleAgeChange}
            getOptionLabel={(option) => option || ' '}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Age"
                error={ageError}
                helperText={ageError ? 'Age required is required' : ''}
                color="secondary"
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
            >
              <FormControlLabel
                value="male"
                color="secondary"
                control={<Radio color="secondary" />}
                label="Male"
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
          {audioFile && (
            <audio controls>
              <source src={audioFile} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <FormLabel component="legend">Upload different audio</FormLabel>
          <input type="file" accept="audio/*" onChange={handleAudioUpload} />
          {/* {audioFile && <Typography>{audioFile}</Typography>} */}
        </div>
        <div className="rounded pt-4 border-black border-solid">
          <FormLabel component="legend">Upload different icon</FormLabel>
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

export default UpdateVoiceModel;
