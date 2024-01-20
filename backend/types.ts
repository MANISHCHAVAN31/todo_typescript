import { Request } from "express";

interface registerReqBody {
  username: string;
  email: string;
  password: string;
}

export interface registerRequest extends Request {
  body: registerReqBody;
}

interface loginReqBody {
  email: string;
  password: string;
}

export interface loginRequest extends Request {
  body: loginReqBody;
}

interface updateUsernameBody {
  username: string;
}

export interface updateUsernameRequest extends Request {
  body: updateUsernameBody;
}

interface todoReqBody {
  title: string;
  isDeleted: boolean;
  expiryDate: Date | null;
}

export interface createTodoRequest extends Request {
  body: todoReqBody;

  user: {
    _id: string
  }
}
