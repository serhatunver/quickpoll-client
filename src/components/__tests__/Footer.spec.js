import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FooterComp from "../FooterComp.vue";

describe("FooterComp.vue", () => {
  it("should render correct contents", () => {
    const wrapper = mount(FooterComp);
    expect(wrapper.text()).to.equal("Footer");
  });
});
