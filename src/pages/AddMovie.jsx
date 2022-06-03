import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AddMovieAction } from "../store/actions/moviesActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    release_year: "",
    cover: "",
    genres: "",
  });

  const inputHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  console.log(form);

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Form>
        <h4>Add new movie</h4>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            onChange={inputHandler}
            type="text"
            placeholder="Avatar 2"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            onChange={inputHandler}
            as="textarea"
            rows={3}
            placeholder="Some description"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Release year</Form.Label>
          <Form.Control
            name="release_year"
            onChange={inputHandler}
            type="date"
            placeholder="12.03.2021"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            name="cover"
            onChange={inputHandler}
            type="text"
            placeholder="Paste image URL"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Genres</Form.Label>
          <Form.Control
            name="genres"
            onChange={inputHandler}
            type="text"
            placeholder="Action, Thriller, Sci-Fi"
          />
        </Form.Group>
        <Button
          onClick={() => {
            dispatch(AddMovieAction(form));
            navigate("/movies");
          }}
          className="mt-3"
        >
          Upload movie
        </Button>
      </Form>
    </Container>
  );
};

export default AddMovie;
