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

  useEffect(() => {
    setEvents([]);

    const unsubscribe = onSnapshot(
      collection(db, 'events'),
      snapshots => {
        const newEvents = snapshots.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

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
  }, []);

  return (
    <div className='container'>
      <div className='row my-5 mx-auto'>
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.title} className='card' style={{ width: '18rem' }}>
              <img
                src={event.imgSrc}
                className='card-img-top'
                alt={event.title}
              />
              <div className='card-body'>
                <h5 className='card-title'>{event.title}</h5>
                <p className='card-text'>{event.desc}</p>
                <button
                  onClick={async () => {
                    await deleteDoc(
                      doc(
                        db,
                        'event',
                        `${event.title.split(' ').join('-')}-${event.date}`
                      )
                    );
                    enqueueSnackbar('Event deleted', { variant: 'success' });
                  }}
                  className='btn btn-danger text-uppercase'
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>No event register yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
