import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetMovie } from "../store/actions/moviesActions";
import { Button, Spinner } from "react-bootstrap";

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie, movieLoading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(GetMovie(params.movieId));
  }, [params]);

  if (movieLoading === true) {
    return <Spinner animation="grow" />;
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "500px",
          backgroundImage: `url(${movie.cover})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-2",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: "-1",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1
            style={{ color: "white", fontSize: "108px", textAlign: "center" }}
          >
            {movie.title}
          </h1>
        </div>
      </div>
      <div className="container mt-5">
        <Button onClick={() => navigate(`/edit-movie/${params.movieId}`)}>
          Edit movie
        </Button>
      </div>
    </>
  );
};

export default Details;
