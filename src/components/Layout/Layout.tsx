import React, { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Link, majorScale, Pane, Pill, Text } from "evergreen-ui";

import { AppDispatch } from "../../redux";
import { getFavoriteDogs } from "../../redux/selectors";
import { logout } from "../../redux/thunks";

// Define types for props
interface LayoutProps {
  children: ReactNode; // This ensures that the Layout can accept any valid React child
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  const intl = useIntl();

  const favoritesCount: number = useSelector(getFavoriteDogs).length;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Pane display="flex" flexDirection="column" minHeight="100vh">
      {/* Top Navigation */}
      <Pane
        borderBottom
        alignItems="center"
        aria-label={intl.formatMessage({ id: "MAIN_NAVIGATION_ARIA_LABEL" })}
        background="tint2"
        display="flex"
        justifyContent="space-between"
        padding={majorScale(2)}
        role="navigation">
        {/* Container for Image and Text */}
        <Pane alignItems="center" display="flex">
          {/* Home link */}
          <Link aria-label={intl.formatMessage({ id: "HOME_LINK_ARIA_LABEL" })} href="/">
            <Pane alignItems="center" display="flex">
              <Image
                alt="App Logo"
                height={32}
                marginRight={majorScale(1)}
                src="/images/logo.png"
              />
              <Text fontWeight={500} size={600}>
                <FormattedMessage id="APP_NAME" />
              </Text>
            </Pane>
          </Link>
        </Pane>

        <Pane alignItems="center" display="flex">
          {/* Search Link */}
          <Link
            aria-label={intl.formatMessage({ id: "SEARCH_LINK_ARIAL_LABEL" })}
            href="/search"
            style={{ marginRight: majorScale(4) }}>
            <Text fontWeight={500}>
              <FormattedMessage id="SEARCH_NAV_TEXT" />
            </Text>
          </Link>

          {/* Favorites Link */}
          <Link
            aria-label={intl.formatMessage({ id: "FAVORITES_LINK_ARIA_LABEL" })}
            href="/favorites"
            style={{ marginRight: majorScale(4) }}>
            <Text fontWeight={500}>
              <FormattedMessage id="FAVORITES_NAV_TEXT" />
            </Text>
            {favoritesCount > 0 ? (
              <Pill
                aria-label={intl.formatMessage(
                  { id: "FAVORITES_PILL_ARIA_LABEL" },
                  { count: favoritesCount },
                )}
                color="red"
                display="inline-flex"
                margin={8}>
                {favoritesCount}
              </Pill>
            ) : null}
          </Link>

          {/* Logout Button */}
          <Button
            appearance="primary"
            aria-label={intl.formatMessage({ id: "LOGOUT_BUTTON_ARIA_LABEL" })}
            onClick={handleLogout}>
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
        aria-label={intl.formatMessage({ id: "FOOTER_ARIAL_LABEL" })}
        background="tint1"
        display="flex"
        justifyContent="center"
        padding={majorScale(2)}
        role="contentinfo">
        <Text size={400}>
          <span>&#169; {new Date().getFullYear()} </span>
          <FormattedMessage id="APP_NAME" />. All rights reserved.
        </Text>
      </Pane>
    </Pane>
  );
};

export default Layout;
