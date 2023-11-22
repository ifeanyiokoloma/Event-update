import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db, storage } from '../services/firebase';
import { enqueueSnackbar } from 'notistack';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    filename: '',
    imgSrc: '',
  });
  const [eventFile, setEventFile] = useState<File>();
  const [isEventFile, setIsEventFile] = useState(false);
  const [filename, setFilename] = useState('');
  const [filetype, setFiletype] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const selectedFile = files as FileList;
    setEventFile(selectedFile?.[0]);
    setFilename(selectedFile?.[0].name);
    setFiletype(selectedFile?.[0].type);
    setIsEventFile(true);

    console.log(selectedFile?.[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (eventFile) {
        const metadata = {
          contentType: filetype
        };
        const storageRef = ref(
          storage,
          eventData.filename.split(' ').join('-')
        );

        await uploadBytes(storageRef, eventFile, metadata);

        getDownloadURL(storageRef)
          .then(downloadUrl =>
            setEventData({ ...eventData, imgSrc: downloadUrl })
          )
          .then(async () => {
            await setDoc(
              doc(
                db,
                'events',
                `${eventData.title.split(' ').join('-')}-${eventData.date}`
              ),
              eventData
            );
          })
          .then(() => {
            enqueueSnackbar(`Event ${eventData.title} Saved to the database`, {
              variant: 'success',
            });
          })
          .then(() => {
            setLoading(false);
          });
      }
    } catch (e) {
      enqueueSnackbar(`Error adding document: ${e}`, { variant: 'error' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='container d-flex flex-column gap-5 my-5'
    >
      <h1 className='h2 text-center text-uppercase'>Create Event</h1>
      <div className='row g-3'>
        <div className='col-xs-12 col-sm-3'>
          <input
            name='title'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
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
            className='form-control form-control-lg'
            id='desc'
            placeholder='Description'
            required
          />
        </div>
        <div className='col-xs-12 col-sm-3'>
          <input
            name='loc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
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
            className='w-100 p-2'
            id='date'
            placeholder='Date'
            required
          />
        </div>
      </div>

      <div className='row g-3'>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='filename'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            placeholder='File name'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file' className='border border-1 p-2 rounded w-100'>
            {isEventFile ? filename : 'Select Video/Image'}
          </label>

          <input
            name='file'
            onChange={handleFileChange}
            type='file'
            className='d-none'
            id='file'
            required
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='fileDesc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            placeholder='Description'
          />
        </div>
      </div>

      {/* <div className={`row g-3`}> */}
      {/*  <div className='col-xs-12 col-sm-4'>
          <input
            name='file2-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file2'
            placeholder='File 2'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file2' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file2'
            onChange={handleFileChange}
            type='file'
            className='d-none'
            id='file2'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file2-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file2-desc'
            placeholder='Description'
          />
        </div>
      </div>

      <div className={`row g-3`}>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file3-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file3'
            placeholder='File 3'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file3' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file3'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file3'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file3-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file3-desc'
            placeholder='Description'
          />
        </div>
      </div>

      <div className={`row g-3`}>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file4-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file4'
            placeholder='File 4'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file4' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file4'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file4'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file4-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file4-desc'
            placeholder='Description'
          />
        </div>
      </div>

      <div className={`row g-3`}>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file5-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            placeholder='File 5'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file5' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file5'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file5'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file5-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file5-desc'
            placeholder='Description'
          />
        </div>
      </div>

      <div className={`row g-3`}>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file6-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file4'
            placeholder='File 6'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file 6' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file6'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 6'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file6-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file6-desc'
            placeholder='Description'
          />
        </div> */}
      {/* </div> */}

      <div className='row g-3'>
        <div className='col-xs-12 col-sm-6'>
          {!loading ? (
            <button type='submit' className='btn btn-primary w-100'>
              Save
            </button>
          ) : (
            <button className='btn btn-primary w-100 d-flex gap-3 justify-content-center align-items-center' type='button' disabled>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
              Saving Event...
            </button>
          )}
        </div>
        <div className='col-xs-12 col-sm-6'>
          <button type='reset' className='btn btn-danger w-100'>
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateEvent;
