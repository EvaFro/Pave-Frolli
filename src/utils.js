import * as Papa from "papaparse";
import hookfishData from "./restaurantDataFrontend/hookfish.csv";
import gamineData from "./restaurantDataFrontend/gamine.csv";

const companyData = {
  hookfish: hookfishData,
  gamine: gamineData
};

const fetchEmployeeData = (company) => {
  const rawData = companyData[company];
  if (!companyData) return null;

  let rawDataParsed = "";
  Papa.parse(rawData, {
    complete: function (results) {
      rawDataParsed = atob(results.data[0][1]);
    }
  });

  Papa.parse(rawDataParsed, {
    header: true,
    complete: function (results) {
      rawDataParsed = results.data;
    }
  });

  return rawDataParsed;
};

export const fetchAllEmployeeData = () => {
  const hookfish = fetchEmployeeData("hookfish");
  const gamine = fetchEmployeeData("gamine");
  const hookfishLabled = hookfish.map((employee) => {
    employee.company = "Hookfish";
    return employee;
  });

  const gamineLabled = gamine.map((employee) => {
    employee.company = "Gamine";
    return employee;
  });

  return [...hookfishLabled, ...gamineLabled];
};

export const calcCompBands = () => {
  const allData = fetchAllEmployeeData();

  const levelComp = {};

  allData.forEach((employee) => {
    const sal = parseFloat(employee.salary);

    if (!levelComp[employee.level]) {
      const data = {
        maxSal: sal,
        minSal: sal,
        level: `Level ${employee.level}`
      };
      levelComp[employee.level] = data;
    } else {
      if (levelComp[employee.level].maxSal < sal) {
        levelComp[employee.level].maxSal = sal;
      } else if (levelComp[employee.level].minSal > sal) {
        levelComp[employee.level].minSal = sal;
      }
    }
  });

  const barData = Object.keys(levelComp).map((band) => {
    const min = levelComp[band].minSal;
    const max = levelComp[band].maxSal;
    return { level: levelComp[band].level, range: [min, max] };
  });

  return barData;
};
