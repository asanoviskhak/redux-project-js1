import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMovies, GetMoviesNext } from "../store/actions/moviesActions";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const { movies, moviesLoading, lastDoc, nextMoviesLoading } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetMovies());
  }, []);

  const nextMoviesHandler = () => {
    dispatch(GetMoviesNext(lastDoc));
  };

  return (
    <Container className="mt-5">
      <Button onClick={() => navigate("/add-movie")}>Add new Movie</Button>
      {moviesLoading === true ? (
        <Row className="mt-3">
          <Spinner animation="grow" />
        </Row>
      ) : (
        <Row className="mt-3" style={{ gap: "30px" }}>
          {movies.map((movie) => {
            return (
              <Card
                key={movie.id}
                style={{
                  width: "18rem",
                  position: "relative",
                  paddingBottom: "50px",
                }}
              >
                <Card.Img variant="top" src={movie.cover} height="320px" />
                <Card.Body>
                  <Card.Title>
                    {movie.title} - {movie.release_year}
                  </Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button
                    onClick={() => navigate(`${movie.id}`)}
                    style={{
                      position: "absolute",
                      left: "20px",
                      bottom: "20px",
                    }}
                    variant="secondary"
                  >
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      )}
      {nextMoviesLoading === true && <Spinner animation="grow" />}
      <Button onClick={nextMoviesHandler}>Load more</Button>
    </Container>
  );
};

export default Movies;
