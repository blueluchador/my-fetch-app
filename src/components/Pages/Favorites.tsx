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

// DogCard component that accepts a Dog object as a prop
const DogCard: React.FC<{ dog: Dog; forMatch?: boolean }> = ({ dog, forMatch }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleUnheartDog = (id: string) => dispatch(removeFromFavorites(id));

  return (
    <Card
      alignItems="center"
      display="flex"
      elevation={forMatch ? 0 : 2}
      flexDirection="column"
      justifyContent="center"
      margin={16}
      padding={16}
      width={240}>
      {/* Pane that contains the image and heart icon */}
      <Pane height={200} position="relative" width={200}>
        {/* Image of the dog */}
        <Image borderRadius={8} height={200} src={dog.img} width={200} />

        {/* Heart icon overlay */}
        {forMatch ? (
          <></>
        ) : (
          <Pane position="absolute" right={8} top={8}>
            <IconButton icon={HeartIcon} intent="danger" onClick={() => handleUnheartDog(dog.id)} />
          </Pane>
        )}
      </Pane>

      {/* Dog details */}
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

// DogGrid component that maps over the dog data and displays it in a grid
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

// Favorites component with conditional rendering for the Fetch Match button
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
      {/* Dog match dialog */}
      <Dialog
        confirmLabel={intl.formatMessage({ id: "DOG_MATCH_CONFIRM_LABEL" })}
        hasCancel={false}
        hasClose={!isDogMatchLoading}
        hasFooter={!isDogMatchLoading}
        isShown={isShown}
        title={intl.formatMessage({ id: "DOG_MATCH_DIALOG_TITLE" })}
        onCloseComplete={() => setIsShown(false)}>
        {isDogMatchLoading ? (
          <Pane alignItems="center" display="flex" justifyContent="center">
            <Spinner marginRight={8} size={24} />
            <Text>
              <FormattedMessage id="DOG_MATCH_LOADING_MESSAGE" />
            </Text>
          </Pane>
        ) : (
          <Pane alignItems="center" display="flex" flexDirection="column">
            {/* Flex container for image and text side by side */}
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

            {/* DogCard below the image and text */}
            <Pane marginTop={16}>
              <DogCard dog={getMatchedDog()} forMatch={true} />
            </Pane>
          </Pane>
        )}
      </Dialog>

      <Heading marginBottom={16} size={800}>
        <FormattedMessage id="FAVORITES_PAGE_HEADING" />
      </Heading>

      {/* Conditionally render the Fetch Match button if there are favorite dogs */}
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
