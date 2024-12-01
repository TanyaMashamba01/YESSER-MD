// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUtrR3BybUo0a2tyWHB2VDNKT3NOcmNnQThxTTg2T3p1ekoxMDAyakZrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGZFSC95Zkl0U04zMjRBUHpDVEdnWmk1WS8zUGR4eUlKN3Y3aDV4Yngwcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSzdIazV5ZTk1KzZ0NnQ5c1NhV01YVkw3UFlpT1hibWttY0o5dmFOTWtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3SFJlTUpqUldxL0NEQ3Z4STdVZmQ1dVdTWDdvYlRPTW85dk5Dc1hvZDNFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZJN0VWUExobzFwbktRTmdmZ3k0NWhKbmhCTTJ1WFViYm9xallJSGZNMms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9xcEluL0dJanVXakJoZ21VQmk4UmxyYStvTjZhWUFkZWx4NjU4WE1wbUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUQyUEFXRnl1U2xuUE85ZWxuN096L1BpSElPa0N4dm5tTEd4YmF6T3gwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGdWRXJJNG9VZ2hxR2JBZm9MT2xTRE1QUytMVWsyNWFVTU9QTTZHNnZUQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imk2NFZyR2lDUU5helZ2TS9LRTlZK2hXYU9wWVl1SktDMklTV3Y4WmV5OHdZRnJ4bnJteDBqU1hQSjRMOVh4WEFWNVZ1WTUrdWgvTGtnS1hYTWMrWmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJYOGZJK0EvY1dIREtTMkluTXEyTkhDem5FdVFTbU12Zmt4MmJIYUdMOWFvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsZEJYQVJLNlJEdURTQmlHR29GN3RnIiwicGhvbmVJZCI6IjlkYjI1ZTE1LWRjNjYtNGE5YS1iZWM3LTk4NjYzYzNlYWM3YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWNS8yK1kvQ2xLeHIxd3hyalRGdlRXcnJmRVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERUeUtzQTY0dXhPYk44NEN0TCtndHZoQjVFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRWNDI4QzhMIiwibWUiOnsiaWQiOiIyNjM3Nzc3NTYxODQ6NDhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNV0t1ZTRHRU5EWHNyb0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzUEg4MTh0d2huSjlxNThTTlZNTE9vYUVyL2JPQS9PUmFtcUljVWltaWdrPSIsImFjY291bnRTaWduYXR1cmUiOiJsc1FBUElFbVY4eVVtR21tN1lBREh0R0dKRzBXMUx5OTF2ZzRJOTdDQzJ2S2U2OVl0SVpuUEd1K2dvWmNHVVo2Q3BhNDFKam9SR0F1QnB3MUM2UWFBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibExxc09PZ1N1RjUvTnJJdGhEVjlPSU5qdnpRNVIwT1hxeTl4c1VIMGtKVmRhOXZIdnVzTmZpdi9sdDBVMGg1TC90SGRFK1h4OWJkVEJpSWJiczBWamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6NDhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkR4L05mTGNJWnlmYXVmRWpWVEN6cUdoSy8yemdQemtXcHFpSEZJcG9vSiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzA3Nzk4MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCcXoifQ==",
  PREFIX: process.env.PREFIX || '+',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©Joshking01",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "263777756184",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME != undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
