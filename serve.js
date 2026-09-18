const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const OUT_DIR = path.join(__dirname, "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split("?")[0]);
  let filePath = path.join(OUT_DIR, reqPath);

  // If path ends with / or is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  } else if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + ".html")) {
      filePath = filePath + ".html";
    } else {
      // 404 / SPA fallback
      const notFoundPath = path.join(OUT_DIR, "404.html");
      filePath = fs.existsSync(notFoundPath) ? notFoundPath : path.join(OUT_DIR, "index.html");
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400",
      });
      res.end(content);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[JBAIkid Web Server] Running at http://localhost:${PORT}`);
});
