import axios from "axios";
import moment from "moment";

const formatMarketData = (data) => {
  const formattedData = data.map((item) => {
    const sevenDaysAgo = moment().subtract(7, "days").unix();
    const formattedSparkline = item.sparkline_in_7d.price.map(
      (price, index) => ({
        x: sevenDaysAgo + (index + 1) * 3600,
        y: price,
      })
    );

    return {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };
  });

  return formattedData;
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
