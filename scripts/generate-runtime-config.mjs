import "dotenv/config";
import { writeFileSync } from "node:fs";

const apiUrl = process.env.API_URL || "http://localhost:5018";
const vesselsMaxAgeMinutes =
    process.env.VESSELS_MAX_AGE_MINUTES || "60";

const config = `window.__OPENSHIPS_CONFIG__ = {
    apiUrl: ${JSON.stringify(apiUrl)},
    vesselsMaxAgeMinutes: ${Number(vesselsMaxAgeMinutes)}
};
`;

writeFileSync("public/runtime-config.js", config);

console.log("Generated runtime-config.js");
console.log("API_URL:", apiUrl);
console.log("VESSELS_MAX_AGE_MINUTES:", vesselsMaxAgeMinutes);