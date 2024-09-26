import React from "react";
import { FormattedMessage } from "react-intl";
import { Heading, Pane } from "evergreen-ui";

const Favorites: React.FC = () => {
  return (
    <Pane>
      <Heading size={800}>
        <FormattedMessage id="FAVORITES_PAGE_HEADING" />
      </Heading>
    </Pane>
  );
};

export default Favorites;
