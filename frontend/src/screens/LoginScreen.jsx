import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {  toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
    const styles = {
        borderRadius: 0,
    }
    
    const [ email, setEmail ] = useState("");
    const [ password, setPassword  ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ login, { isLoading } ] = useLoginMutation();
    
    const { userInfo } = useSelector((state) => state.auth);

    // gets the redirect query param from the url
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("Logged in successfully");
        } catch (err) {
            toast.error('Invalid email or password');
        }
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            style={styles}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={styles}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2 main-bg"
        disabled={isLoading}>
          Sign In
        </Button>

        { isLoading && <Loader /> }
    </Form>
    <Row className="py-3">
        <Col>
            New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : "/register" } style={{color: "#222"}}>Register</Link>
        </Col>
    </Row>
    </FormContainer>
  )
}

export default LoginScreen
