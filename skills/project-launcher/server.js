// Simple dashboard server
// Usage: bun run ~/.claude/dashboard/server.js
// Or: node ~/.claude/dashboard/server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const CLAUDE_DIR = process.env.HOME || process.env.USERPROFILE;
const BASE_DIR = path.join(CLAUDE_DIR, '.claude');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');

    let filePath;

    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(BASE_DIR, 'dashboard', 'index.html');
    } else if (req.url === '/projects-registry.json') {
        filePath = path.join(BASE_DIR, 'projects-registry.json');
    } else if (req.url === '/token-usage.json') {
        filePath = path.join(BASE_DIR, 'token-usage.json');
    } else {
        res.writeHead(404);
        res.end('Not found');
        return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Return empty object for missing JSON files
                if (ext === '.json') {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end('{}');
                } else {
                    res.writeHead(404);
                    res.end('Not found');
                }
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🤖 Claude Dashboard running at http://localhost:${PORT}`);
    console.log(`📂 Serving from: ${BASE_DIR}`);
    console.log(`\nPress Ctrl+C to stop`);
});
