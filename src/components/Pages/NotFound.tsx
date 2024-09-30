import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, majorScale, Pane, Text } from "evergreen-ui";

// Define NotFound component as a Functional Component (FC)
const NotFound: FC = () => (
  <Pane
    alignItems="center"
    background="tint2"
    display="flex"
    flexDirection="column"
    height="100vh"
    justifyContent="center"
    padding={majorScale(4)}>
    <Text fontWeight={600} marginBottom={majorScale(2)} size={900}>
      404 - Page Not Found
    </Text>
    <Text marginBottom={majorScale(4)} size={500}>
      Oops! The page you are looking for does not exist.
    </Text>

    {/* Back to Home Button */}
    <Link style={{ textDecoration: "none" }} to="/">
      <Button appearance="primary">Go Back to Home</Button>
    </Link>
  </Pane>
);

export default NotFound;
