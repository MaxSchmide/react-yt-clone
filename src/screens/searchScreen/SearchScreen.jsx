/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchByKeyword } from "../../utils";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBar from "../../components/filterBar/FilterBar";
import SearchedVideo from "../../components/searchedVideo/SearchedVideo";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { results, loading, nextPageToken } = useSelector(
    (state) => state.search
  );
  const fetchData = () => {
    dispatch(searchByKeyword(query, nextPageToken));
  };
  useEffect(() => {
    dispatch(searchByKeyword(query, nextPageToken));
  }, [query, dispatch, nextPageToken]);
  return (
    <>
      <Container>
        <FilterBar />
        <InfiniteScroll
          style={{
            overflow: "none",
            display: "flex",
            flexWrap: "wrap",
          }}
          dataLength={results.length}
          next={fetchData}
          hasMore={true}
          loader={
            <Spinner
              style={{ margin: "0 auto" }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
        >
          {!loading &&
            results.map((item, i) => (
              <SearchedVideo result={item} key={item.id} />
            ))}
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default SearchScreen;
