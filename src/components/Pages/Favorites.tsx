import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dialog,
  Heading,
  IconButton,
  Image,
  Pane,
  Spinner,
  Text,
} from "evergreen-ui";
import { HeartIcon } from "evergreen-ui";

import { Dog } from "../../models";
import { AppDispatch } from "../../redux";
import { getDogMatch, getDogMatchLoading, getFavoriteDogs } from "../../redux/selectors";
import { loadFavorites, removeFromFavorites } from "../../redux/thunks";
import { fetchDogMatch } from "../../redux/thunks/matchDog.thunks";

const DogCard: React.FC<{ dog: Dog; forMatch?: boolean }> = ({ dog, forMatch }) => {
  const dispatch: AppDispatch = useDispatch();
  const intl = useIntl();

  const handleUnheartDog = (id: string) => dispatch(removeFromFavorites(id));

  return (
    <Card
      alignItems="center"
      aria-label={intl.formatMessage({ id: "DOG_CARD_ARIA_LABEL" })}
      display="flex"
      elevation={forMatch ? 0 : 2}
      flexDirection="column"
      justifyContent="center"
      margin={16}
      padding={16}
      width={240}>
      <Pane height={200} position="relative" width={200}>
        <Image
          alt={intl.formatMessage({ id: "DOG_IMAGE_ALT_TEXT" })}
          borderRadius={8}
          height={200}
          src={dog.img}
          width={200}
        />

        {forMatch ? (
          <></>
        ) : (
          <Pane position="absolute" right={8} top={8}>
            <IconButton
              aria-label={intl.formatMessage({ id: "UNFAVORITE_BUTTON_ARIA_LABEL" })}
              icon={HeartIcon}
              intent="danger"
              onClick={() => handleUnheartDog(dog.id)}
            />
          </Pane>
        )}
      </Pane>

      <Heading marginTop={8} size={600}>
        {dog.name}
      </Heading>
      <Text>
        <FormattedMessage id="DOG_BREED_CARD_LABEL" values={{ breed: dog.breed }} />
      </Text>
      <Text>
        <FormattedMessage id="DOG_AGE_CARD_LABEL" values={{ age: dog.age }} />
      </Text>
    </Card>
  );
};

const DogGrid: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const dogs: Dog[] = useSelector(getFavoriteDogs);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return (
    <>
      {dogs.length === 0 ? (
        <Text>
          <FormattedMessage id="NO_FAVORITES_MESSAGE" />
        </Text>
      ) : (
        <Pane
          display="grid"
          gap={16}
          gridTemplateColumns="repeat(3, 1fr)"
          justifyContent="center"
          padding={24}>
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </Pane>
      )}
    </>
  );
};

const Favorites: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const intl = useIntl();

  const [isShown, setIsShown] = useState(false);

  const dogs: Dog[] = useSelector(getFavoriteDogs);
  const isDogMatchLoading: boolean = useSelector(getDogMatchLoading);
  const match: string = useSelector(getDogMatch);

  const getMatchedDog = (): Dog => {
    return dogs.find((dog) => dog.id === match)!;
  };

  const handleFetchMatch = () => {
    setIsShown(true);

    if (dogs.length > 0) {
      dispatch(fetchDogMatch(dogs.map((dog) => dog.id)));
    }
  };

  return (
    <Pane margin="auto" width={800}>
      <Dialog
        aria-label={intl.formatMessage({ id: "DOG_MATCH_DIALOG_ARIA_LABEL" })}
        confirmLabel={intl.formatMessage({ id: "DOG_MATCH_CONFIRM_LABEL" })}
        hasCancel={false}
        hasClose={!isDogMatchLoading}
        hasFooter={!isDogMatchLoading}
        isShown={isShown}
        title={intl.formatMessage({ id: "DOG_MATCH_DIALOG_TITLE" })}
        onCloseComplete={() => setIsShown(false)}>
        {isDogMatchLoading ? (
          <Pane alignItems="center" display="flex" justifyContent="center">
            <Spinner
              aria-label={intl.formatMessage({ id: "DOG_MATCH_LOADING_SPINNER_ARIA_LABEL" })}
              marginRight={8}
              size={24}
            />
            <Text>
              <FormattedMessage id="DOG_MATCH_LOADING_MESSAGE" />
            </Text>
          </Pane>
        ) : (
          <Pane alignItems="center" display="flex" flexDirection="column">
            <Pane alignItems="center" display="flex" justifyContent="center">
              <Pane>
                <Image alt="App Logo" src="/images/logo.png" />
              </Pane>
              <Pane marginLeft={16}>
                <Text size={600}>
                  <FormattedMessage id="DOG_MATCH_FOUND_MESSAGE" />
                </Text>
              </Pane>
            </Pane>
            <Pane marginTop={16}>
              <DogCard dog={getMatchedDog()} forMatch={true} />
            </Pane>
          </Pane>
        )}
      </Dialog>

      <Heading marginBottom={16} size={800}>
        <FormattedMessage id="FAVORITES_PAGE_HEADING" />
      </Heading>

      {dogs.length > 0 && (
        <Button appearance="primary" marginBottom={16} onClick={handleFetchMatch}>
          Fetch Match
        </Button>
      )}

      <DogGrid />
    </Pane>
  );
};

export default Favorites;
