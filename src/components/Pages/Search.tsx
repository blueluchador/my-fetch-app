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
  Spinner,
  Table,
  TextInput,
} from "evergreen-ui";

import { Dog } from "../../models";
import { AppDispatch } from "../../redux";
import { getDogBreeds, getDogs, getDogsLoading } from "../../redux/selectors";
import { fetchDogBreeds, searchDogs } from "../../redux/thunks/dogs.thunks";

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const breeds: string[] = useSelector(getDogBreeds);
  const dogsLoading = useSelector(getDogsLoading);
  const dogData: Dog[] = useSelector(getDogs);

  useEffect(() => {
    dispatch(fetchDogBreeds());
    dispatch(searchDogs());
  }, [dispatch]);

  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(dogData);
  const [breedFilter, setBreedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const dogsPerPage = 25;

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
  }, [breedFilter, dogData, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (dogsLoading) {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
        }}>
        <Spinner />
      </div>
    );
  }

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
