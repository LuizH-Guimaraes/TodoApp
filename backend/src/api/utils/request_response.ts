import { Request, Response } from "express";

export function getData(req: Request, res: Response, tableName: string): Record<string, unknown> {
  const data = req.body;
  if (!data)
    res
      .json({ error: true, message: `[CRUD - ${tableName}] Data is mandatory`, result: "Data is mandatory" })
      .status(400);
  return data;
}

export function getParam(req: Request, res: Response, paramName: string, tableName: string): string {
  const param = req.params[paramName];
  if (!param)
    res.json({
      error: true,
      message: `[CRUD - ${tableName}] Error ${paramName} is mandatory`,
      result: "${paramName} is mandatory",
    });
  return param;
}

export function sendDbResult(
  res: Response,
  promise: Promise<Record<string, unknown> | Record<string, unknown>[]>,
  tableName: string
): void {
  promise
    .then((result) => {
      res.json({ error: false, message: "ok", result });
    })
    .catch((err) => {
      res.json({ error: true, message: `[GENERIC CRUD - ${tableName}] Error`, result: err });
    });
}
