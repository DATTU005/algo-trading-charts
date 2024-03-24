import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
// import { SessionHighlighting } from "../plugins/session-highlighting/session-highlighting";

const TradingChart = ({ data }) => {
  const chartContainerRef = useRef();

  // const sessionHighlightingPlugin = new SessionHighlighting();
  // const myCustomSeries = chart.addCustomSeries(sessionHighlightingPlugin, {
  //   lowValue: 0,
  //   highValue: 1000,
  // });
  // console.log(myCustomSeries);
  useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions = {
        layout: {
          background: { type: "solid", color: "transparent" },
        },
        leftPriceScale: {
          visible: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        rightPriceScale: {
          visible: false,
        },
        width: 700,
        height: 300,
      };

      const chart = createChart(chartContainerRef.current, chartOptions);

      const newSeries = chart.addAreaSeries({
        lineColor: "#ff0400",
        topColor: "#f36361",
        bottomColor: "rgba(255, 41, 41, 0.052)",
      });

      const chartData = data.map((item) => ({
        time: item.date,
        value: item.cumsum,
      }));

      newSeries.setData(chartData);

      const watermark = document.createElement("div");
      watermark.style.position = "absolute";
      watermark.style.zIndex = "1";
      watermark.style.top = "80%";
      watermark.style.left = "100%";
      watermark.style.transform = "translate(-50%, -50%)";
      watermark.style.width = "200px";
      watermark.style.height = "100px";
      watermark.style.backgroundImage = `url("/logo_white.png")`;
      watermark.style.backgroundRepeat = "no-repeat";
      watermark.style.backgroundSize = "contain";
      watermark.style.opacity = "0.2";
      chartContainerRef.current.style.position = "relative";
      chartContainerRef.current.appendChild(watermark);

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};

export default TradingChart;
