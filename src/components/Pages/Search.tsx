import React from "react";
import { FormattedMessage } from "react-intl";
import { Heading, Pane } from "evergreen-ui";

const Search: React.FC = () => {
  return (
    <Pane>
      <Heading size={800}>
        <FormattedMessage id="SEARCH_PAGE_HEADING" />
      </Heading>
    </Pane>
  );
};

export default Search;
