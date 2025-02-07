import { useEffect, useState } from 'react';
import { calculateWaterRate } from './waterRateCalculation';

const useCalculateWaterRate = values => {
  const [calculatedNumber, setCalculatedNumber] = useState(0);

  useEffect(() => {
    const { gender, weight, sportTimes } = values;
    if (gender && weight !== '' && sportTimes !== '') {
      const result = calculateWaterRate(values);
      setCalculatedNumber(result);
    } else {
      setCalculatedNumber(0); // Reset if any value is missing
    }
  }, [values]);

  return calculatedNumber;
};

export default useCalculateWaterRate;
