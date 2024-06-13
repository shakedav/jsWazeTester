const { testRoutes } = require('./routeTester');
const schedule = require('node-schedule');

const START_HOUR = 6;
const END_HOUR = 8;
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 4)]; // Run Sunday to Thursday
rule.hour = new schedule.Range(START_HOUR, END_HOUR);
rule.minute = [0, 15, 30, 45]; // Run every 15 minutes

const job = schedule.scheduleJob(rule, testRoutes);