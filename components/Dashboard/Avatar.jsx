import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Typography, Snackbar, Alert } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAvatar } from 'components/Apis/Avatar';
import {
  ThemeProvider,
  CircularProgress,
  Skeleton,
  createTheme,
} from '@mui/material';
import { EasedraftTheme } from 'utils/Theme';
import AvatarCard from './AvatarCard';
import CreateAvatarModel from './CreateAvatarModel';

const theme = createTheme(EasedraftTheme);

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSuccess, setSnackSuccess] = useState('success');
  const [filterAvatar, setFilterAvatar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [page, setPage] = useState({
    size: 4,
    currentPage: 1,
    maxPage: 1,
  });

  useEffect(() => {
    fetchAvatarData();
  }, []);

  const refreshAvatarData = () => {
    fetchAvatarData();
  };

  const fetchAvatarData = async () => {
    try {
      setLoading(true);
      const avatarData = await getAvatar(page.currentPage, page.size);
      setFilterAvatar(avatarData.data.avatars);
      setPage({
        ...page,
        maxPage: avatarData?.data?.totalPages,
      });
      setTotalAvatar(avatarData?.data?.totalItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching avatar data:', error);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (page.currentPage === page.maxPage) {
      return;
    }
    setLoading(true);
    setPage({
      ...page,
      currentPage: page.currentPage + 1,
    });
    const response = await getAvatar(page.currentPage + 1, page.size);
    if (response) {
      setFilterAvatar(response?.data?.avatars);
    }
    setLoading(false);
  };

  const handlePrev = async () => {
    if (page.currentPage === 1) {
      return;
    }
    setLoading(true);
    setPage({
      ...page,
      currentPage: page.currentPage - 1,
    });
    const response = await getAvatar(page.currentPage - 1, page.size);
    if (response) {
      setFilterAvatar(response?.data?.avatars);
    }
    setLoading(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CreateAvatarModel
          open={open}
          handleClose={handleClose}
          refreshAvatar={refreshAvatarData}
        />
        {snackOpen && (
          <Snackbar
            open={snackOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={() => setSnackOpen(false)}
            sx={{
              zIndex: 1000,
              mt: 10,
            }}
          >
            <Alert
              onClose={() => setSnackOpen(false)}
              severity={snackSuccess}
              variant="filled"
              sx={{ width: '100%', pr: 3, pl: 3 }}
            >
              <Typography sx={{ fontSize: '14px' }} variant="h6">
                {snackMessage}
              </Typography>
            </Alert>
          </Snackbar>
        )}

        <section className="flex flex-col">
          <div className="flex flex-col items-center">
            <div className="w-full pb-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col lg:flex-row justify-between py-3 gap-5 items-center">
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Total Avatars</h1>
                    {loading ? <CircularProgress /> : <p>{totalAvatar}</p>}
                  </div>
                  {/* <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">Published Avatars</h1>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <p>
                        {
                          filterAvatar.filter(
                            (avatar) => avatar.isPublished === '1'
                          ).length
                        }
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                    <h1 className="text-md font-semibold">
                      Not published Avatars
                    </h1>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <p>
                        {
                          filterAvatar.filter(
                            (avatar) => avatar.isPublished === '0'
                          ).length
                        }
                      </p>
                    )}
                  </div> */}
                  <div className="lg:w-1/4 flex justify-center lg:justify-end w-full">
                    <Button
                      className="w-full lg:w-fit"
                      onClick={handleOpen}
                      type="button"
                      size="lg"
                    >
                      Create Avatar
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[...Array(4)].map((index) => (
                        <Skeleton variant="rounded" width={250} height={250} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {filterAvatar?.map((avatar, index) => (
                      <AvatarCard
                        key={index}
                        avatar={avatar}
                        refreshAvatar={refreshAvatarData}
                        setSnackMessage={setSnackMessage}
                        setSnackOpen={setSnackOpen}
                        setSnackSuccess={setSnackSuccess}
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-row items-end justify-end pt-5">
                  <Button
                    onClick={handlePrev}
                    className="bg-gray-300 rounded-none text-black px-3"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button className="rounded-none bg-gray-100 text-black border hover:bg-gray-200">
                    {page.currentPage}
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-gray-300 rounded-none text-black px-3"
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ThemeProvider>
    </div>
  );
};

export default Avatar;
