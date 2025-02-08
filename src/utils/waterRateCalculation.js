export const calculateWaterRate = ({ gender, weight, sportTimes }) => {
  let calculatedNumber = 0;

  if (gender === 'For woman') {
    calculatedNumber = weight * 0.03 + sportTimes * 0.4;
  } else {
    calculatedNumber = weight * 0.04 + sportTimes * 0.6;
  }
  ``;
  return Number(calculatedNumber.toFixed(2));
};
