import axios from "axios";
import moxios from "moxios";
import { useTrusatGetApi, useTrusatPostApi } from "../app/app-helpers";

describe("App helpers", () => {
  beforeEach(function() {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function() {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it("Can make get requests with the useTrusatGetAPI hook", () => {
    return false;
  });

  it("Can make post requests with the  useTrusatPostAPI", () => {
    return false;
  });
});
