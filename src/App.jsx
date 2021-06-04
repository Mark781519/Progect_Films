import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";
const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const initUser = {
  token: null,
  role: "user",
};

class App extends Component {
  state = {
    user: initUser,
    message: "",
  };

  logout = () => this.setState({ user: { token: null } });

  setMessage = (message) => this.setState({ message });

  render() {
    const { user, message } = this.state;

    return (
      <Suspense fallback={<FullSpinner />}>
        <div className="ui container mt-3">
          <TopNavigation logout={this.logout} isAuth={user.token} />

          {message && (
            <div className="ui info message">
              <i
                onClick={() => this.setState({ message: "" })}
                className="close icon"
              />
              {message}
            </div>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
          <Route path="/signup">
            <SignupPage setMessage={this.setMessage} />
          </Route>
          <Route path="/login" component={LoginPage} />
        </div>
      </Suspense>
    );
  }
}

export default App;
