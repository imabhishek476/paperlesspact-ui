'use cient';
import Image from 'next/image';
import React, { useEffect } from 'react';

import { Nunito } from 'next/font/google';
import useDrivePicker from 'react-google-drive-picker';

function GoogleDrivePicker({
  setFiles,
  files,
  setPreview,
  preview,
  googleDriveRef,
}) {
  const [openPicker, authResponse] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        '1018497844427-ie0jj0ff881630tdc3bo4df69sh7lc7n.apps.googleusercontent.com',
      developerKey: 'AIzaSyAj85p7IzEWVjTMSeZ2hiaRFn6XUE-gXMk',

      viewMimeTypes: 'application/vnd.google-apps.document,application/pdf',
      showUploadFolders: true,
      showUploadView: true,
      supportDrives: true,

      // multiselect : true
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }

        if (data && data.docs && data.docs.length > 0) {
          data.docs.map(async (e) => {
            const cloneFiles = [...files];
            const clonePreview = [...preview];

            const selectedDoc = e;

            const doc = {
              id: selectedDoc.id,
              name: selectedDoc.name,
              url: selectedDoc.embedUrl,
              type: selectedDoc.mimeType,
              // downloadUrl: selectedDoc.downloadUrl,
            };

            setFiles([...files, doc]);
            setPreview([...preview, null]);
          });
        }
      },
    });
  };

  return (
    <>
      <div className="lg:border-none lg:rounded-full lg:px-0">
        <div
          // onClick={handleOpenPicker}
          className="rounded-full cursor-pointer"
          ref={googleDriveRef}
        >
          <Image
            src={
              'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'
            }
            width={30}
            height={30}
            alt=""
            className="lg:m-1.5 rounded-full"
          ></Image>
        </div>
      </div>
    </>
  );
}

export default GoogleDrivePicker;
