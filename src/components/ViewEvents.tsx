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
              <div className='card' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h4
                    className='card-title text-truncate text-uppercase'
                    title={event.title}
                  >
                    {event.title}
                  </h4>
                  <h5 className='card-subtitle mb-2 text-muted'>
                    {event.date}
                  </h5>
                  <p className='card-text text-truncate' title={event.desc}>
                    {event.desc}
                  </p>
                  <h6>Files</h6>
                  <p>{event.filename}</p>
                  <button
                    onClick={async () => {
                      await deleteDoc(
                        doc(
                          db,
                          'events',
                          `${event.title.split(' ').join('-')}-${event.date}`
                        )
                      );
                    }}
                    className='btn btn-danger text-uppercase'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>No event registered yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
