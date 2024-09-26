import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Heading, Pane, TextInputField, toaster } from "evergreen-ui";

const Login: React.FC = () => {
  const intl = useIntl();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name || !email) {
      toaster.warning("Please fill in both fields");
      return;
    }
    toaster.success(`Welcome, ${name}!`);
    // You can add further login logic here (e.g., API calls).
  };

  return (
    <Pane
      alignItems="center"
      background="tint2"
      display="flex"
      height="100vh"
      justifyContent="center">
      <Pane background="white" borderRadius={8} elevation={3} padding={24} width={400}>
        <Heading marginBottom={24} size={800} textAlign="center">
          <FormattedMessage id="APP_NAME" />
        </Heading>

        <Heading marginBottom={24} size={600} textAlign="center">
          <FormattedMessage id="LOGIN_HEADING_TEXT" />
        </Heading>

        <TextInputField
          label={intl.formatMessage({ id: "LOGIN_NAME_LABEL" })}
          placeholder={intl.formatMessage({ id: "LOGIN_NAME_PLACEHOLDER" })}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />

        <TextInputField
          label={intl.formatMessage({ id: "LOGIN_EMAIL_LABEL" })}
          placeholder={intl.formatMessage({ id: "LOGIN_EMAIL_PLACEHOLDER" })}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <Button appearance="primary" width="100%" onClick={handleLogin}>
          <FormattedMessage id="LOGIN_BUTTON_TEXT" />
        </Button>
      </Pane>
    </Pane>
  );
};

export default Login;
