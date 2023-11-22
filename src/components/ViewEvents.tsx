import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';

const ViewEvents = () => {
  const [events, setEvents] = useState<DocumentData[]>([]);

  useEffect(() => {
    setEvents([]);

    const unsubscribe = onSnapshot(
      collection(db, 'event'),
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
        {events.length > 1 ? events.map(event => (
          <div key={event.title} className='col-xs-12 col-sm-4'>
            <div className='card' style={{ width: '18rem' }}>
              <div className='card-body'>
                <h5 className='card-title text-uppercase fw-5'>
                  {event.title}
                </h5>
                <h6 className='card-subtitle mb-2 text-muted'>{event.loc}</h6>
                <p className='card-text'>{event.desc}</p>
                <div className='d-flex gap-4'>
                  <button className='btn btn-primary text-uppercase'>
                    Update
                  </button>
                  <button
                    onClick={async () => {
                      await deleteDoc(
                        doc(db, 'event', `${event.title}-${event.date}`)
                      );
                    }}
                    className='btn btn-danger text-uppercase'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )): <div className='d-flex flex-column justify-content-center align-items-center'><h1 className='text-danger h2'>No event registered yet</h1></div>}
      </div>
    </div>
  );
};

export default ViewEvents;
