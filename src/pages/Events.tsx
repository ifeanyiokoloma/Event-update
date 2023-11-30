import { db } from '../services/firebase';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { eventsLoaderProp } from '../services/functions';
import { deleteDoc, doc } from 'firebase/firestore';

const Events = () => {
  const { events } = useLoaderData() as eventsLoaderProp;
  const navigate = useNavigate()

  console.log(events);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.currentTarget.value = 'deleting';
    try {
      await deleteDoc(doc(db, 'events', id));
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <Header>Events</Header>
      <div className='row my-3 mx-auto g-4'>
        {events.length > 0 ? (
          events.map(event => (
            <div
              key={event.eventId}
              className='col-xs-12 col-md-4 d-flex justify-content-center'
            >
              <div
                className='shadow mx-auto p-4 border border-1 rounded my-card'
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
                <div className='mt-4 d-flex flex-column gap-4 py-4'>
                  <Link
                    to={`/events/${event.eventId}`}
                    className='btn btn-primary text-uppercase w-100'
                  >
                    View Event
                  </Link>

                  <button
                    onClick={(e) => handleDelete(e, event.eventId)}
                    className='btn btn-danger text-uppercase w-100'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=''>
            <h2 className='h4 text-center text-secondary'>No event yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
