import { Autocomplete, Box, Modal, TextField, Typography } from '@mui/material'
import { getCategoryById, createTemplate } from 'components/Apis/template';
import { Button } from 'components/ui/button';
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'


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


const CreateTemplateModal = ({handleClose, open, category, templatesData,setTemplateData}) => {
    const [name, setName] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [subCategoryValue, setSubCategoryValue] = useState('');
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [templateSubCategories, setTemplateSubCategories] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    

    const getSubCategory = async (id) => {
        if(id){
            const res = await getCategoryById(id);
            console.log(res)
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
      const body = {
            fileJson: "{}",
            folderName:name,
            categoryId:categoryValue,
            subCategoryId:subCategoryValue,
            scope:"global",
            isFile: '1',
            parentId: 'root'
        };
        console.log(categoryValue?._id)
        const response = await createTemplate(body);
        if (response) {
            const id = response?.data?._id;
            window.open(`https://sign.easedraft.com/template/new?id=${id}`,'_blank')
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
                <div className='flex justify-between'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create Template
                </Typography>
                <button onClick={handleClose}><CloseIcon/></button>
                </div>
                <div className='rounded pt-4 border-black border-solid'>
                    <TextField
                        fullWidth
                        label="Template Name"
                        value={name}
                        error={nameError}
                        color='secondary'
                        helperText={nameError ? "Template name is required" : ""}
                        onChange={handleChange}
                    />
                </div>
                <div className='rounded pt-4 border-black border-solid'>
                    <Autocomplete
                        value={categoryValue}
                        onChange={handleCategoryInputChange}
                        options={category}
                        getOptionLabel={(option) => option?.name? option?.name: ''}
                        renderInput={(params)=> <TextField 
                            {...params} 
                            label="Category"
                            color='secondary'
                            error={categoryError} 
                            helperText={categoryError ? "Category is required" : ""}
                        /> }
                    />
                </div>
                {
                    showSubCategory && 
                    <div className='rounded pt-4 border-black border-solid'>
                    <Autocomplete
                        value={subCategoryValue}
                        onChange={handleSubCategoryInputChange}
                        options={templateSubCategories}
                        color='secondary'
                        getOptionLabel={(option) => option?.name ? option?.name : ''}
                        renderInput={(params)=> <TextField {...params} label="Sub Category" /> }
                    />
                    </div>
                }
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
      )
    }