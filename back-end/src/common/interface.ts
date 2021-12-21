import { ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";

export interface User {
  name: string;
  password: string;
  avatar?: string;
}
