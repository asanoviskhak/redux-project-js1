import axios from "axios";
import {
    moviesSuccess,
    moviesError,
    movieSuccess,
    movieIsLoading,
    moviesAreLoading,
    moviesNextSuccess,
    moviesNextLoading
} from "../slices/movies";
import {
    getDocs,
    collection,
    addDoc,
    getDoc,
    doc,
    deleteDoc,
    updateDoc,
    query,
    limit,
    orderBy,
    startAt,
    startAfter,
} from "firebase/firestore";
import { db } from "../../firebaseConfigs";
import { toast } from "react-toastify";

const API = "http://localhost:8000/movies";

export const GetMovies = () => async (dispatch) => {
    try {
        dispatch(moviesAreLoading());
        const movieList = [];
        // const movies = await getDocs(collection(db, "movies"))
        const movies = await getDocs(
            query(collection(db, "movies"), limit(4), orderBy("title"))
        );
        console.log(movies);
        movies.docs.forEach((movie) => {
            movieList.push({
                ...movie.data(),
                id: movie.id,
            });
        });
        const lastDoc = movies.docs[movies.docs.length - 1];
        // console.log(lastDoc);
        dispatch(
            moviesSuccess({
                movies: movieList,
                lastDoc,
            })
        );
    } catch (err) {
        dispatch(moviesError(err.message));
    }
};

export const GetMoviesNext = (lastDoc) => async (dispatch) => {
    try {
        // dispatch(moviesAreLoading());
        dispatch(moviesNextLoading());
        const movieList = [];
        const movies = await getDocs(
            query(
                collection(db, "movies"),
                orderBy("title"),
                limit(4),
                startAfter(lastDoc)
            )
        );
        movies.docs.forEach((movie) => {
            movieList.push({
                ...movie.data(),
                id: movie.id,
            });
        });
        const lastDocNext = movies.docs[movies.docs.length - 1];
        dispatch(moviesNextSuccess({
            movies: movieList,
            lastDoc: lastDocNext
        }))
    } catch (err) {
        dispatch(moviesError(err.message));
    }
};

export const AddMovieAction = (movie) => async (dispatch) => {
    await addDoc(collection(db, "movies"), movie);
    dispatch(GetMovies());
    toast.success("You successfully added new movie!");
};

export const GetMovie = (movieId) => async (dispatch) => {
    dispatch(movieIsLoading());
    const movie = await getDoc(doc(db, "movies", `${movieId}`));
    dispatch(
        movieSuccess({
            id: movie.id,
            ...movie.data(),
        })
    );
};

export const UpdateMovie = (movieId, movieData) => async (dispatch) => {
    await updateDoc(doc(db, "movies", `${movieId}`), movieData).then(() => {
        dispatch(GetMovie(movieId));
    })
}