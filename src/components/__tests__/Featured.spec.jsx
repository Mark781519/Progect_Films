import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Featured from "components/Featured";
import { AppProviders } from "contexts";

const propsData = { film: { _id: "1", featured: true } };

const mockToggleFeatured = jest.fn();

jest.mock("contexts/FilmContext", () => ({
  ...jest.requireActual("contexts/FilmContext"),
  useToggleFeatured: () => mockToggleFeatured,
}));

const RenderComponent = (props) => {
  return (
    <AppProviders>
      <Featured {...props} />
    </AppProviders>
  );
};

test("should render correclty", () => {
  const { container, rerender } = render(<RenderComponent {...propsData} />);
  const spanEl = container.querySelector("span");
  const iconEl = container.querySelector("i");

  expect(iconEl).toHaveClass("yellow");
  expect(iconEl).not.toHaveClass("empty");

  userEvent.click(spanEl);

  expect(mockToggleFeatured).toHaveBeenCalledTimes(1);
  expect(mockToggleFeatured).toHaveBeenCalledWith("1");

  propsData.film.featured = false;
  rerender(<RenderComponent {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
