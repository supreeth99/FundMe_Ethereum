import React from "react";
import Header from "./HomePage";
import { Container } from "semantic-ui-react";
import Head from "next/head";

export default (props) => {
  return (
    <div style = { ({marginLeft:"0px", marginRight:"0px"})}>
      <Head>
        { <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        /> }
      </Head>
      {props.children}
    </div>
  );
};
