import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import { enqueueSnackbar } from 'notistack';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({ title: '', date: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await setDoc(
        doc(db, 'event', `${eventData.title}-${eventData.date}`),
        eventData
      );
      enqueueSnackbar(`Event ${eventData.title} Saved to the database`, {
        variant: 'success',
      });
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
            name='file1-text'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file1'
            placeholder='File 1'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file 1' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file1-file'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 1'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <input
            name='file1-desc'
            onChange={handleChange}
            type='text'
            className='form-control form-control-lg'
            id='file1-desc'
            placeholder='Description'
          />
        </div>
      </div>

      <div className={`row g-3`}>
        <div className='col-xs-12 col-sm-4'>
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
          <label htmlFor='file 2' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file2-file'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 2'
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
          <label htmlFor='file 3' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file3-file'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 1'
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
          <label htmlFor='file 4' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file4-file'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 4'
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
            id='file5'
            placeholder='File 5'
            accept='image/*, video/*'
          />
        </div>
        <div className='col-xs-12 col-sm-4'>
          <label htmlFor='file 5' className='border border-1 p-2 rounded w-100'>
            Select Video/Image
          </label>

          <input
            name='file5-input'
            onChange={handleChange}
            type='file'
            className='d-none'
            id='file 5'
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
            name='file6-file'
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
        </div>
      </div>

      <div className='row g-3'>
        <div className='col-xs-12 col-sm-6'>
          <button type='submit' className='btn btn-primary w-100'>
            Save
          </button>
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
