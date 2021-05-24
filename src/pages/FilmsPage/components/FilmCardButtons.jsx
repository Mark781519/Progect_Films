import { useContext, useState } from "react";
import FilmContext from "contexts/FilmContext";

const SelectButton = ({ film }) => {
  const { selectFilmForEdit } = useContext(FilmContext);

  return (
    <span
      onClick={() => selectFilmForEdit(film)}
      className="ui green basic button"
    >
      <i className="ui icon edit"></i>
    </span>
  );
};

const DeleteButton = ({ film }) => {
  const { deleteFilm } = useContext(FilmContext);

  return (
    <span onClick={() => deleteFilm(film)} class="ui red basic button">
      <i className="ui icon check" /> YES
    </span>
  );
};

const FilmCardButtons = ({ film }) => {
  const [show, setShow] = useState(false);

  const showConfirm = () => setShow(true);
  const hideConfirm = () => setShow(false);

  const confirmButtons = (
    <div className="ui two buttons">
      <DeleteButton film={film} />
      <span onClick={hideConfirm} className="ui grey basic button">
        <i className="ui icon close" /> NO
      </span>
    </div>
  );

  const buttons = (
    <div className="ui two buttons">
      <SelectButton film={film} />
      <span onClick={showConfirm} className="ui red basic button">
        <i className="ui icon trash"></i>
      </span>
    </div>
  );

  return <div className="extra content">{show ? confirmButtons : buttons}</div>;
};

export default FilmCardButtons;
