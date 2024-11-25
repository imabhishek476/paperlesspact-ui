import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { Button } from '../ui/button';
import {
  Typography,
  Snackbar,
  CircularProgress,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  HardDriveUpload,
  Pencil,
  Trash,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import {
  createAudio,
  updateAudio,
  getAudio,
  publishAudio,
  deleteAudio,
} from 'components/Apis/voice';
import { ThemeProvider, createTheme } from '@mui/material';

import { EasedraftTheme } from 'utils/Theme';
import VoiceCard from './VoiceCard';
import CreateVoiceModal from './CreateVoiceModal';
const theme = createTheme(EasedraftTheme);

const Voice = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [action, setAction] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSuccess, setSnackSuccess] = useState('success');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filterVoice, setFilterVoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalVoice, setTotalVoice] = useState(0);

  const refreshAudioData = () => {
    fetchAudioData(); // Call the function to fetch audio data again
  };
  useEffect(() => {
    fetchAudioData(); // Fetch audio data when component mounts
  }, [update]);
  const [page, setPage] = useState({
    size: 8,
    currentPage: 1,
    maxPage: 1,
  });
  const fetchAudioData = async () => {
    try {
      setLoading(true);
      const audioData = await getAudio(page?.currentPage, page?.size); // Fetch audio data

      setFilterVoice(audioData.data.ref); // Update component state with fetched data
      setPage({
        ...page,
        maxPage: audioData?.data?.totalPages,
      });
      setTotalVoice(audioData?.data?.totalItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching audio data:', error);
      setLoading(false);
      // Handle error or display appropriate message to the user
    }
  };
  const handleNext = async (skip) => {
    if (page.currentPage === page.maxPage) {
      return;
    }
    setLoading(true);
    setUpdate((prev) => !prev);
    setPage({
      ...page,
      currentPage: page.currentPage + 1,
    });
    const response = await getAudio(page?.currentPage + 1, page?.size);
    if (response) {
      setFilterVoice(response?.data?.ref);
    }
    setLoading(false);
  };
  const handlePrev = async (skip) => {
    if (page.currentPage === 1) {
      return;
    }
    setLoading(true);
    setUpdate((prev) => !prev);
    setPage({
      ...page,
      currentPage: page.currentPage - 1,
    });
    const response = await getAudio(page.currentPage - 1, page.size);
    if (response) {
      setFilterVoice(response?.data?.ref);
    }
    setLoading(false);
  };

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <CreateVoiceModal
            open={open}
            handleClose={handleClose}
            // refreshAudio={refreshAudioData}
            setUpdate={setUpdate}
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

          <section className="flex flex-col ">
            <div className=" flex flex-col items-center">
              <div className="w-full pb-5">
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col lg:flex-row justify-between  py-3 gap-5 items-center">
                    <div className="flex flex-row border-2 rounded-sm p-3 gap-3  lg:w-1/4 w-full justify-between">
                      <h1 className="text-md font-semibold">Total Voice</h1>
                      {loading ? (
                        <CircularProgress size={15} />
                      ) : (
                        <p>{totalVoice}</p>
                      )}
                    </div>
                    {/* <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/4 w-full justify-between">
                      <h1 className="text-md font-semibold">Published Voice</h1>
                      {loading ? (
                        <CircularProgress size={15} />
                      ) : (
                        <p>
                          {
                            filterVoice.filter(
                              (voice) => voice.isPublished === '1'
                            ).length
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex flex-row border-2 rounded-sm p-3 gap-3 lg:w-1/3 w-full justify-between">
                      <h1 className="text-md font-semibold">
                        Not Published Voice
                      </h1>
                      {loading ? (
                        <CircularProgress size={15} />
                      ) : (
                        <p>
                          {
                            filterVoice.filter(
                              (voice) => voice.isPublished === '0'
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
                        Create Voice
                      </Button>
                    </div>
                  </div>

                  {/* {filterVoice.map((voice) => ( */}
                  {loading ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((index) => (
                          <Skeleton
                            variant="rounded"
                            width={250}
                            height={100}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filterVoice.map((voice, index) => (
                        <VoiceCard
                          key={index}
                          voice={voice}
                          setUpdate={setUpdate}
                          // refreshAudio={refreshAudioData}
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
    </div>
  );
};

export default Voice;
