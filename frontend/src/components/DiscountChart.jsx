import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";
import { Chart } from "chart.js";

function DiscountChart({ data }) {
  const chartRef = useRef(null);

  // useEffect(() => {}, [data]);

  const prepareData = (data) => {
    const datasets = data.cardNames.map((cardName, index) => {
      const cardDiscounts = data.discountInfos.filter(
        (info, index) => info.cardName === cardName
      );
      const dataForCategories = data.categoryNames.map((category, index) => {
        const discount = cardDiscounts.find(
          (info) => info.merchantCategory === category
        );
        return discount ? discount.price : 0;
      });

      return {
        type: "bar",
        label: cardName,
        data: dataForCategories,
        backgroundColor:
          cardDiscounts.length > 0
            ? cardDiscounts[0].colorBackground
            : "#cccccc",
        stack: "stack1",
      };
    });
    return {
      labels: data.categoryNames,
      datasets: datasets,
    };
  };
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartData = prepareData(data);

    const discountChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
    return () => {
      discountChart.destroy();
    };
  }, [data]);
  return (
    <div>
      <canvas
        ref={chartRef}
        className={css`
          width: 310px;
        `}
      />
    </div>
  );
}

export default DiscountChart;
