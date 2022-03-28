import "./polyfills.mjs";
import express from "express";
import { Temporal } from "@js-temporal/polyfill";

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
    const date = parseDate(req.query.date);
    console.log("Date", date)
    const date2 = parseDate2(req.query.date);
    const cost = calculateCost(age, type, date, baseCost);
    res.json({ cost });
  });

  function parseDate(dateString) {
    if (dateString) {
      return new Date(dateString);
    }
  }

  const parseDate2 = (dateString) => dateString && Temporal.PlainDate.from(dateString)

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
    console.log(date)
const d = date && date.constructor.name === 'TemporalDate' ? date : convert(date)
    if (date && isMonday(d) && date && !isHoliday(d))  {
      reduction = 35;
}
    return reduction;
  }

  function isMonday(date) {
    return date.dayOfWeek === 1;
  }

  const convert = (date) => date && date.toTemporalInstant().toZonedDateTimeISO("UTC").toPlainDate()

  function isHoliday(date) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      const holidayPlain = Temporal.PlainDate.from(row.holiday)
      if (
        date &&
        date.year === holidayPlain.year &&
        date.month === holidayPlain.month &&
        date.day === holidayPlain.day 
      ) {
        return true;
      }
    }
    return false;
  }

  return app;
}

export { createApp };
