export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const path = req.query.path || 'unknown';
  const ts = req.query.ts || new Date().toISOString();

  const logLine = `${ts},${path},${ip},"${ua}"\n`;

  const fs = require('fs');
  const filePath = './bot_log.csv';

  fs.appendFile(filePath, logLine, (err) => {
    if (err) {
      console.error('Ошибка записи:', err);
    }
  });

  const gif = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    'base64'
  );

  res.setHeader('Content-Type', 'image/gif');
  res.send(gif);
}
