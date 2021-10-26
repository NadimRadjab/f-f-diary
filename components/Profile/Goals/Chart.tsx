import React from "react";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../../../styles/colors";
import moment from "moment";
type Props = {
  currentWeightData?: {
    weight?: string | undefined | number;
    date?: Date;
  }[];
};
const Chart = (props: Props) => {
  const { currentWeightData } = props;
  const data: any = currentWeightData?.map((value: any) =>
    parseInt(value.weight)
  );
  const label: any = currentWeightData?.map((value: any) => {
    let date = new Date(
      !value.date.seconds ? value.date : value.date.seconds * 1000
    ).toLocaleDateString();
    return date.replace(`${date.slice(2, 5)}`, "");
  });
  let dataOfSix = data?.slice(data?.length <= 7 ? 0 : data?.length - 1 - 6);
  let labelsOfSix = label?.slice(
    label?.length <= 7 ? 0 : label?.length - 1 - 6
  );

  return (
    <LineChart
      data={{
        labels: labelsOfSix,
        datasets: [
          !data
            ? { data: [0] }
            : !data.length
            ? { data: [0] }
            : { data: dataOfSix },
        ],
      }}
      width={400}
      height={220}
      yAxisSuffix="kg"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: colors.primaryBlue,
        backgroundGradientTo: colors.primaryTeal,
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "7",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default Chart;
