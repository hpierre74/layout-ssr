import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { getCurrentLang } from '../lang/lang.selectors';

export const Metadata = () => {
  const lang = useSelector(getCurrentLang);
  return (
    <Helmet>
      <html lang={lang} />
      <title>Layout System</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Layout application" />
    </Helmet>
  );
};
