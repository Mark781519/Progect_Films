import { memo } from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButtons from "pages/FilmsPage/components/FilmCardButtons";

const FilmCard = ({ film }) => {
  return (
    <div className="ui card">
      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>

        <Featured film={film} />
        <img src={film.img} alt={film.title} />
      </div>

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>
      <FilmCardButtons film={film} />
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(FilmCard);