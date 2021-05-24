import PropTypes from "prop-types";
import { useToggleFeatured } from "contexts/FilmContext";

const Featured = ({ film }) => {
  const toggle = useToggleFeatured();

  const cls = film.featured ? "yellow" : "empty";

  return (
    <span
      role="status"
      onClick={() => toggle(film._id)}
      className="ui right corner label"
    >
      <i className={`star icon ${cls}`}></i>
    </span>
  );
};

Featured.propTypes = {
  film: PropTypes.object.isRequired,
};

Featured.defaultProps = {
  film: {},
};

export default Featured;
