import { Button, Form, Icon, Message } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDisabled(Object.values(user).some(e => e === ""));
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = `${process.env.BASE_URL}/api/login`;
    const config = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${data.message}`);

      handleLogin(data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message
        icon="lock"
        attached
        header="Welcome back!"
        content="Fill out the form below to login."
      />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        className="attached fluid segment"
        error={Boolean(error)}
      >
        <Message attached error header="Oops!" content={error} />
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="E-mail"
          placeholder="E-mail"
          name="email"
          type="email"
          onChange={handleChange}
          value={user.email}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={user.password}
        />
        <Button
          icon="sign in"
          type="submit"
          color="teal"
          content="Submit"
          labelPosition="right"
          disabled={disabled || loading}
        />
      </Form>
      <Message attached warning>
        <Icon name="help" />
        New user?
        <Link href="/signup"> Sign up here </Link>instead.
      </Message>
    </>
  );
}

export default Login;
