import { Box, Button, CircularProgress, Skeleton } from '@mui/material';
import React from 'react'
import { useState } from 'react';

const Categories = () => {
    const [loading,setLoading]=useState(false)
  return (
    <div>
         <section className="flex flex-col border-t">
        <div className=" flex flex-col items-center">
          <div className="w-full pb-5">
            <div className="flex flex-col gap-2 mt-5">

              {/* Create Blog  */}
              <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                  <h1 className="text-md font-semibold">Total Blogs</h1>
                  <p>{loading? <CircularProgress size={20}/>:"totalBlog"}</p>
                </div>
                <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                  <h1 className="text-md font-semibold">Published Blogs</h1>
                  <p>{loading? <CircularProgress size={20}/>:"publishedBlog"}</p>
                </div>
                <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                  <h1 className="text-md font-semibold">Not Published Blogs</h1>
                  <p>{loading? <CircularProgress size={20}/>: ""}</p>
                </div>
                <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                  <Button
                    className="w-full lg:w-fit"
                    size="lg"
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            
              <div className="flex flex-col">
                {loading ? (
                  <div className="flex flex-row gap-3">
                    <div className="">
                      <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    </div>
                    <div className="">
                      <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    </div>
                    <div className="">
                      <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    </div>
                    <div className="">
                      <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-12 bg-gray-200 px-2 py-4 border-b border-gray-950">
                      <div className="col-span-2 lg:col-span-1 font-semibold">Sno</div>
                      <div className="col-span-8 lg:col-span-6 font-semibold">Title</div>
                      <div className="col-span-2 hidden lg:grid font-semibold">Type</div>
                      <div className="col-span-2 hidden lg:grid font-semibold">Status</div>
                      <div className="col-span-2 lg:col-span-1 flex justify-end font-semibold">Action</div>
                    </div>
                   
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section >
    </div>
  )
}

export default Categories
