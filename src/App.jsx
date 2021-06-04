import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from "lodash/find";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FilmContext from "contexts/FilmContext";
import TopNavigation from "components/TopNavigation";
import api from "api";
import { FullSpinner } from "styles/app";

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
    loading: true,
  };

  componentDidMount() {
    api.films.fetchAll().then((films) =>
      this.setState({
        films: this.sortFilms(films),
        loading: false,
      })
    );
  }

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = (_id) => {
    const film = _find(this.state.films, { _id });
    return this.updateFilm({ ...film, featured: !film.featured });
  };

  showForm = (e) => this.setState({ showAddForm: true, selectedFilm: {} });
  hideForm = (e) => this.setState({ showAddForm: false, selectedFilm: {} });

  selectFilmForEdit = (selectedFilm) =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    });

  addFilm = (filmData) =>
    api.films.create(filmData).then((film) =>
      this.setState(({ films, showAddForm, selectedFilm }) => ({
        films: this.sortFilms([...films, film]),
        showAddForm: false,
        selectedFilm: {},
      }))
    );

  updateFilm = (film) =>
    api.films.update(film).then((film) =>
      this.setState(({ films, showAddFilm, selectedFilm }) => ({
        films: this.sortFilms(
          films.map((f) => (f._id === film._id ? film : f))
        ),
        showAddForm: false,
        selectedFilm: {},
      }))
    );

  saveFilm = (film) => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = (film) =>
    api.films.delete(film).then(() => {
      this.setState(({ films, selectedFilm, showAddForm }) => ({
        films: this.sortFilms(films.filter((f) => f._id !== film._id)),
        selectedFilm: {},
        showAddForm: false,
      }));
    });

  value = {
    toggleFeatured: this.toggleFeatured,
    selectFilmForEdit: this.selectFilmForEdit,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const { films, showAddForm, selectedFilm, loading } = this.state;
    const cls = showAddForm ? "ten" : "sixteen";

    return (
      <FilmContext.Provider value={this.value}>
        <div className="ui container mt-3">
          <TopNavigation showForm={this.showForm} />

          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm
                  film={selectedFilm}
                  saveFilm={this.saveFilm}
                  hideForm={this.hideForm}
                />
              </div>
            )}

            <div className={`${cls} wide column`}>
              {loading ? <FullSpinner /> : <FilmsList films={films} />}
            </div>
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
