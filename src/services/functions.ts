import { db } from './firebase';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

export const storeData = async (
  folder: string,
  filename: string,
  data: object
) => {
  const eventDocRef = doc(db, folder, filename);

  await setDoc(eventDocRef, data);

  return eventDocRef;
};

type srcProps = {
  downloadURL: string;
  fileType: string;
};

type eventProps = {
  date: string;
  desc: string;
  fileCount: number;
  filename: string;
  imageCount: number;
  loc: string;
  mediaSrc: srcProps[];
  title: string;
  videoCount: number;
  eventId: string;
};

export type eventLoaderProp = {
  event: eventProps;
};

export type eventsLoaderProp = {
  events: eventProps[];
};

export async function eventLoader({
  params,
}: {
  params: { eventId?: string };
}) {
  if (params.eventId) {
    const docRef = doc(db, 'events', params.eventId);
    const docSnap = await getDoc(docRef);
    const event = docSnap.data();
    return { event };
  }

  return {
    date: '00/00/0000',
    desc: 'no description',
    fileCount: 0,
    filename: 'no filename',
    imageCount: 0,
    loc: 'no location',
    mediaSrc: [],
    title: 'no title',
    videoCount: 0,
  };
}

export async function eventsLoader() {
  const events: object[] = [];
  const querySnapshot = await getDocs(collection(db, 'events'));

  querySnapshot.forEach(doc => {
    const eventId = doc.id;
    return events.push({ ...doc.data(), eventId });
  });

  return { events };
}
