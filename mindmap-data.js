// This file has been emptied to demonstrate that mindmaps are now loaded dynamically
// from JSON files in the mindmaps/ folder instead of being hardcoded here.

// The mindmap application now uses:
// - mindmaps/technology-trends.json
// - mindmaps/learning-path.json  
// - mindmaps/business-strategy.json
// - mindmaps/personal-development.json

// To add new mindmaps, simply:
// 1. Create a new JSON file in the mindmaps/ folder
// 2. Add the filename to mindmaps/index.json
// 3. The mindmap will automatically appear in the dropdown!

console.log('mindmap-data.js loaded but contains no hardcoded data - using dynamic loading from JSON files');

// Export empty object for compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {};
}
