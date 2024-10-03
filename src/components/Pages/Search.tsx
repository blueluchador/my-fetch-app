import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Avatar,
  Combobox,
  Heading,
  HeartIcon,
  Pagination,
  Pane,
  Spinner,
  Table,
  TextInput,
} from "evergreen-ui";

import { Dog } from "../../models";
import { AppDispatch } from "../../redux";
import { addToFavorites, removeFromFavorites } from "../../redux/actions";
import {
  getDogBreeds,
  getDogs,
  getDogsLoading,
  getFavoriteDogs,
  getNumSearchResults,
} from "../../redux/selectors";
import { fetchDogBreeds, searchDogs } from "../../redux/thunks/dogs.thunks";

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const breeds: string[] = useSelector(getDogBreeds);
  const numSearchResults = useSelector(getNumSearchResults);
  const dogsLoading = useSelector(getDogsLoading);
  const dogData: Dog[] = useSelector(getDogs);
  const favoriteDogs: Dog[] = useSelector(getFavoriteDogs);

  const [breedFilter, setBreedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"breed:asc" | "breed:desc" | "age:asc">("breed:asc");

  const dogsPerPage = 25;
  const totalPages = (): number => Math.ceil(numSearchResults / dogsPerPage);

  const dogExists = (id: string): boolean => favoriteDogs.some((dog) => dog.id === id);

  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, []);

  useEffect(() => {
    dispatch(searchDogs(breedFilter === "" ? undefined : [breedFilter], sortOrder));
  }, [breedFilter, dispatch, sortOrder]);

  const sortOrderMap = {
    "age:asc": "Sort by Age",
    "breed:asc": "Sort by Breed: A-Z",
    "breed:desc": "Sort by Breed: Z-A",
  } as const;

  // Create a reverse map with an explicit type
  const reverseSortOrderMap = {
    "Sort by Age": "age:asc",
    "Sort by Breed: A-Z": "breed:asc",
    "Sort by Breed: Z-A": "breed:desc",
  } as Record<string, "breed:asc" | "breed:desc" | "age:asc">;

  const handleSortOrderChange = (selected: string) => {
    setSortOrder(reverseSortOrderMap[selected]);
  };

  const handleFavoriteClicked = (id: string) => {
    if (dogExists(id)) {
      dispatch(removeFromFavorites(id));
    } else {
      const dog: Dog = dogData.find((d) => d.id === id)!;
      dispatch(addToFavorites(dog));
    }
  };

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
                  onFocus={openMenu}
                  {...getInputProps()}
                />
              );
            }}
          </Autocomplete>
        </Pane>

        {/* Sort combobox */}
        <Pane>
          <Combobox
            items={Object.values(sortOrderMap)}
            marginBottom={16}
            selectedItem={sortOrderMap[sortOrder]}
            onChange={handleSortOrderChange}
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
          <Table.TextHeaderCell></Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {dogsLoading ? (
            // Display spinner inside the table body
            <Table.Row>
              <Table.TextCell gridColumn="1 / -1" textAlign="center">
                <Pane alignItems="center" display="flex" justifyContent="center">
                  <Spinner marginRight={8} size={24} />
                  Fetching dogs...
                </Pane>
              </Table.TextCell>
            </Table.Row>
          ) : (
            dogData.map((dog) => (
              <Table.Row key={dog.id}>
                <Table.TextCell>
                  <Avatar name={dog.name} size={48} src={dog.img} />
                </Table.TextCell>
                <Table.TextCell>{dog.name}</Table.TextCell>
                <Table.TextCell>{dog.breed}</Table.TextCell>
                <Table.TextCell>{dog.age}</Table.TextCell>
                <Table.TextCell>{dog.zip_code}</Table.TextCell>
                <Table.TextCell>
                  <HeartIcon
                    color={dogExists(dog.id) ? "danger" : "disabled"}
                    cursor="pointer"
                    size={18}
                    onClick={() => handleFavoriteClicked(dog.id)}
                  />
                </Table.TextCell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <Pagination page={currentPage} totalPages={totalPages()} onPageChange={handlePageChange} />
    </Pane>
  );
};

export default Search;

//           {/* Favorites Icon (Heart) */}
//           <Icon
//             icon={favorites.includes(dog.id) ? 'heart' : 'heart-outline'}
//             color={favorites.includes(dog.id) ? 'danger' : 'muted'}
//             size={24}
//             cursor="pointer"
//             onClick={() => toggleFavorite(dog.id)}
//           />
