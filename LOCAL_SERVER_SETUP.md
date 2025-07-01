# Local Development Server

If you're seeing "No mindmaps found" errors, it's likely due to browser security restrictions when loading files locally. Here are solutions:

## Quick Solutions:

### Option 1: Use Python (Recommended)
If you have Python installed:

```bash
# Navigate to the project folder
cd path/to/SC300mm

# Python 3
python -m http.server 8000

# Python 2 (if you have it)
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

### Option 2: Use Node.js
If you have Node.js installed:

```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project folder
cd path/to/SC300mm

# Start server
http-server

# Or specify port
http-server -p 8000
```

### Option 3: Use VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Browser Flags (Chrome)
For testing only, you can disable security:

```bash
# Windows
chrome.exe --user-data-dir=/tmp/chrome_test --disable-web-security --disable-features=VizDisplayCompositor

# Mac
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_test" --disable-web-security

# Linux
google-chrome --user-data-dir="/tmp/chrome_test" --disable-web-security
```

## Why This Happens

Modern browsers block loading local files (file://) for security reasons. This is called CORS (Cross-Origin Resource Sharing) policy. The mindmap loader needs to fetch JSON files, which requires a web server.

## Recommended Workflow

1. Use Python's built-in server (most reliable)
2. Access via http://localhost:8000
3. All JSON files will load correctly
4. Full functionality available

This is normal for web development - always use a local server for testing!
