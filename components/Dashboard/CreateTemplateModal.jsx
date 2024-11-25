import {
  Autocomplete,
  Box,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  Popover,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { GalleryHorizontal, GalleryVertical } from 'lucide-react';

import { getCategoryById, createTemplate } from 'components/Apis/template';
import { Button } from 'components/ui/button';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

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

const CreateTemplateModal = ({ handleClose, open, category }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState({});
  const [categoryValue, setCategoryValue] = useState('');
  const [subCategoryValue, setSubCategoryValue] = useState('');
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [templateSubCategories, setTemplateSubCategories] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [pageOreintation, setPageOreintation] = useState('portrait');
  const [templateType, setTemplateType] = useState('document');
  const [pageSize, setPageSize] = useState({
    height: '1080px',
    width: '768px',
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;

  const pagesetupOptions = [
    {
      title: 'Letter',
      size: {
        height: '1056px',
        width: '816px',
      },
    },
    {
      title: 'A4',
      size: {
        height: '1080px',
        width: '768px',
      },
    },
    {
      title: 'Legal',
      size: {
        height: '1346px',
        width: '816px',
      },
    },
  ];

  const getSubCategory = async (id) => {
    if (id) {
      const res = await getCategoryById(id);
      console.log(res);
      if (res) {
        setTemplateSubCategories(res?.data?.ref?.subCategories);
      }
    }
  };

  useEffect(() => {
    console.log(categoryValue);
    getSubCategory(categoryValue?._id);
  }, [categoryValue]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    setNameError(false);
  };

  const handleRadioChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedOption = pagesetupOptions.find(
      (option) => option.title === selectedTitle
    );
    if (selectedOption) {
      setPageSize(selectedOption.size);
    }
  };

  const handleCategoryInputChange = (event, value) => {
    setCategoryValue(value);
    setCategoryError(false);

    if (!value) setShowSubCategory(false);
    else setShowSubCategory(true);
  };

  const handleSubCategoryInputChange = (event, value) => {
    setSubCategoryValue(value);
  };

  const createTemplateByName = async () => {
    if (!name || !categoryValue) {
      setNameError(!name);
      setCategoryError(!categoryValue);
      return;
    }
    let size = pageSize;
    if (templateType === 'presentation') {
      if (pageOreintation === 'portrait') {
        size = {
          height: '1024px',
          width: '576px',
        };
      } else {
        size = {
          width: '1024px',
          height: '576px',
        };
      }
    }
    const body = {
      fileJson: '{}',
      folderName: name,
      categoryId: categoryValue,
      subCategoryId: subCategoryValue,
      scope: 'global',
      isFile: '1',
      parentId: 'root',
      type:templateType,
      pageSetup: {
        orientation: pageOreintation,
        size: size,
      },
    };
    console.log(categoryValue?._id);
    const response = await createTemplate(body);
    console.log(response);
    if (response) {
      setName('');
      const id = response?.data?._id;
      if(response?.data?.type === "presentation"){
        window.open(`https://sign.easedraft.com/presentation/new?id=${id}`, '_blank');
      } else {
        window.open(`https://sign.easedraft.com/template/new?id=${id}`, '_blank');
      }
    }

    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Template
            </Typography>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="rounded pt-4 border-black border-solid">
            <TextField
              fullWidth
              label="Template Name"
              value={name}
              error={nameError}
              color="secondary"
              helperText={nameError ? 'Template name is required' : ''}
              onChange={handleChange}
            />
          </div>
          <div className="rounded pt-4 border-black border-solid">
            <Autocomplete
              value={categoryValue}
              onChange={handleCategoryInputChange}
              options={category}
              getOptionLabel={(option) => (option?.name ? option?.name : '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  color="secondary"
                  error={categoryError}
                  helperText={categoryError ? 'Category is required' : ''}
                />
              )}
            />
          </div>
          {showSubCategory && (
            <div className="rounded pt-4 border-black border-solid">
              <Autocomplete
                value={subCategoryValue}
                onChange={handleSubCategoryInputChange}
                options={templateSubCategories}
                color="secondary"
                getOptionLabel={(option) => (option?.name ? option?.name : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub Category"
                    color="secondary"
                  />
                )}
              />
            </div>
          )}
          <div className="rounded pt-4 border-black border-solid">
            <FormControl
              sx={{
                paddingLeft: '5px',
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label">
                Select Template Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={"document"}
                onChange={(e)=>setTemplateType(e.target.value)}
              >
                <FormControlLabel
                  value={'document'}
                  color="secondary"
                  control={<Radio color="secondary" />}
                  label={'Document'}
                />
                <FormControlLabel
                  value={'presentation'}
                  color="secondary"
                  control={<Radio color="secondary" />}
                  label={'Presentation'}
                />
              </RadioGroup>
            </FormControl>
          </div>
            <>
              <div className="rounded pt-4 border-black border-solid flex justify-between items-center relative">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h5"
                  sx={{
                    fontSize: '16px',
                  }}
                >
                  Page Orientation
                </Typography>
                <div>
                  <Button
                    className="rounded-full border-[#05868E] flex gap-2 items-center"
                    aria-describedby={popoverId}
                    color="secondary"
                    variant="outline"
                    onClick={handlePopoverClick}
                  >
                    {pageOreintation === 'portrait' ? (
                      <GalleryHorizontal size={15} />
                    ) : (
                      <GalleryVertical size={15} />
                    )}
                    {pageOreintation}
                  </Button>
                  <Popover
                    id={popoverId}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    sx={{ p: 2 }}
                  >
                    <div
                      className="p-4 flex flex-col gap-2 cursor-pointer"
                      onClick={handlePopoverClose}
                    >
                      <div
                        className="flex gap-2 items-center"
                        onClick={() => {
                          setPageOreintation('portrait');
                        }}
                      >
                        <GalleryHorizontal size={15} />
                        Portrait
                      </div>
                      <div
                        className="flex gap-2 items-center"
                        onClick={() => {
                          setPageOreintation('landscape');
                        }}
                      >
                        <GalleryVertical size={15} /> Landscape
                      </div>
                    </div>
                  </Popover>
                </div>
              </div>
              <div className="rounded pt-4 border-black border-solid">
                <FormControl
                  sx={{
                    paddingLeft: '5px',
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Select Page Size
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Letter"
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
                  >
                    {pagesetupOptions?.map((option, index) => {
                      return (
                        <FormControlLabel
                          disabled={templateType==="presentation"}
                          key={index}
                          value={option.title}
                          color="secondary"
                          control={<Radio color="secondary" />}
                          label={option.title}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </div>
            </>
          <div className="flex justify-end mt-5">
            <Button
              onClick={createTemplateByName}
              className="border rounded-md"
              variant="default"
            >
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTemplateModal;
