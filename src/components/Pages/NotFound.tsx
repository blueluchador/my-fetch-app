import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, majorScale, Pane, Text } from "evergreen-ui";

const NotFound: React.FC = () => (
  <Pane
    alignItems="center"
    background="tint2"
    display="flex"
    flexDirection="column"
    height="100vh"
    justifyContent="center"
    padding={majorScale(4)}>
    <Text fontWeight={600} marginBottom={majorScale(2)} size={900}>
      <FormattedMessage id="PAGE_NOT_FOUND_TITLE" />
    </Text>
    <Text marginBottom={majorScale(4)} size={500}>
      <FormattedMessage id="PAGE_NOT_FOUND_TEXT" />
    </Text>

    {/* Back to Home Button */}
    <Link style={{ textDecoration: "none" }} to="/">
      <Button appearance="primary">
        <FormattedMessage id="BACK_HOME_BUTTON_TEXT" />
      </Button>
    </Link>
  </Pane>
);

export default NotFound;
