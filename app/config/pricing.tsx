import React from "react";

export interface Pricing {
  name: string;
  maxCustomers: number;
  benefits: [boolean, string][];
  isHighlighted: boolean;
  costMonthlyUsd: number;
  costYearlyUsd: number;
  blurb: string;
}

const MultiSupport = "Support for multiple Agencies";
const RealtimeUpdates = "Supports real-time mapping";
const EmailDigests = "Automated email summaries";

export const pricingConfig: Pricing[] = [
  {
    name: "Essential",
    maxCustomers: 5,
    benefits: [
      [true, "Up to 10 users"],
      [true, RealtimeUpdates],
      [true, "Email support"],
      [false, MultiSupport],
      [false, EmailDigests],
      [false, "Early acces to advanced features"],
    ],
    isHighlighted: false,
    costMonthlyUsd: 500,
    costYearlyUsd: 5700,
    blurb: "Great for getting started and smaller Agencies",
  },
  {
    name: "Premium",
    maxCustomers: 15,
    benefits: [
      [true, "Up to 20 users"],
      [true, RealtimeUpdates],
      [true, "Priority email support"],
      [true, MultiSupport],
      [true, EmailDigests],
      [false, "Early acces to advanced features"],
    ],
    isHighlighted: true,
    costMonthlyUsd: 1100,
    costYearlyUsd: 13000,
    blurb: "Agencies who have a growing group and want email insights",
  },
  {
    name: "Advanced",
    maxCustomers: 30,
    benefits: [
      [true, "Up to 30 users"],
      [true, RealtimeUpdates],
      [true, "Priority email support"],
      [true, MultiSupport],
      [true, EmailDigests],
      [true, "Early acces to advanced features"],
    ],
    isHighlighted: false,
    costMonthlyUsd: 1700,
    costYearlyUsd: 20000,
    blurb: "For agencies that want to make sure that everyone stays involved",
  },
];

export const StripePricingTable = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1PP9L3DKDQ5hPzgX54tOHXI9",
    "publishable-key":
      "pk_test_51PLcJBDKDQ5hPzgXfnBaOich9uqLOXanAlPpaZqbcxEtATdDH3yXbOrAjQF5exof4uudQgijsZujvPle84ipoyEx002m1EeEq5",
  });
};
