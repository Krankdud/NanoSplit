import { millisecondsToString } from "./TimeUtils";

it("displays milliseconds when under a minute", () => {
  expect(millisecondsToString(0)).toEqual("0.00");
  expect(millisecondsToString(9)).toEqual("0.01");
  expect(millisecondsToString(50)).toEqual("0.05");
  expect(millisecondsToString(1000)).toEqual("1.00");
  expect(millisecondsToString(1050)).toEqual("1.05");
  expect(millisecondsToString(1500)).toEqual("1.50");
});

it("displays minutes", () => {
  expect(millisecondsToString(60000)).toEqual("1:00");
  expect(millisecondsToString(90000)).toEqual("1:30");
  expect(millisecondsToString(600000)).toEqual("10:00");
});

it("displays hours", () => {
  expect(millisecondsToString(3600000)).toEqual("1:00:00");
  expect(millisecondsToString(3601000)).toEqual("1:00:01");
  expect(millisecondsToString(3610000)).toEqual("1:00:10");
  expect(millisecondsToString(3660000)).toEqual("1:01:00");
  expect(millisecondsToString(3661000)).toEqual("1:01:01");
  expect(millisecondsToString(3670000)).toEqual("1:01:10");
  expect(millisecondsToString(4200000)).toEqual("1:10:00");
  expect(millisecondsToString(4201000)).toEqual("1:10:01");
  expect(millisecondsToString(4210000)).toEqual("1:10:10");
});

it("doesn't display milliseconds", () => {
  expect(millisecondsToString(0, false)).toEqual("0:00");
  expect(millisecondsToString(1000, false)).toEqual("0:01");
  expect(millisecondsToString(10000, false)).toEqual("0:10");
});
