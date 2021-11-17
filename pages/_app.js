import React from "react";
import Layout from "../components/Layout";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function customApp({ Component, pageProps }) {

  return (
      <Layout>
          <Component {...pageProps}></Component>
      </Layout>
  )
}

export default customApp;