// import React from "react";
// import { FormattedMessage } from "react-intl";
// import { Heading, Pane } from "evergreen-ui";

// const Favorites: React.FC = () => {
//   return (
//     <Pane>
//       <Heading size={800}>
//         <FormattedMessage id="FAVORITES_PAGE_HEADING" />
//       </Heading>
//     </Pane>
//   );
// };

// export default Favorites;
import React from "react";
import { FormattedMessage } from "react-intl";
import { Card, Heading, Image, Pane, Text } from "evergreen-ui";

// Define the Dog interface
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

// Example dog data
const dogs: Dog[] = [
  {
    age: 3,
    breed: "Labrador",
    id: "1",
    img: "https://example.com/dog1.jpg",
    name: "Buddy",
    zip_code: "90210",
  },
  {
    age: 5,
    breed: "Golden Retriever",
    id: "2",
    img: "https://example.com/dog2.jpg",
    name: "Max",
    zip_code: "30301",
  },
  {
    age: 2,
    breed: "Beagle",
    id: "3",
    img: "https://example.com/dog3.jpg",
    name: "Bella",
    zip_code: "10001",
  },
  {
    age: 4,
    breed: "Poodle",
    id: "4",
    img: "https://example.com/dog4.jpg",
    name: "Charlie",
    zip_code: "60601",
  },
  {
    age: 6,
    breed: "Bulldog",
    id: "5",
    img: "https://example.com/dog5.jpg",
    name: "Lucy",
    zip_code: "94105",
  },
];

// DogCard component that accepts a Dog object as a prop
const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => (
  <Card
    alignItems="center"
    display="flex"
    elevation={2}
    flexDirection="column"
    justifyContent="center"
    margin={16}
    padding={16}
    width={240}>
    <Image borderRadius={8} height={200} src={dog.img} width={200} />
    <Heading marginTop={8} size={600}>
      {dog.name}
    </Heading>
    <Text>Breed: {dog.breed}</Text>
    <Text>Age: {dog.age}</Text>
  </Card>
);

// DogGrid component that maps over the dog data and displays it in a grid
const DogGrid: React.FC = () => (
  <Pane
    display="grid"
    gridGap={16}
    gridTemplateColumns="repeat(3, 1fr)"
    justifyContent="center"
    padding={24}>
    {dogs.map((dog) => (
      <DogCard key={dog.id} dog={dog} />
    ))}
  </Pane>
);

const Favorites: React.FC = () => (
  <Pane margin="auto" width={800}>
    <Heading size={800}>
      <FormattedMessage id="FAVORITES_PAGE_HEADING" />
    </Heading>
    <DogGrid />
  </Pane>
);

export default Favorites;
