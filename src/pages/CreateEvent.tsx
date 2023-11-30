import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../services/functions';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../services/firebase';
import Header from '../components/Header';

const CreateEvent = () => {
  const [eventDoc, setEventDoc] = useState({
    title: '',
    date: '',
    desc: '',
    loc: '',
    filename: '',
  });
  const navigate = useNavigate();
  const [fileCount, setFileCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [fileList, setFileList] = useState<FileList | undefined>();
  const [uploading, setUploading] = useState(0);
  const [progress, setProgress] = useState('');
  const [filesUploading, setFilesUploading] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const selectedFile = files as FileList;

    // Number of files
    // console.log(selectedFile);
    setFileCount(selectedFile.length);

    // Number of images
    const images = Array.from(selectedFile).filter(file =>
      file.type.includes('image')
    );
    setImageCount(images.length);

    // Number of videos
    const videos = Array.from(selectedFile).filter(file =>
      file.type.includes('video')
    );
    setVideoCount(videos.length);

    setFileList(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventDoc({ ...eventDoc, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const eventDocRef = await storeData(
      'events',
      `${eventDoc.title.split(' ').join('_')}_${eventDoc.date}`,
      { ...eventDoc, mediaSrc: [], imageCount, videoCount, fileCount }
    );

    if (fileList) {
      [...fileList].map(async (file, _, files) => {
        const metadata = {
          contentType: file.type,
        };

        setFilesUploading(files.length);

        const storageRef = ref(
          storage,
          `events/${eventDoc.filename}/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploading(progress);
            switch (snapshot.state) {
              case 'running':
                setProgress('uploading');
                break;
            }
          },
          error => {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
              console.log('File available at', downloadURL);
              await updateDoc(eventDocRef, {
                mediaSrc: arrayUnion({ downloadURL, fileType: file.type }),
              });
            });
          }
        );
      });
    }
    navigate('/events');
  };

  return (
    <main className='container'>
      <Header>Create Event</Header>
      <div
        className='shadow mx-auto p-4 border border-1 rounded my-card'
        style={{ width: 250 }}
      >
        <h3 className='h4 text-uppercase mb-3'>
          {eventDoc.title || 'Title'} <br />
        </h3>
        <p className='text-muted mb-2'>{eventDoc.date || '29-11-2023'}</p>
        <p className='text-muted mb-4'>
          <span>Venue: </span>
          {eventDoc.loc || 'Location'}
        </p>

        <p className=''>{eventDoc.desc || 'Event description'}</p>
        <div className='border border-1 mb-3' />
        <h2 className='h6 text-uppercase mb-3'>
          {eventDoc.filename || 'Album title'}
        </h2>
        <p className='mb-2'>
          <span className='text-success'>{fileCount}</span> file(s) selected
        </p>
        <div className='d-flex gap-2'>
          <span>
            Image: <span className='text-success'>{imageCount}</span>
          </span>
          |
          <span>
            Video: <span className='text-success'>{videoCount}</span>
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className='container d-flex flex-column gap-5 my-5'
      >
        <div className='row g-3'>
          <div className='col-xs-12 col-sm-3'>
            <input
              name='title'
              onChange={handleChange}
              type='text'
              className='form-control shadow'
              id='title'
              placeholder='Title'
              required
            />
          </div>
          <div className='col-xs-12 col-sm-3'>
            <input
              name='desc'
              onChange={handleChange}
              type='text'
              className='form-control shadow'
              placeholder='Description'
              required
            />
          </div>
          <div className='col-xs-12 col-sm-3'>
            <input
              name='loc'
              onChange={handleChange}
              type='text'
              className='form-control shadow'
              id='loc'
              placeholder='Location'
              required
            />
          </div>
          <div className='col-xs-12 col-sm-3'>
            <input
              name='date'
              onChange={handleChange}
              type='date'
              className='w-100 p-2 rounded border border-1 shadow'
              id='date'
              placeholder='Date'
              required
            />
          </div>
        </div>

        <div className='row g-3'>
          {/* File */}
          <div className='col-xs-12 col-sm-4'>
            <input
              name='filename'
              onChange={handleChange}
              type='text'
              className='form-control shadow'
              placeholder='Album Title'
              accept='image/*, video/*'
            />
          </div>

          <div className='col-xs-12 col-sm-4'>
            <label
              htmlFor='file'
              className='border border-1 py-2 px-3 rounded w-100 text-truncate text-muted shadow bg-white'
              title={
                fileCount
                  ? `${fileCount} file Ready to Upload`
                  : 'Select Images and/or Videos'
              }
            >
              {fileCount
                ? `${
                    fileCount > 1 ? `${fileCount} files` : `${fileCount} file`
                  } Ready to Upload`
                : 'Upload Images and/or Videos'}
            </label>

            <input
              name='file'
              onChange={handleFileChange}
              type='file'
              className='d-none'
              id='file'
              required
              multiple
              accept='image/*,video/*'
            />
          </div>

          <div className='col-xs-12 col-sm-4'>
            <input
              name='fileDesc'
              onChange={handleChange}
              type='text'
              className='form-control shadow'
              placeholder='Album Note'
            />
          </div>
          {/* File ends */}
        </div>

        <div className='row g-3'>
          <div className='col-xs-12 col-sm-6'>
            {!loading ? (
              <button type='submit' className='btn btn-primary w-100 shadow'>
                Save
              </button>
            ) : (
              <div className='progress shadow' style={{ height: '40px' }}>
                <div
                  className='progress-bar progress-bar-striped progress-bar-animated fw-1 text-capitalize h6'
                  role='progressbar'
                  style={{ width: `${uploading}%`, height: '100%' }}
                >
                  {`${progress} ${filesUploading > 1 ? filesUploading : null} ${
                    filesUploading > 1 ? 'files' : 'file'
                  }`}
                </div>
              </div>
            )}
          </div>
          <div className='col-xs-12 col-sm-6'>
            <button type='reset' className='btn btn-danger w-100 shadow'>
              Reset
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateEvent;
