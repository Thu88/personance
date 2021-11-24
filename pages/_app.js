import React from 'react';
import { Provider } from 'next-auth/client'
import { Provider as ReduxProvider} from 'react-redux';
import { store } from '../redux/store';
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
    <ReduxProvider store={store}>     
        <Provider session={session}>
          <Layout>
        
              <Component {...pageProps}></Component>
          </Layout>
        </Provider>
    </ReduxProvider>
  );
}

export default customApp;