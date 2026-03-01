import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import { PaymentSummary } from "./PaymentSummary";

describe("Payment Summary", () => {
    it("Correct payment information", async () => {
        const loadCart = vi.fn()
        const summary = {
            "totalItems": 10,
            "productCostCents": 11905,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 12404,
            "taxCents": 1240,
            "totalCostCents": 13644
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={summary} loadCart={loadCart} />
            </MemoryRouter>
        );

        const productCost = await screen.findByTestId("payment-product-cost");
        const shippingCost = await screen.findByTestId("payment-shipping-cost");
        const totalBeforeTax = await screen.findByTestId("payment-total-before-tax");
        const tax = await screen.findByTestId("payment-tax");
        const totalCost = await screen.findByTestId("payment-total-cost");

        expect(productCost).toHaveTextContent(formatMoney(summary.productCostCents))
        expect(shippingCost).toHaveTextContent(formatMoney(summary.shippingCostCents))
        expect(totalBeforeTax).toHaveTextContent(formatMoney(summary.totalCostBeforeTaxCents))
        expect(tax).toHaveTextContent(formatMoney(summary.taxCents))
        expect(totalCost).toHaveTextContent(formatMoney(summary.totalCostCents))
    })
})