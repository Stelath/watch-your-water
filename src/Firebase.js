import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD1d_i2COtSzjF3K8IzA1CJyrkxIp1s3vs',
  authDomain: 'watch-your-water.firebaseapp.com',
  projectId: 'watch-your-water',
  storageBucket: 'watch-your-water.appspot.com',
  messagingSenderId: '489162475186',
  appId: '1:489162475186:web:69d760c74c6dd03b932bab',
  measurementId: 'G-VRB7D41W3M'
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
