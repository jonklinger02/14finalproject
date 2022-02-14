import React from "react";
import { Container } from "react-bootstrap";

const MainLayout = (props) => {
  return <Container className='app-container mb-5'>{props.children}</Container>;
};

export default MainLayout;
