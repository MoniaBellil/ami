import React from "react";
import { Bar } from "react-chartjs-2";

const mocked_data = {
  labels: ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5"],
  spend_per_channel: {
    spends: [
      {
        label: "2013",
        data: [2500, 10000, 15000, 20000, 2500]
      },
      {
        label: "2014",
        data: [5000, 15000, 10000, 25000, 5000]
      },
      {
        label: "2015",
        data: [3500, 12000, 12000, 30000, 3500]
      },
      {
        label: "2016",
        data: [6000, 10000, 15000, 35000, 6000]
      },
      {
        label: "2017",
        data: [7000, 20000, 20000, 20000, 7000]
      }
    ],
    sales: [
        {
            label: "2013",
            data: [2500, 10000, 15000, 20000, 2500]
          },
          {
            label: "2014",
            data: [5000, 15000, 10000, 25000, 5000]
          },
          {
            label: "2015",
            data: [3500, 12000, 12000, 30000, 3500]
          },
          {
            label: "2016",
            data: [6000, 10000, 15000, 35000, 6000]
          },
          {
            label: "2017",
            data: [7000, 20000, 20000, 20000, 7000]
          }
    ]
  }
};

const MyChart = () => {
  const CHART_COLORS = [
    "#00b9f7",
    "#4790ff",
    "#7E73F1",
    "#7e73c8",
    "#7b00ff",
    "#f9cf63",
    "#fde76e",
    "#fced86",
    "#ffffb7",
    "#fefeeb"
  ];
  const salesdata = mocked_data.spend_per_channel.sales.map((sale, index) => {
    return {
      label: sale.label,
      backgroundColor: CHART_COLORS[index],
      data: sale.data,
      hidden: false,
      stack: 2
    };
  });

  const newdataset = [salesdata];
  const spnedperchanneldata = newdataset.flat();

  const [data, setData] = React.useState(spnedperchanneldata);
  const options = {
    legend: {
      position: "bottom",
      labels: {
        generateLabels: function(chart) {
          return Chart.defaults.global.legend.labels.generateLabels
            .apply(this, [chart])
            .filter(function(item, i) {
              return i > 4;
            });
        },
        boxWidth: 10,
        usePointStyle: true
      },
      onClick: (e, legend) => {
        onclick(legend);
      }
    }
  };

  const onclick = React.useCallback(
    legend => {
      let newData = data.map(item => {
        if (item.label === legend.text) item.hidden = !item.hidden;
        return item;
      });

      setData(newData);
    },
    [data, setData]
  );

  return (
    <>
      <Bar
        data={{
          labels: ["Chiffre d'affaires", "Sinistres regles", "Reserves techniques", "Resultat(B/D)", "Capitaux Propres"],
          datasets: data
        }}
        width={100}
        height={50}
        options={options}
      />
    </>
  );
};

export default MyChart;
