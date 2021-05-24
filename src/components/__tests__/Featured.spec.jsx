import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmContext from "contexts/FilmContext";
import Featured from "components/Featured";

const propsData = { film: { _id: "1", featured: true } };
const toggleFeatured = jest.fn();

const RenderComponent = (props) => {
  return (
    <FilmContext.Provider value={{ toggleFeatured }}>
      <Featured {...props} />
    </FilmContext.Provider>
  );
};

test("should render correclty", () => {
  const { container, rerender } = render(<RenderComponent {...propsData} />);
  const spanEl = container.querySelector("span");
  const iconEl = container.querySelector("i");

  expect(iconEl).toHaveClass("yellow");
  expect(iconEl).not.toHaveClass("empty");

  userEvent.click(spanEl);

  expect(toggleFeatured).toHaveBeenCalledTimes(1);
  expect(toggleFeatured).toHaveBeenCalledWith("1");

  propsData.film.featured = false;
  rerender(<RenderComponent {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
