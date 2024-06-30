import { NextFunction, Response, Request } from "express";

function CheckSession() {
  return function (req: Request, res: Response, next: NextFunction) {

    // console.log(req.session.userId);
    next()
  };
}




export {CheckSession}
