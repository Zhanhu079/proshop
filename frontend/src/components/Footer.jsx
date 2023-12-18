import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='mt-3 main-bg'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Glacier &copy; {currentYear}, Design by Keitumetse Sello</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
