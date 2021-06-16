import PropTypes from "prop-types";
import { useToggleFeatured } from "hooks/films";

const Featured = ({ film }) => {
  const mutation = useToggleFeatured();

  const cls = film.featured ? "yellow" : "empty";

  return (
    <span
      role="status"
      onClick={() => mutation.mutate({ ...film, featured: !film.featured })}
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
