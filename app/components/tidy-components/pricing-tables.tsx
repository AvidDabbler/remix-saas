"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";

import { Pricing, pricingConfig } from "~/config/pricing";
import { Button } from "../button";
import clsx from "clsx";

function FeatureItem({ feature }: { feature: Pricing["benefits"][0] }) {
  return (
    <li className="flex gap-2 items-center">
      {feature[0] ? (
        <Check className="text-emerald-500" />
      ) : (
        <X className="text-red-500" />
      )}
      <span>{feature[1]}</span>
    </li>
  );
}

export default function PricingTables() {
  const [isYearly, setIsYearly] = useState(true);
  return (
    <div className="flex flex-col gap-20">
      {/* Pricing toggle */}
      <div className="flex mx-auto">
        <button
          className={clsx(
            "w-[150px] flex transition-colors items-center justify-center rounded-l-full border border-transparent px-4 py-3 text-xl font-medium shadow-sm hover:bg-yellow-400 sm:px-8 ",
            isYearly ? "bg-tcOrange text-white" : "bg-white text-slate-800",
          )}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </button>
        <button
          className={clsx(
            "w-[150px] flex transition-colors items-center justify-center rounded-r-full border border-transparent px-4 py-3 text-xl font-medium shadow-sm hover:bg-yellow-400 sm:px-8 ",
            !isYearly ? "bg-tcOrange text-white" : "bg-white text-slate-800",
          )}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
      </div>
      <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none pt-4">
        {pricingConfig.map((priceInfo, index) => {
          const price = isYearly
            ? priceInfo.costYearlyUsd
            : priceInfo.costMonthlyUsd;
          const isGreaterThanGrand = price >= 1000;

          return (
            <div
              key={index}
              className="relative flex flex-col h-full px-6 py-5 bg-white shadow-lg max-h-[600px]"
              data-aos="fade-up"
            >
              {priceInfo.isHighlighted ? (
                <div className="absolute top-0 right-0 mr-6 -mt-4">
                  <div className="inline-flex text-sm font-semibold py-1 px-3 text-emerald-700 bg-emerald-200 rounded-full">
                    Most Popular
                  </div>
                </div>
              ) : null}
              <div className="mb-4 pb-4 border-b border-slate-200">
                <div className="text-lg font-semibold text-slate-800 mb-1">
                  {priceInfo.name}
                </div>
                <div className="inline-flex items-baseline mb-3">
                  <span className="h3 font-medium text-slate-500">$</span>
                  <span className="h2 leading-7 font-playfair-display text-slate-800">
                    {isGreaterThanGrand ? price / 1000 : price}
                    {isGreaterThanGrand ? (
                      <span className="font-medium mb-3 text-2xl">K</span>
                    ) : null}
                  </span>
                  <span className="font-medium text-slate-400">
                    {!isYearly ? "a month" : "a year"}
                  </span>
                </div>
                <br />
                <div className="text-slate-500">{priceInfo.blurb}</div>
              </div>
              <div className="font-medium mb-3">Features include:</div>

              <ul className="text-slate-500 space-y-3 grow mb-6">
                {priceInfo.benefits.map((feature, i) => (
                  <FeatureItem key={i} feature={feature} />
                ))}
              </ul>
              <div className="p-3 rounded bg-slate-50">
                <a
                  className="btn-sm text-white bg-asparagus hover:bg-blue-700 w-full group"
                  href="/request-demo"
                >
                  Request 90 Day Trial
                  <ArrowRight />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="h2 text-center">None of these work for you?</h2>
        <h3 className="text-xl mx-auto text-center md:w-3/4">
          We would love to hear from you even if none of these work. We are open
          to helping out transit agencies big and small to meet their goals.
        </h3>
        <button className="bg-giantOrange text-white rounded-full drop-shadow py-2 px-6 mx-auto">
          <h2 className="h4 text-center">Ask about advanced pricing</h2>
        </button>
      </div>
    </div>
  );
}
