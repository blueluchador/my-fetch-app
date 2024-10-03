import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Card, Heading, IconButton, Image, Pane, Text } from "evergreen-ui";
import { HeartIcon } from "evergreen-ui"; // Import the Heart Icon

import { Dog } from "../../models";
import { AppDispatch } from "../../redux";
import { getFavoriteDogs } from "../../redux/selectors";
import { loadFavorites, removeFromFavorites } from "../../redux/thunks/favorites.thunks";

// DogCard component that accepts a Dog object as a prop
const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleUnheartDog = (id: string) => dispatch(removeFromFavorites(id));

  return (
    <Card
      alignItems="center"
      display="flex"
      elevation={2}
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
        <Pane position="absolute" right={8} top={8}>
          <IconButton icon={HeartIcon} intent="danger" onClick={() => handleUnheartDog(dog.id)} />
        </Pane>
      </Pane>

      {/* Dog details */}
      <Heading marginTop={8} size={600}>
        {dog.name}
      </Heading>
      <Text>Breed: {dog.breed}</Text>
      <Text>Age: {dog.age}</Text>
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
    <Pane padding={24}>
      {dogs.length === 0 ? (
        <Text>No favorite dogs available</Text>
      ) : (
        <Pane display="grid" gap={16} gridTemplateColumns="repeat(3, 1fr)" justifyContent="center">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </Pane>
      )}
    </Pane>
  );
};

const Favorites: React.FC = () => (
  <Pane margin="auto" width={800}>
    <Heading size={800}>
      <FormattedMessage id="FAVORITES_PAGE_HEADING" />
    </Heading>
    <DogGrid />
  </Pane>
);

export default Favorites;
