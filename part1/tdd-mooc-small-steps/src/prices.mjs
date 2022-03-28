import "./polyfills.mjs";
import express from "express";

// Refactor the following code to get rid of the legacy Date class.
// Use Temporal.PlainDate instead. See /test/date_conversion.spec.mjs for examples.

function createApp(database) {
  const app = express();

  app.put("/prices", (req, res) => {
    const liftPassCost = req.query.cost;
    const liftPassType = req.query.type;
    database.setBasePrice(liftPassType, liftPassCost);
    res.json();
  });

  app.get("/prices", (req, res) => {
    const age = req.query.age;
    const type = req.query.type;
    const baseCost = database.findBasePriceByType(type).cost;
    const date3 = parseDate(req.query.date);
    const date = parsePlainDate(req.query.date);
    const cost = calculateCost(age, type, date3, baseCost);
    res.json({ cost });
  });

  const parsePlainDate = (dateString) => {
    return dateString && Temporal.PlainDate.from(dateString)
  }

  function parseDate(dateString) {
    if (dateString) {
      return new Date(dateString);
    }
  }

  function calculateCost(age, type, date, baseCost) {
    if (type === "night") {
      return calculateCostForNightTicket(age, baseCost);
    } else {
      return calculateCostForDayTicket(age, date, baseCost);
    }
  }

  function calculateCostForNightTicket(age, baseCost) {
    if (age === undefined) {
      return 0;
    }
    if (age < 6) {
      return 0;
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.4);
    }
    return baseCost;
  }

  function calculateCostForDayTicket(age, date, baseCost) {
    let reduction = calculateReduction(date);
    if (age === undefined) {
      return Math.ceil(baseCost * (1 - reduction / 100));
    }
    if (age < 6) {
      return 0;
    }
    if (age < 15) {
      return Math.ceil(baseCost * 0.7);
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.75 * (1 - reduction / 100));
    }
    return Math.ceil(baseCost * (1 - reduction / 100));
  }

  function calculateReduction(date) {
    let reduction = 0;
    if (date && isMonday(convert(date)) && !isHoliday(date)) {
      reduction = 35;
    }
    return reduction;
  }

  function isMonday(date) {
    return date.dayOfWeek === 1;
  }
  
  const convert = (date) => date.toTemporalInstant().toZonedDateTimeISO("UTC").toPlainDate()

  function isHoliday(date) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      let holiday = new Date(row.holiday);
      const holidayPlainDate = Temporal.PlainDate.from(row.holiday)
      const datePlain = convert(date)
      if (
        datePlain &&
        datePlain.year === holidayPlainDate.year &&
        datePlain.month === holidayPlainDate.month &&
        datePlain.day === holidayPlainDate.day
      ) {
        return true;
      }
    }
    return false;
  }

  return app;
}

export { createApp };
