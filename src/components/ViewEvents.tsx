import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { enqueueSnackbar } from 'notistack';

const ViewEvents = () => {
  const [events, setEvents] = useState<DocumentData[]>([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setEvents([]);

    const unsubscribe = onSnapshot(
      collection(db, 'events'),
      snapshots => {
        const newEvents = snapshots.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        snapshots.docChanges().map(change => {
          const event = change.doc.data();
          if (change.type === 'added') {
            setChange(true);
            enqueueSnackbar(`${event.title} has been added`, {
              variant: 'success',
            });
          }
          if (change.type === 'modified') {
            setChange(true);
            enqueueSnackbar(`${event.title} has been modified`, {
              variant: 'success',
            });
          }
          if (change.type === 'removed') {
            setChange(true);
            enqueueSnackbar(`${event.title} has been removed`, {
              variant: 'success',
            });
          }
        });

        setEvents(newEvents);
      },

      error => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  return (
    <div className='container'>
      <div className='row my-3 mx-auto g-4'>
        {events.length > 0 ? (
          events.map(event => (
            <div
              key={event.title}
              className='col-xs-12 col-md-4 d-flex justify-content-center'
            >
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  {event.title || 'Title'} <br />
                </h3>
                <p className='text-muted'>{event.date || '29-11-2023'}</p>
                <p className='text-muted mb-4'>
                  <span>Venue: </span>
                  {event.loc || 'Location'}
                </p>

                <p className=''>{event.desc || 'Event description'}</p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='text-success'>{event.fileCount}</span>{' '}
                  file(s) selected
                </p>
                <div className='d-flex gap-2'>
                  <span>
                    Image:{' '}
                    <span className='text-success'>{event.imageCount}</span>
                  </span>
                  |
                  <span>
                    Video:{' '}
                    <span className='text-success'>{event.videoCount}</span>
                  </span>
                </div>
                <div className='mt-4'>
                  <button
                    onClick={async () => {
                      await deleteDoc(
                        doc(db, 'events', `${event.title}-${event.date}`)
                      );
                    }}
                    className='btn btn-danger text-uppercase w-100'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder w-100'></span>
                </div>
              </div>
            </div>

            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder col-4'></span>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder w-100'></span>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='text-success'>0</span>{' '}
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder w-100'></span>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder w-100'></span>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-md-4 d-flex justify-content-center'>
              <div
                className='shadow-sm mx-auto p-4 border border-1 rounded'
                style={{ width: 250 }}
              >
                <h3 className='h4'>
                  <span className='placeholder col-7'></span>
                </h3>
                <p className='text-muted'>
                  <span className='placeholder col-4'></span>
                </p>
                <p className='text-muted mb-4'>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                </p>

                <p className=''>
                  <span className='placeholder col-10'></span>
                </p>
                <div className='border border-1 mb-3' />
                <p>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                </p>
                <div className='d-flex gap-2'>
                  <span className='placeholder col-4'></span>|
                  <span className='placeholder col-4'></span>
                </div>
                <div className='mt-4'>
                  <span className='placeholder w-100'></span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
