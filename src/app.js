
'use strict';

import { upload } from './upload';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getMetadata } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCppba0e8Uql3bqhpDhEMZ3O8kButZ3JA",
  authDomain: "fe-uplode-images.firebaseapp.com",
  projectId: "fe-uplode-images",
  storageBucket: "fe-uplode-images.appspot.com",
  messagingSenderId: "222384173060",
  appId: "1:222384173060:web:b1c41ac5e208a462e60551"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

// console.log(storage);
// console.log(app);
// console.log(ref);

upload('.card__input', {
  multi: true,
  accept: ['.gif', '.jpg'],
  onUpload(files) {
    files.forEach((item, i) => {
      const spaceRef = ref(storage, `images/${item.name}`);

      uploadBytes(spaceRef, item).then((snapshot) => {
        console.log(snapshot);
        console.log('Uploaded a blob or file!');
      });

      getMetadata(spaceRef).then(metadata => {
        console.log(metadata.size);
      });
    });
  }
});
