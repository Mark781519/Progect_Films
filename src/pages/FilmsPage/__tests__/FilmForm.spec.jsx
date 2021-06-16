import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import { UserContextProvider } from "contexts/UserContext";
import films from "test/films";
import { QueryClient, QueryClientProvider } from "react-query";
import { queryConfig } from "contexts";
import * as funcs from "hooks/films";

function wrapper({ children }) {
  const queryClient = new QueryClient(queryConfig);
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>{children}</UserContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

const mockUserState = { token: "12345", role: "admin" };
jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useUserState: () => mockUserState,
}));

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

test("FilmForm should render correct", async () => {
  mockSaveFilm.mockImplementation(() => Promise.resolve(mockFilm));
  render(<FilmForm />, { wrapper });

  userEvent.type(screen.getByLabelText(/title/i), mockFilm.title);
  userEvent.type(screen.getByLabelText(/image/i), mockFilm.img);
  userEvent.type(screen.getByLabelText(/description/i), mockFilm.description);
  userEvent.type(screen.getByLabelText(/director/i), mockFilm.director);
  userEvent.type(
    screen.getByLabelText(/duration/i),
    mockFilm.duration.toString()
  );
  userEvent.type(screen.getByLabelText(/price/i), mockFilm.price.toString()); // ❗  toString ❗
  userEvent.type(screen.getByLabelText(/featured/i), mockFilm.featured);
  const btnEl = screen.getByText(/save/i);

  await waitFor(() => userEvent.click(btnEl));
  expect(mockSaveFilm).toHaveBeenCalledTimes(1);
});

test("should render FormMessage when error", async () => {
  render(<FilmForm />, { wrapper });

  userEvent.type(screen.getByLabelText(/title/i), null);
  userEvent.type(screen.getByLabelText(/image/i), mockFilm.img);
  userEvent.type(screen.getByLabelText(/description/i), mockFilm.description);
  userEvent.type(screen.getByLabelText(/director/i), mockFilm.director);
  userEvent.type(
    screen.getByLabelText(/duration/i),
    mockFilm.duration.toString()
  );
  userEvent.type(screen.getByLabelText(/price/i), mockFilm.price.toString());
  userEvent.type(screen.getByLabelText(/featured/i), mockFilm.featured);
  const btnEl = screen.getByText(/save/i);

  await waitFor(() => userEvent.click(btnEl));
  const formMsg = screen.getByRole("alert");
  expect(formMsg).toBeInTheDocument();
});
