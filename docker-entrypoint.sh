#!/bin/sh

cat > /app/public/runtime-config.js <<EOF
window.__OPENSHIPS_CONFIG__ = {
    apiUrl: "${API_URL:-http://localhost:5018}",
    vesselsMaxAgeMinutes: ${VESSELS_MAX_AGE_MINUTES:-60}
};
EOF

exec node server.js