import pino from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";

const stream = pretty({
  colorize: true,
  customPrettifiers: { time: () => `🕰 ${dayjs().format()}` },
});

export const logger = pino(stream);
