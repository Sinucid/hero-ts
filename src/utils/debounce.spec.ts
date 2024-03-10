import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  vi,
  afterEach,
} from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  let fn: Function;
  const callback = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    fn = debounce(callback, 100);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call callback single time", () => {
    fn();
    fn();
    fn();
    vi.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
