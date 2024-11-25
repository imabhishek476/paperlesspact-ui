import { Autocomplete, Box, Modal, TextField, Typography } from '@mui/material'
import { getCategoryById, getAllCategory, createSubCategory, updateSubCategoryById } from 'components/Apis/template';
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
    '@media (max-width: 600px)': {
        width: '100%',
        maxWidth: 350,
      },
  };




const CreateSubCategoryModal = ({handleClose, open, setUpdate, setSnackOpen, setSnackSuccess, setSnackMessage,handleNameChange, name,setName, nameError,setNameError,editMode,setEditMode,editCategoryId,subCategoryId,editSubCategoryId,setEditSubCategoryId,editCategoryName,setLoading}) => {
    const [category, setCategory] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    
    const handleCloseModel = () => {
      console.log("hi")
      setName("")
      setCategoryValue("")
      setNameError(false)
      setCategoryError(false)
      setEditSubCategoryId("")
      setEditMode(false)
      handleClose()
    }

    const getOneCategory = async (id) => {
        if(id){
            const res = await getCategoryById(id);
            console.log(res)
            if (res) {
              setCategoryName(res?.data?.ref?.name);
            }
        }
    };



    const getCategory = async () => {
        const res = await getAllCategory(null,null,'1');
        if (res) {
          console.log(res);
          setCategory(res.data.ref)
        }
      };

    
      useEffect(() => {
        getCategory();
      }, []);
  
  
    const handleCategoryInputChange = (event, value) => {
      setCategoryValue(value);
      setCategoryError(false);
  
      if (!value) setShowSubCategory(false);
      else setShowSubCategory(true);
    };
  
    const handleSubCategoryInputChange = (e) => {
      setName(e.target.value);
      setNameError(false);
    };

    const createSubCategoryByName =async ()=>{
        if (!name || !categoryValue) {
            setNameError(!name);
            setCategoryError(!categoryValue);
            return;
          }
          const body = {
            name:name,
            categoryId:categoryValue,
        };
        setLoading(true)
        console.log(categoryValue?._id)
        const response = await createSubCategory(body);
        setUpdate((prev) => !prev)
        if (response) {
            setName('')
            const id = response?.data?._id;
            setSnackOpen(true)
            setSnackSuccess('success')
            setSnackMessage("Created Successfully")
        }
        setName('')
      handleCloseModel();
    }

    const updateSubCategory =async()=>{
        if(!name){
            setNameError(!name);
        return;
        }

        const body = {
            subCategoryId:editSubCategoryId,
            name:name
        };
        setLoading(true)
        const response = await updateSubCategoryById(body);
        if (response) {
            setUpdate(prev=>!prev)
            setSnackOpen(true)
            setSnackSuccess('success')
            setSnackMessage("Updated Successfully")
        }
        handleCloseModel();
    }


  return (
    <div>
        <Modal
          open={open}
          onClose={handleCloseModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            {/* {
                Object.keys(editData).length>0 ? (
                    <Box sx={style}>
            <div className='flex justify-between'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit SubCategory
            </Typography>
            <button onClick={()=>{handleClose(),nameReset()}}><CloseIcon/></button>
            </div>

            
            
            <div className='rounded pt-4 border-black border-solid'>
            <TextField
                    fullWidth
                    disabled
                    label="Category"
                    value={categoryName}
                    color='secondary'
                />
            </div>
            <div className='rounded pt-4 border-black border-solid'>
                <TextField
                    fullWidth
                    label="Sub Category Name"
                    value={newName}
                    error={nameError}
                    color='secondary'
                    helperText={nameError ? "Sub Category name is required" : ""}
                    onChange={handleNewNameChange}
                />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={updateSubCategory}
                className="border rounded-md"
                variant="default"
              >
                Update
              </Button>
            </div>
          </Box>
                ) : ( */}
                    <Box sx={style}>
            <div className='flex justify-between'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {editMode ? "Update" : "Create"} Sub Category
            </Typography>
            <button onClick={handleCloseModel}><CloseIcon/></button>
            </div>

            {
              editMode && (<>
              <div className='rounded pt-4 border-black border-solid'>
              <TextField
                      fullWidth
                      disabled
                      label="Category"
                      value={editCategoryName}
                      color='secondary'
                  />
              </div>
              <div className='rounded pt-4 border-black border-solid'>
              <TextField
                  fullWidth
                  label="Sub Category Name"
                  value={name}
                  error={nameError}
                  color='secondary'
                  helperText={nameError ? "Sub Category name is required" : ""}
                  onChange={handleSubCategoryInputChange}
              />
          </div>
          </>
              )
            }
            
            {
              !editMode &&(
                <>
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
                <TextField
                    fullWidth
                    label="Sub Category Name"
                    value={name}
                    error={nameError}
                    color='secondary'
                    helperText={nameError ? "Sub Category name is required" : ""}
                    onChange={handleSubCategoryInputChange}
                />
            </div>
            }
                </>
              )
            }
            <div className="flex justify-end mt-5">
              {editMode?<Button
              onClick={updateSubCategory}
              className="border rounded-md"
              variant="default"
            >
              Update
            </Button> :
              <Button
              onClick={createSubCategoryByName}
              className="border rounded-md"
              variant="default"
            >
              Create
            </Button>
              }
            </div>
          </Box>
                {/* )
            } */}
          
        </Modal>
    </div>
  )
}

export default CreateSubCategoryModal