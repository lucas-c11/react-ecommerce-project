import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { Product } from "./product";

describe("Product component", ()=>{
    it("displays product details correctly", ()=>{
        render(<Product product={}/>)
    })
})