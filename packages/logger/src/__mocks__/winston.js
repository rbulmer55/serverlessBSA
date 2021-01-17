export const Logger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

export const createLogger = jest.fn().mockImplementation(() => {
  return Logger;
});

const colorize = jest.fn();
const simple = jest.fn();
const timestamp = jest.fn();
const prettyPrint = jest.fn();
const json = jest.fn();
const combine = jest.fn().mockReturnValue(() => {
  return {
    combine,
    timestamp,
  };
});

export const format = {
  simple,
  timestamp,
  json,
  combine,
  colorize,
  prettyPrint,
};
