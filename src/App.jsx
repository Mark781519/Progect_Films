import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FilmContext from "contexts/FilmContext";
import TopNavigation from "components/TopNavigation";
import api from "api";

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
  };

  componentDidMount() {
    api.films
      .fetchAll()
      .then((films) => this.setState({ films: this.sortFilms(films) }));
  }

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = (id) =>
    this.setState(({ films }) => ({
      films: this.sortFilms(
        films.map((f) => (f._id === id ? { ...f, featured: !f.featured } : f))
      ),
    }));

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
    this.setState(({ films, selectedFilm, showAddForm }) => ({
      films: this.sortFilms(films.filter((f) => f._id !== film._id)),
      selectedFilm: {},
      showAddForm: false,
    }));

  value = {
    toggleFeatured: this.toggleFeatured,
    selectFilmForEdit: this.selectFilmForEdit,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const { films, showAddForm, selectedFilm } = this.state;
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
              <FilmsList films={films} />
            </div>
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
