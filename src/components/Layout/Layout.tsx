import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Button, Link, majorScale, Pane, Text } from "evergreen-ui";

import { AppDispatch } from "../../redux";
import { logout } from "../../redux/thunks";

// Define types for props
interface LayoutProps {
  children: ReactNode; // This ensures that the Layout can accept any valid React child
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Pane display="flex" flexDirection="column" minHeight="100vh">
      {/* Top Navigation */}
      <Pane
        borderBottom
        alignItems="center"
        background="tint2"
        display="flex"
        justifyContent="space-between"
        padding={majorScale(2)}>
        <Text fontWeight={500} size={600}>
          <FormattedMessage id="APP_NAME" />
        </Text>

        <Pane alignItems="center" display="flex">
          {/* Search Link */}
          <Link href="/search" style={{ marginRight: majorScale(2), textDecoration: "none" }}>
            <Text fontWeight={500}>Search</Text>
          </Link>

          {/* Favorites Link */}
          <Link href="/favorites" style={{ marginRight: majorScale(2), textDecoration: "none" }}>
            <Text fontWeight={500}>Favorites</Text>
          </Link>

          {/* Logout Button */}
          <Button appearance="primary" onClick={handleLogout}>
            <FormattedMessage id="LOGOUT_BUTTON_TEXT" />
          </Button>
        </Pane>
      </Pane>

      {/* Body */}
      <Pane flex={1} padding={majorScale(3)}>
        {children} {/* Render dynamic content here */}
      </Pane>

      {/* Footer */}
      <Pane
        borderTop
        alignItems="center"
        background="tint1"
        display="flex"
        justifyContent="center"
        padding={majorScale(2)}>
        <Text size={400}>
          <span>© {new Date().getFullYear()} </span>
          <FormattedMessage id="LOGOUT_BUTTON_TEXT" />. All rights reserved.
        </Text>
      </Pane>
    </Pane>
  );
};

export default Layout;
