import React from "react";
import Header from "../../components/Header";

function PageTemplate(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}
export default PageTemplate;
