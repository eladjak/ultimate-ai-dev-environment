// Enhanced Dashboard Server with WebSocket, Launch, and Save support
// Usage: node ~/.claude/dashboard/server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const WebSocket = require('ws');

const HTTP_PORT = 3456;
const WS_PORT = 3457;
const CLAUDE_DIR = process.env.HOME || process.env.USERPROFILE;
const BASE_DIR = path.join(CLAUDE_DIR, '.claude');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml'
};

// HTTP Server
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle POST requests
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (req.url === '/save-registry') {
                    const registryPath = path.join(BASE_DIR, 'projects-registry.json');
                    const content = JSON.stringify(data, null, 2);
                    fs.writeFileSync(registryPath, content, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));

                    // Broadcast update via WebSocket
                    broadcastUpdate();
                    return;
                }

                if (req.url === '/launch') {
                    const cmd = data.command;
                    // Open new terminal and run command
                    const minttyCmd = `mintty -e /bin/bash -c "${cmd.replace(/"/g, '\\"')}"`;
                    exec(minttyCmd, (error) => {
                        if (error) {
                            console.error('Launch error:', error);
                        }
                    });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }

                if (req.url === '/update-tokens') {
                    const tokenPath = path.join(BASE_DIR, 'token-usage.json');
                    const content = JSON.stringify(data, null, 2);
                    fs.writeFileSync(tokenPath, content, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    broadcastUpdate();
                    return;
                }

            } catch (e) {
                console.error('POST error:', e);
            }
            res.writeHead(400);
            res.end('Bad request');
        });
        return;
    }

    // Handle GET requests
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(BASE_DIR, 'dashboard', 'index.html');
    } else if (req.url === '/projects-registry.json') {
        filePath = path.join(BASE_DIR, 'projects-registry.json');
    } else if (req.url === '/token-usage.json') {
        filePath = path.join(BASE_DIR, 'token-usage.json');
    } else if (req.url === '/manifest.json') {
        filePath = path.join(BASE_DIR, 'dashboard', 'manifest.json');
    } else if (req.url === '/sw.js') {
        filePath = path.join(BASE_DIR, 'dashboard', 'sw.js');
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

// WebSocket Server
let wss;
try {
    wss = new WebSocket.Server({ port: WS_PORT });
    console.log(`🔌 WebSocket server on ws://localhost:${WS_PORT}`);

    wss.on('connection', (ws) => {
        console.log('📱 Client connected');
        // Send initial data
        sendData(ws);
    });
} catch (e) {
    console.log('⚠️  WebSocket not available, using polling only');
}

function sendData(ws) {
    try {
        const registryPath = path.join(BASE_DIR, 'projects-registry.json');
        const tokenPath = path.join(BASE_DIR, 'token-usage.json');

        const projects = JSON.parse(fs.readFileSync(registryPath, 'utf8')).projects || [];
        const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8')) || {};

        ws.send(JSON.stringify({
            type: 'update',
            projects,
            tokens
        }));
    } catch (e) {
        console.error('Send error:', e);
    }
}

function broadcastUpdate() {
    if (wss) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                sendData(client);
            }
        });
    }
}

// Watch for file changes
const registryPath = path.join(BASE_DIR, 'projects-registry.json');
const tokenPath = path.join(BASE_DIR, 'token-usage.json');

fs.watch(registryPath, { persistent: false }, () => {
    console.log('📁 Registry changed');
    broadcastUpdate();
});

fs.watch(tokenPath, { persistent: false }, () => {
    console.log('💰 Tokens changed');
    broadcastUpdate();
});

server.listen(HTTP_PORT, () => {
    console.log(`
╔══════════════════════════════════════════╗
║     🤖 Claude Dashboard Server           ║
╠══════════════════════════════════════════╣
║  📍 http://localhost:${HTTP_PORT}               ║
║  📂 ${BASE_DIR}  ║
║                                          ║
║  Features:                               ║
║  ✓ Real-time sync (WebSocket)           ║
║  ✓ Drag & Drop save                     ║
║  ✓ Direct project launch                ║
║  ✓ Token tracking                       ║
╚══════════════════════════════════════════╝

Press Ctrl+C to stop
`);
});
