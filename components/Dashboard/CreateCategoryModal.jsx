import { Autocomplete, Box, Modal, TextField, Typography } from '@mui/material'
import { createCategory, getCategoryById, updateCategoryById } from 'components/Apis/template';
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
const CreateCategoryModal = ({ handleClose, open, setUpdate, setSnackOpen, setSnackSuccess, setSnackMessage, handleNameChange, name, nameError, setNameError, editCategoryId, setName, editMode, setEditMode, setEditCategoryId }) => {

  const createCategoryByName = async () => {
    if (!name) {
      setNameError(!name);
      return;
    }
    
    const body = {
      categoryName: name
    };
    const response = await createCategory(body);
    setUpdate((prev) => !prev)
    if (response) {
      setSnackOpen(true)
      setSnackSuccess('success')
      setSnackMessage("Created Successfully")
      console.log(response)
    }
    setName("")
    handleClose();
  }
  const updateCategory = async () => {
    if (!name) {
      setNameError(!name);
      return;
    }
    const body = {
      categoryId: editCategoryId,
      name: name
    };
    const response = await updateCategoryById(body);
    if (response) {
      setUpdate(prev => !prev)
      setSnackOpen(true)
      setSnackSuccess('success')
      setSnackMessage("Updated Successfully")
    }
    handleClose();
  }
  const handleCloseModel = () => {
    console.log("hi")
    setName("")
    setNameError(false)
    setEditCategoryId("")
    setEditMode(false)
    handleClose()
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex justify-between'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {editMode ? "Update" : "Create"} Category
            </Typography>
            <button onClick={handleCloseModel}><CloseIcon /></button>
          </div>
          <div className='rounded pt-4 border-black border-solid'>
            <TextField
              fullWidth
              label="Category Name"
              value={name}
              error={nameError}
              color='secondary'
              helperText={nameError ? "Category name is required" : ""}
              onChange={handleNameChange}
            />
          </div>

          <div className="flex justify-end mt-5">
            {editMode ? <Button
              onClick={updateCategory}
              className="border rounded-md"
              variant="default"
            >
              Update
            </Button> :
              <Button
                onClick={createCategoryByName}
                className="border rounded-md"
                variant="default"
              >
                Create
              </Button>}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateCategoryModal