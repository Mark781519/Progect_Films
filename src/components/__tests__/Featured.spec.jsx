import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Featured from "components/Featured";
import { AppProviders } from "contexts";
import * as funcs from "hooks/films";

const propsData = { film: { _id: "1", featured: true } };

const wrapper = ({ children }) => <AppProviders>{children}</AppProviders>;

test("should render correclty", async () => {
  const mockToggleFeatured = jest.fn();
  jest.spyOn(funcs, "useToggleFeatured");
  funcs.useToggleFeatured.mockImplementation(() => ({
    mutate: mockToggleFeatured,
  }));

  const { rerender, container } = render(<Featured {...propsData} />, {
    wrapper,
  });
  const spanEl = container.querySelector("span");
  const iconEl = container.querySelector("i");

  expect(iconEl).toHaveClass("yellow");
  expect(iconEl).not.toHaveClass("empty");

  await waitFor(() => userEvent.click(spanEl));

  expect(mockToggleFeatured).toHaveBeenCalledTimes(1);
  expect(mockToggleFeatured).toHaveBeenCalledWith({
    _id: "1",
    featured: false,
  });

  propsData.film.featured = false;
  rerender(<Featured {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
