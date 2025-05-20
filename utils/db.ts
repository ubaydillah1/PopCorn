/* eslint-disable no-var */
import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

// Tambahkan deklarasi global untuk menghindari error TS
declare global {
  var dbPool: Pool | undefined;
}

const pool =
  globalThis.dbPool ??
  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_bioskop_smbd",
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") globalThis.dbPool = pool;

export default pool;
