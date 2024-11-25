'use client';
import React, { useState } from 'react';
import Blogs from '../../../../components/Dashboard/Blogs';
import Template from '../../../../components/Dashboard/Template';
import Category from '../../../../components/Dashboard/Category';
import SubCategory from '../../../../components/Dashboard/SubCategory';
import Voice from '../../../../components/Dashboard/Voice';
import Avatar from '../../../../components/Dashboard/Avatar';
import AdminFaq from '../../../../components/Dashboard/Faq';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FileStack, NotebookPen } from 'lucide-react';
import { Box, Tab, Tabs, colors } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
const Dashboard = () => {
  const [active, setActive] = useState('blog');
  const [totalBlog, setTotalBlog] = useState(0);
  const [totalTemplate, setTotalTemplate] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalSubCategory, setTotalSubCategory] = useState(0);
  const [value, setValue] = useState('1');
  const [totalFAQ, setTotalFAQ] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <section className="min-h-screen lg:pt-20 pt-32 flex flex-col bg-[linear-gradient(180deg,rgba(0,19,20,1)30%,rgba(0,142,151,1)75%)] mb-10">
        <div className="container flex flex-col items-center">
          <div className="border rounded-md bg-white w-full">
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex flex-row justify-between px-5 py-3 gap-5">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList
                        TabIndicatorProps={{
                          style: { backgroundColor: '#E7713C' },
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<NotebookPen size={20} />}
                          iconPosition="start"
                          label="Blogs"
                          value="1"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<FileStack size={20} />}
                          iconPosition="start"
                          label="Templates"
                          value="2"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<QuizOutlinedIcon />}
                          iconPosition="start"
                          label="faqs"
                          value="3"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<CategoryOutlinedIcon />}
                          iconPosition="start"
                          label="Categories"
                          value="4"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<AccountTreeOutlinedIcon />}
                          iconPosition="start"
                          label="Sub Categories"
                          value="5"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<AudiotrackIcon />}
                          iconPosition="start"
                          label="Voice"
                          value="6"
                        />
                        <Tab
                          sx={{
                            '&.Mui-selected': {
                              color: '#05685E',
                            },
                          }}
                          icon={<AccountCircleIcon />}
                          iconPosition="start"
                          label="Avatar"
                          value="7"
                        />
                      </TabList>
                    </Box>
                    <TabPanel className="!p-0" value="1">
                      <Blogs
                        totalBlog={totalBlog}
                        setTotalBlog={setTotalBlog}
                      />
                    </TabPanel>
                    <TabPanel className="!p-0" value="2">
                      <Template
                        totalTemplate={totalTemplate}
                        setTotalTemplate={setTotalTemplate}
                      />
                    </TabPanel>
                    <TabPanel className="!p-0" value="3">
                      <AdminFaq totalFAQ={totalFAQ} setTotalFAQ={setTotalFAQ} />
                    </TabPanel>
                    <TabPanel className="!p-0" value="4">
                      <Category
                        totalCategory={totalCategory}
                        setTotalCategory={setTotalCategory}
                      />
                    </TabPanel>
                    <TabPanel className="!p-0" value="5">
                      <SubCategory
                        totalSubCategory={totalSubCategory}
                        setTotalSubCategory={setTotalSubCategory}
                      />
                    </TabPanel>
                    <TabPanel className="!p-0" value="6">
                      <Voice />
                    </TabPanel>
                    <TabPanel className="!p-0" value="7">
                      <Avatar />
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
