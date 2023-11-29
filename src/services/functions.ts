import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const storeData = async (
  folder: string,
  filename: string,
  data: object
) => {
  const eventDocRef = doc(db, folder, filename);

  await setDoc(eventDocRef, data);

  return eventDocRef;
};
