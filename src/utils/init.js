import { requestGet } from './http.utils';

const initializeApp = () => requestGet(`${process.env.RAZZLE_SECRET_FIREBASE_DB}/public/config.json`).then(res => res.body);

export default initializeApp;
