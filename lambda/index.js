const https = require('https');

exports.handler = async (event) => {
    const city = event.queryStringParameters?.city || "Hyderabad";
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json"
                    },
                    body: data
                });
            });
        }).on('error', (err) => {
            resolve({
                statusCode: 500,
                body: JSON.stringify({ error: err.message })
            });
        });
    });
};
