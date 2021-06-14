import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import UploadImage from "components/UploadImage";
import FormMessage from "components/FormMessage";

const initialData = {
  _id: null,
  title: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  img: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
    redirect: false,
  };

  componentDidMount() {
    if (this.props.film._id) {
      this.setState({ data: this.props.film });
    }
  }

  static getDerivedStateFromProps({ film }, { data, error }) {
    if (film._id && film._id !== data._id) {
      return { data: film, errors: {} };
    }
    if (!film._id && data._id) {
      return { data: initialData, errors: {} };
    }

    return null;
  }

  updatePhoto = (img) => {
    this.setState({
      data: { ...this.state.data, img },
      errors: { ...this.state.errors, img: "" },
    });
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });

  handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({
      data: { ...this.state.data, [e.target.name]: value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });
  };

  handleCheckboxChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });
  };

  validate(data) {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be blank";
    if (!data.description) errors.description = "description cannot be blank";
    if (!data.img) errors.img = "img cannot be blank";
    if (!data.director) errors.director = "director cannot be blank";
    if (!data.duration) errors.duration = "duration cannot be blank";
    if (!data.price) errors.price = "price cannot be blank";

    if (parseInt(data.price) <= 0)
      errors.price = "price cannot be negative value or 0";
    if (parseInt(data.duration) <= 0)
      errors.duration = "price cannot be negative value or 0";
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });

      this.props
        .saveFilm(this.state.data)
        .then(() => this.setState({ redirect: true }))
        .catch((err) =>
          this.setState({
            errors: err.response.data.errors,
            loading: false,
          })
        );
    }
  };

  render() {
    const { data, errors, loading, redirect } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        aria-label="film-form"
        className={`ui form ${loading ? "loading" : ""}`}
      >
        {redirect && <Redirect to="/films" />}

        <div className="ui grid mb-3">
          {/* two column START */}
          <div className="two column row">
            {/* ten column START */}
            <div className="ten wide column">
              {/* title START */}
              <div className={`field ${errors.title ? "error" : ""}`}>
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
                {errors.title && <FormMessage>{errors.title}</FormMessage>}
              </div>
              {/* title END */}
              {/*  img START */}
              <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                  id="img"
                />
                {errors.img && <FormMessage>{errors.img}</FormMessage>}
              </div>
              {/*  img END */}
              {/*  description START */}
              <div
                className={`column row field ${
                  errors.description ? "error" : ""
                }`}
              >
                <label htmlFor="description">Film description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleStringChange}
                  name="description"
                  id="description"
                  placeholder="film description"
                ></textarea>
                {errors.description && (
                  <FormMessage>{errors.description}</FormMessage>
                )}
              </div>
              {/*  description END */}
            </div>
            {/* ten column END */}
            {/*  IMG START */}
            <div className="six wide column">
              <UploadImage img={data.img} updatePhoto={this.updatePhoto} />
            </div>
            {/*  IMG END */}
          </div>
          {/* two column END */}

          {/* three columns START */}

          <div className="three column row">
            {/* director START */}
            <div className={`column field ${errors.director ? "error" : ""}`}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              {errors.director && <FormMessage>{errors.director}</FormMessage>}
            </div>
            {/* director END */}

            {/* duration START */}
            <div className={`column field ${errors.duration ? "error" : ""}`}>
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
            </div>
            {/* duration END */}

            {/* price START */}
            <div className={`column field ${errors.price ? "error" : ""}`}>
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              {errors.price && <FormMessage>{errors.price}</FormMessage>}
            </div>
            {/* price END */}
          </div>
          {/* three columns END */}

          {/* featured START */}
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              checked={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
          {/* featured END */}

          {/* Buttons START */}
          <div className="ui fluid buttons">
            <button className="ui button primary" type="submit">
              Save
            </button>
            <div className="or"></div>
            <Link to="/films" className="ui button">
              Hide form
            </Link>
          </div>
          {/* Buttons END */}
        </div>
        {/* ui grid END*/}
      </form>
    );
  }
}

FilmForm.propTypes = {
  saveFilm: PropTypes.func.isRequired,
};

export default FilmForm;
