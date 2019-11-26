import * as React from "react";
import { shallow } from "enzyme";

import App from "../app"

describe("Render DateInput", () => {
  it("renders my app component", () => {
    const result = shallow(<App/>);
    expect(result).toMatchObject({});
  });
});