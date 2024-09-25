import { FormattedMessage } from "react-intl";
import { Pane, Text } from "evergreen-ui";

export default function App() {
  return (
    <Pane>
      <Text>
        <FormattedMessage id="HELLO_WORLD_TEXT" />
      </Text>
    </Pane>
  );
}
