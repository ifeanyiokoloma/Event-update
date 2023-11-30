import { useLoaderData } from 'react-router-dom';
import { eventLoaderProp } from '../services/functions';
import { Accordion, AccordionHeader, AccordionItem } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import Header from '../components/Header';

const Event = () => {
  const { event } = useLoaderData() as eventLoaderProp;

  return (
    <div className='container-md mb-5'>
      <Header>{event.title}</Header>

      <main className='row g-4'>
        <section className='col-xs-12 col-sm-8 px-4'>
          <h2 className='h5 text-secondary bg-white py-3 ps-3'>
            {event.filename} Album
          </h2>
          <Accordion flush className='shadow rounded'>
            <AccordionItem as='section' eventKey='0'>
              <AccordionHeader as='h3' className='accordion-header'>
                {event.imageCount} Pictures
              </AccordionHeader>
              <AccordionBody className='d-flex flex-column gap-4'>
                {event.imageCount > 0
                  ? event.mediaSrc
                      .filter(src => src.fileType.includes('image'))
                      .map(src => (
                        <div key={src.downloadURL}>
                          <img src={src.downloadURL} width={300} height={300} />
                        </div>
                      ))
                  : 'No Image Uploaded'}
              </AccordionBody>
            </AccordionItem>

            <AccordionItem as='section' eventKey='1'>
              <AccordionHeader as='h3' className='accordion-header'>
                {event.videoCount} Videos
              </AccordionHeader>
              <AccordionBody className='d-flex flex-column gap-5'>
                {event.videoCount > 0
                  ? event.mediaSrc
                      .filter(src => src.fileType.includes('video'))
                      .map(src => (
                        <div key={src.downloadURL}>
                          <video
                            controls
                            src={src.downloadURL}
                            width={300}
                            height={300}
                            style={{ width: '100%', height: '50vh' }}
                          />
                        </div>
                      ))
                  : 'No Video Uploaded'}
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </section>

        <section className='col-xs-12 col-sm-4 bg-white shadow p-4 rounded'>
          <h2 className='h5 mb-4 text-secondary'>Event Details</h2>
          <p>
            <span className='text-muted'>Location: </span>
            <b>{event.loc}</b>
          </p>
          <p className='mb-5'>
            <span className='text-muted'>Date: </span>
            <b>{event.date}</b>
          </p>
          <article>
            <h3 className='text-muted h5'>Description: </h3>
            <p className='d-block'>{event.desc}</p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Event;
