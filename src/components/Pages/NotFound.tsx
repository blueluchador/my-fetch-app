import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Button, Heading, majorScale, Pane, Text } from "evergreen-ui";

const NotFound: React.FC = () => {
  const intl = useIntl();

  return (
    <Pane
      alignItems="center"
      aria-labelledby="not-found-heading"
      background="tint2"
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      padding={majorScale(4)}
      role="main">
      {/* Heading for the not found page */}
      <Heading
        aria-level={1}
        id="not-found-heading"
        marginBottom={majorScale(2)}
        role="heading"
        size={900}>
        <FormattedMessage id="PAGE_NOT_FOUND_TITLE" />
      </Heading>

      {/* Description text */}
      <Text
        aria-label={intl.formatMessage({ id: "PAGE_NOT_FOUND_ARIAL_LABEL" })}
        marginBottom={majorScale(4)}
        role="article"
        size={500}>
        <FormattedMessage id="PAGE_NOT_FOUND_TEXT" />
      </Text>

      {/* Back to Home Button */}
      <Link style={{ textDecoration: "none" }} to="/">
        <Button
          appearance="primary"
          aria-label={intl.formatMessage({ id: "BACK_HOME_BUTTON_ARIA_LABEL" })}>
          <FormattedMessage id="BACK_HOME_BUTTON_TEXT" />
        </Button>
      </Link>
    </Pane>
  );
};

export default NotFound;
