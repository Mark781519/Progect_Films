import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "counter/useCounter";

test("useCounter ", () => {
  const { result } = renderHook(useCounter);

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initialCount ", () => {
  let { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  });
  expect(result.current.count).toBe(3);
});

test("allows customization of the step ", () => {
  let { result } = renderHook(useCounter, {
    initialProps: { step: 3 },
  });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
});
