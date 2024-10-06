import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
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
import {
  getDogBreeds,
  getDogs,
  getDogsLoading,
  getFavoriteDogs,
  getNumSearchResults,
} from "../../redux/selectors";
import { fetchDogBreeds, searchDogs } from "../../redux/thunks";
import {
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
} from "../../redux/thunks/favorites.thunks";

const Search: React.FC = () => {
  const intl = useIntl();

  const dispatch: AppDispatch = useDispatch();

  const viealAllBreedsFilterLabel: string = intl.formatMessage({
    id: "VIEW_ALL_BREEDS_FILTER_LABEL",
  });

  const breeds: string[] = [...[viealAllBreedsFilterLabel], ...useSelector(getDogBreeds)];
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  useEffect(() => {
    const breeds =
      breedFilter === "" || breedFilter === viealAllBreedsFilterLabel ? undefined : [breedFilter];

    dispatch(searchDogs(breeds, sortOrder, (currentPage - 1) * dogsPerPage));
  }, [breedFilter, dispatch, sortOrder, currentPage, viealAllBreedsFilterLabel]);

  const sortByAgeLabel = intl.formatMessage({ id: "SORT_BY_AGE_LABEL" });
  const sortByBreedAscendingLabel = intl.formatMessage({ id: "SORT_BY_BREED_ASCENDING_LABEL" });
  const sortByBreedDescendingLabel = intl.formatMessage({ id: "SORT_BY_BREED_DECENDING_LABEL" });

  const sortOrderMap = {
    "age:asc": sortByAgeLabel,
    "breed:asc": sortByBreedAscendingLabel,
    "breed:desc": sortByBreedDescendingLabel,
  } as const;

  // Create a reverse map with an explicit type
  const reverseSortOrderMap = {
    [sortByAgeLabel]: "age:asc",
    [sortByBreedAscendingLabel]: "breed:asc",
    [sortByBreedDescendingLabel]: "breed:desc",
  } as Record<string, "breed:asc" | "breed:desc" | "age:asc">;

  const handleBreedFilterChange = (selectedItem: string) => {
    setBreedFilter(selectedItem);
    setCurrentPage(1);
  };

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

  // Detect if this is running on a mobile device.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaChange = () => {
      setIsMobile(mobileQuery.matches);
    };

    handleMediaChange();
    mobileQuery.addEventListener("change", handleMediaChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

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
            title={intl.formatMessage({ id: "FILTER_BY_BREED_TITLE" })}
            onChange={handleBreedFilterChange}>
            {({ getInputProps, getRef, openMenu }) => {
              return (
                <TextInput
                  ref={getRef}
                  placeholder={intl.formatMessage({ id: "FILTER_BY_BREED_PLACEHOLDER" })}
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
            aria-label={intl.formatMessage({ id: "SORT_COMBOBOX_ARIA_LABEL" })}
            items={Object.values(sortOrderMap)}
            marginBottom={16}
            selectedItem={sortOrderMap[sortOrder]}
            onChange={handleSortOrderChange}
          />
        </Pane>
      </Pane>

      {/* Dog list */}
      <Table aria-label={intl.formatMessage({ id: "DOG_LIST_TABLE_ARIA_LABEL" })}>
        <Table.Head>
          <Table.TextHeaderCell>
            <FormattedMessage id="AVATAR_COLUMN_LABEL" />
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            <FormattedMessage id="DOG_NAME_COLUMN_LABEL" />
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            <FormattedMessage id="BREED_COLUMN_LABEL" />
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            <FormattedMessage id="AGE_COLUMN_LABEL" />
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            <FormattedMessage id="ZIP_CODE_COLUMN_LABEL" />
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            <FormattedMessage id="FAVORITES_COLUMN_LABEL" />
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={isMobile ? "100%" : 480}>
          {dogsLoading ? (
            // Display spinner inside the table body
            <Table.Row>
              <Table.TextCell gridColumn="1 / -1" textAlign="center">
                <Pane alignItems="center" display="flex" justifyContent="center">
                  <Spinner
                    aria-label={intl.formatMessage({ id: "DOG_LIST_LOADING_SPINNER_ARIA_LABEL" })}
                    marginRight={8}
                    size={24}
                  />
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
                    aria-label={intl.formatMessage(
                      {
                        id: dogExists(dog.id)
                          ? "REMOVE_FROM_FAVORITES_ARIA_LABEL"
                          : "ADD_TO_FAVORITES_ARIA_LABEL",
                      },
                      { name: dog.name },
                    )}
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
      <Pagination
        aria-label={intl.formatMessage({
          defaultMessage: "Dog list pagination",
          id: "DOG_LIST_PAGINATION_ARIA_LABEL",
        })}
        page={currentPage}
        totalPages={totalPages()}
        onNextPage={() => setCurrentPage(currentPage + 1)}
        onPageChange={handlePageChange}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
      />
    </Pane>
  );
};

export default Search;
