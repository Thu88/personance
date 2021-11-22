import React from 'react';
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function customApp({ 
  Component, 
  pageProps: { session, ...pageProps} 
  }) {

  return (    
        <Layout>
          <Provider session={session}>
            <Component {...pageProps}></Component>
          </Provider>
        </Layout>
  );
}

export default customApp;