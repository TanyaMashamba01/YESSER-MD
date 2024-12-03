// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dOd0U5N0NhWkM1OHovOGdZQ2RjRlhFN3dtV0pLNmVkTjRFSHBkemwzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSS9leVlrdTNmTHVWZng4clFMUGE3TkJZMkI1aU16M2dHUE1vSjczaFczWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRDFEanZpSkptS3UrMDRqdW4wbjVHY2VxYStPQVBNZWFuWUx0TzJ2L0hrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJteWlnNEFlcEo0MDVST3QxQTJQY1RBaExKaXRDNkpCRGN1eFczSFpYNTI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdJa0p3UXA4dWhTVWtQRE9Fb0Jhb0IwUlRseGs5SlZ6WFpmais2U2Jtbm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPMlBJVjFVLzNqRHFBdXRtcWRuQWwwT3pqSHdoNGlLWmxvVnJsd0tWa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUwwdS9MUFR2RlZycnJwVTk4bVZudGYzZmlUcEd5VndiVGdnOFFTSHhGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVBObWV2SVhVQ1lsT1E4NWttdXcrb3dXWUcrejQ3TTNyZnlsYTBFbVpTST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhyMUNlQlhGV0NScjlvcUN2MUlSZ2ZUcXNqQW1Cbk5Va0x0TEwxREFlQUhHNVJ5RHFMV1lQd2ZsREhzcWNxaE01TXQrUjhnMVZHQUFCWlQrbkgraGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE0LCJhZHZTZWNyZXRLZXkiOiJkRHNmdDVDWTU5YTFPZTVNV0VjRkhFTWY1TFZJUXJtNURONmw2OXJRczlFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXb19IM2dmcFE4dVVPMUhLVk5tWkhRIiwicGhvbmVJZCI6ImI2ODg4MDBjLWE3MmUtNGUwZS1iZDFlLWZiZWQwYmJhOWNmYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwdWJrak9GVG9ScEU4eXdCdTZvV2tIZ2ZnTm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFVwOTR3ZkpjY1JDaWVMMmsxYWIxaE9QQkdVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhTRkFROThSIiwibWUiOnsiaWQiOiIyNjM3Nzc3NTYxODQ6NDlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNYUt1ZTRHRUlXZHZib0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzUEg4MTh0d2huSjlxNThTTlZNTE9vYUVyL2JPQS9PUmFtcUljVWltaWdrPSIsImFjY291bnRTaWduYXR1cmUiOiIvWUErTjRrSVRteXBIUit2NUtDMk9veG44UkFRbjBWVkF0TTR0L1VBdWR3ZHphc2J4cEg2dkg2dVg4ZnBSZytITGhNaW5CVkd6Rk5MNmdHZ2JCVWtDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNDJITm95MjVnUEF4WUJ4dkpxaGN5c1JyUlZ5d0haMnRQcnp6MGpaSUY0ejhuWVVqdE5VN3psUDg1S3oyRVVRYWhrK1lVY05YMFVVV0FaeXh6UGdvamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6NDlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkR4L05mTGNJWnlmYXVmRWpWVEN6cUdoSy8yemdQemtXcHFpSEZJcG9vSiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzI1MDcwNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCcTEifQ==",
  PREFIX: process.env.PREFIX || '+',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'false' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'falde' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'false' : false,
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
