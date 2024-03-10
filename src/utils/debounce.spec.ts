import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  const callback = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    const fn = debounce(callback, 100);

    fn();
    fn();
    fn();
    vi.runAllTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call callback single time", () => {
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
