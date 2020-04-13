const currentlyInfected = (data) => {
  const Inputdata = data;
  const { reportedCases } = Inputdata;
  const impactCurrentlyInfected = reportedCases * 10;
  const severeCurrentlyInfected = reportedCases * 50;

  return {
    impact: {
      currentlyInfected: impactCurrentlyInfected,
    },
    severe: {
      currentlyInfected: severeCurrentlyInfected,
    },
  };
};
const findInfectionsByRequestedTime = (object, data) => {
  let numberOfDays;
  const { periodType, timeToElapse, totalHospitalBeds } = data;
  switch (periodType) {
    case "days":
      numberOfDays = timeToElapse;
      break;
    case "months":
      numberOfDays = Number(timeToElapse) * 30;
      break;
    case "weeks":
      numberOfDays = Number(timeToElapse) * 7;
      break;
    default:
      throw new Error("period type undefined");
  }
  const factor = Math.floor(numberOfDays / 3);
  const iBRT = object.currentlyInfected * 2 ** factor;
  // infectionsByRequested is solved here
  object.infectionsByRequestedTime = Math.trunc(iBRT);
  // severeCasesByRequested Time is solved here
  object.severeCasesByRequestedTime = Math.trunc(iBRT * 0.15);
  const hBBRT = 0.35 * totalHospitalBeds - object.severeCasesByRequestedTime;
  // hospitalBedsByRequestedTime is solved here
  object.hospitalBedsByRequestedTime = Math.trunc(hBBRT);
  const cFICUBRT = 0.05 * iBRT;
  // cases For ICU BY RequestedTime is solved here;
  object.casesForICUByRequestedTime = Math.trunc(cFICUBRT);
  const cFVBRT = iBRT * 0.02;
  object.casesForVentilatorsByRequestedTime = Math.trunc(cFVBRT);
  // challenge 3
  const { region } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const dIF = avgDailyIncomeInUSD * avgDailyIncomePopulation * iBRT;
  object.dollarsInFlight = Math.trunc(dIF / numberOfDays);
};
const completeEstimator = (data) => {
  const { impact, severe } = currentlyInfected(data);
  findInfectionsByRequestedTime(impact, data);
  findInfectionsByRequestedTime(severe, data);
  return {
    data,
    impact,
    severeImpact: severe,
  };
};
const covid19ImpactEstimator = (data) => completeEstimator(data);

module.exports = covid19ImpactEstimator;
