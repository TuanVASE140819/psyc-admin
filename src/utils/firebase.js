import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD4wde62JjvquWn7izXRPgpaja6Aibm3-k',
  authDomain: 'psychologicalcounseling-28efa.firebaseapp.com',
  projectId: 'psychologicalcounseling-28efa',
  storageBucket: 'psychologicalcounseling-28efa.appspot.com',
  messagingSenderId: '1021397689910',
  appId: '1:1021397689910:web:74f22cb6cd37293f79da97',
  measurementId: 'G-HN1C145KHM',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
