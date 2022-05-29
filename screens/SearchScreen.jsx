import { COLORS } from "../constants/styles";

import BodyWrapper from "../components/UI/BodyWrapper";
import SearchMovieBody from "../components/searchScreen/SearchMovieBody";

const SearchScreen = () => {
  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <SearchMovieBody />
    </BodyWrapper>
  );
};

export default SearchScreen;
