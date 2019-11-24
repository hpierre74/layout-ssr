import * as admin from 'firebase-admin';

import serviceAccount from '../../gsa_key.json';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.RAZZLE_SECRET_FIREBASE_DB,
  });
}

const getConfig = async () => {
  const appConfig = await admin
    .database()
    .ref('public/config')
    .once('value', snap => snap.val());

  return appConfig.val();
};

const getContentTarget = ({ url, config }) => {
  const filteredPages = Object.values(config.pages).filter(page => page.path === url);
  if (filteredPages[0]) {
    return filteredPages[0].target;
  }

  return 'home';
};

const getContent = async ({ config, url }) => {
  const content = await admin
    .database()
    .ref(`public/content/en/${getContentTarget({ config, url })}`)
    .once('value', snap => snap.val());

  return content.val();
};

export const preloadState = async url => {
  const config = await getConfig();
  const content = await getContent({ config, url });

  return { config, pageContent: { content } };
};
