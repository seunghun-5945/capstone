import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  padding-left: 2%;
  color: white;
`;

const Footer = () => {
  return (
    <Container>
      <h3>copyright 2022 W:IDE All pictures cannot be copied without permission.</h3>
    </Container>
  );
};

export default Footer;