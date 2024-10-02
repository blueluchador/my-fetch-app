import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Avatar,
  Combobox,
  Heading,
  Pagination,
  Pane,
  Table,
  TextInput,
} from "evergreen-ui";

import { Dog } from "../../models";
import { AppDispatch } from "../../redux";
import { getDogBreeds } from "../../redux/selectors";
import { fetchDogBreeds } from "../../redux/thunks/dogs.thunks";

// Example dog data (10 items)
const dogData: Dog[] = [
  { age: 2, breed: "Beagle", id: "1", img: "/dog1.jpg", name: "Buddy", zip_code: "90210" },
  { age: 4, breed: "Labrador", id: "2", img: "/dog2.jpg", name: "Max", zip_code: "10001" },
  { age: 3, breed: "Poodle", id: "3", img: "/dog3.jpg", name: "Charlie", zip_code: "30301" },
  { age: 1, breed: "Bulldog", id: "4", img: "/dog4.jpg", name: "Bella", zip_code: "33101" },
  { age: 5, breed: "Shih Tzu", id: "5", img: "/dog5.jpg", name: "Lucy", zip_code: "60601" },
  { age: 6, breed: "Boxer", id: "6", img: "/dog6.jpg", name: "Rocky", zip_code: "70101" },
  {
    age: 7,
    breed: "Golden Retriever",
    id: "7",
    img: "/dog7.jpg",
    name: "Bailey",
    zip_code: "80201",
  },
  { age: 4, breed: "Cocker Spaniel", id: "8", img: "/dog8.jpg", name: "Cooper", zip_code: "10001" },
  { age: 3, breed: "Dachshund", id: "9", img: "/dog9.jpg", name: "Molly", zip_code: "90210" },
  { age: 2, breed: "Chihuahua", id: "10", img: "/dog10.jpg", name: "Daisy", zip_code: "33101" },
];

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const breeds: string[] = useSelector(getDogBreeds);

  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, [dispatch]);

  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(dogData);
  const [breedFilter, setBreedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const dogsPerPage = 5;

  useEffect(() => {
    const sortedDogs = [...dogData]
      .filter((dog) => breedFilter === "" || dog.breed === breedFilter)
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.breed.localeCompare(b.breed);
        } else {
          return b.breed.localeCompare(a.breed);
        }
      });
    setFilteredDogs(sortedDogs);
  }, [breedFilter, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pane margin="auto" width={800}>
      <Heading marginBottom={16} size={800}>
        <FormattedMessage id="SEARCH_PAGE_HEADING" />
      </Heading>

      <Pane display="flex" justifyContent="flex-end" marginBottom={3}>
        {/* Breed filter with autocomplete */}
        <Pane flex="1">
          <Autocomplete
            items={breeds}
            title="Filter by Breed"
            onChange={(selectedItem) => setBreedFilter(selectedItem)}>
            {({ getInputProps, getRef, openMenu }) => {
              return (
                <TextInput
                  ref={getRef}
                  placeholder="Filter by breed"
                  onFocus={openMenu} // Opens the menu when the input is focused
                  {...getInputProps()}
                />
              );
            }}
          </Autocomplete>
        </Pane>

        {/* Sort combobox */}
        <Pane>
          <Combobox
            items={["Ascending", "Descending", "Sort by Age"]}
            marginBottom={16}
            placeholder="Sort by Breed"
            selectedItem={sortOrder === "asc" ? "Ascending" : "Descending"}
            onChange={(selected) => setSortOrder(selected === "Ascending" ? "asc" : "desc")}
          />
        </Pane>
      </Pane>

      {/* Dog list */}
      <Table>
        <Table.Head>
          <Table.TextHeaderCell></Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Breed</Table.TextHeaderCell>
          <Table.TextHeaderCell>Age</Table.TextHeaderCell>
          <Table.TextHeaderCell>Zip Code</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {filteredDogs
            .slice((currentPage - 1) * dogsPerPage, currentPage * dogsPerPage)
            .map((dog) => (
              <Table.Row key={dog.id}>
                <Table.TextCell>
                  <Avatar name={dog.name} size={40} src={dog.img} />
                </Table.TextCell>
                <Table.TextCell>{dog.name}</Table.TextCell>
                <Table.TextCell>{dog.breed}</Table.TextCell>
                <Table.TextCell>{dog.age}</Table.TextCell>
                <Table.TextCell>{dog.zip_code}</Table.TextCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <Pagination
        page={currentPage}
        totalPages={Math.ceil(filteredDogs.length / dogsPerPage)}
        onPageChange={handlePageChange}
      />
    </Pane>
  );
};

export default Search;

// import React, { useState } from 'react'
// import { Pane, Text, Icon, Avatar, Autocomplete, Combobox, Button } from 'evergreen-ui'

// interface Dog {
//   id: string
//   img: string
//   name: string
//   age: number
//   zip_code: string
//   breed: string
// }

// const DogList = ({ dogs }: { dogs: Dog[] }) => {
//   const [favorites, setFavorites] = useState<string[]>([])

//   const toggleFavorite = (dogId: string) => {
//     setFavorites(prevFavorites =>
//       prevFavorites.includes(dogId)
//         ? prevFavorites.filter(fav => fav !== dogId) // Remove from favorites
//         : [...prevFavorites, dogId] // Add to favorites
//     )
//   }

//   return (
//     <Pane>
//       {dogs.map((dog) => (
//         <Pane key={dog.id} display="flex" alignItems="center" justifyContent="space-between" padding={8} border="default" marginBottom={8}>
//           <Pane display="flex" alignItems="center">
//             <Avatar src={dog.img} name={dog.name} size={40} marginRight={16} />
//             <Pane>
//               <Text>Name: {dog.name}</Text>
//               <Text>Breed: {dog.breed}</Text>
//               <Text>Age: {dog.age}</Text>
//               <Text>Zip Code: {dog.zip_code}</Text>
//             </Pane>
//           </Pane>

//           {/* Favorites Icon (Heart) */}
//           <Icon
//             icon={favorites.includes(dog.id) ? 'heart' : 'heart-outline'}
//             color={favorites.includes(dog.id) ? 'danger' : 'muted'}
//             size={24}
//             cursor="pointer"
//             onClick={() => toggleFavorite(dog.id)}
//           />
//         </Pane>
//       ))}
//     </Pane>
//   )
// }

// const dogs: Dog[] = [
//   {
//     id: '1',
//     img: 'https://placekitten.com/100/100',
//     name: 'Buddy',
//     age: 2,
//     zip_code: '12345',
//     breed: 'Labrador'
//   },
//   {
//     id: '2',
//     img: 'https://placekitten.com/100/100',
//     name: 'Max',
//     age: 3,
//     zip_code: '54321',
//     breed: 'Beagle'
//   },
//   // Add more dog entries here
// ]

// const App = () => {
//   return (
//     <Pane>
//       <DogList dogs={dogs} />
//     </Pane>
//   )
// }

// export default App
