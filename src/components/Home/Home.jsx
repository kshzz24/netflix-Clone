import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "API_KEY";
const url = "URL";
const genreURL = "FIG_URL";
const upcoming = "upcoming";
const imageUrl = "IMG_URL";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => {
  return <img className="card" src={img} alt="" />;
};

const Row = ({ title, movies = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {movies.map((item, index) => (
          <Card key={index} img={`${imageUrl}${item.poster_path}`} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topratedMovies, settopratedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcomingData = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };
    fetchUpcomingData();

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    fetchNowPlaying();

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
      setpopularMovies(results);
    };
    fetchPopular();

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${topRated}?api_key=${apiKey}`);
      settopratedMovies(results);
    };
    fetchTopRated();

    const getAllgenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${genreURL}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
    };
    getAllgenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imageUrl}${popularMovies[0].poster_path}`})`
            : "rgb(16,16,16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
          <button>
            {" "}
            <BiPlay /> Play
          </button>
          <button>
            My List
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} movies={upcomingMovies} />
      <Row title={"Now Playing"} movies={nowPlayingMovies} />
      <Row title={"Popular"} movies={popularMovies} />
      <Row title={"Top - Rated"} movies={topratedMovies} />
      <div className="genreBox">
        {genre.map((item, index) => (
          <Link key={index.id} to={`/genre${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
