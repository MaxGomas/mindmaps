class MindmapLoader {
    constructor() {
        this.mindmaps = new Map();
        this.mindmapFiles = [];
    }

    async loadMindmaps() {
        try {
            console.log('Starting to load mindmaps...');
            
            // Get list of JSON files in the mindmaps folder
            const mindmapFiles = await this.getMindmapFiles();
            console.log('Found mindmap files:', mindmapFiles);
            
            if (mindmapFiles.length === 0) {
                console.warn('No mindmap files found!');
                return [];
            }
            
            this.mindmapFiles = mindmapFiles;

            // Load each mindmap file
            const loadPromises = mindmapFiles.map(async (file) => {
                try {
                    console.log(`Loading mindmap: ${file}`);
                    
                    // Add cache-busting parameter to ensure fresh data
                    const cacheBuster = new Date().getTime();
                    const response = await fetch(`./mindmaps/${file}?v=${cacheBuster}`, {
                        cache: 'no-cache',
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        }
                    });
                    
                    // Handle both 200 (OK) and 304 (Not Modified) responses
                    if (!response.ok && response.status !== 304) {
                        throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
                    }
                    
                    const mindmapData = await response.json();
                    console.log(`✓ Successfully loaded: ${file}`, mindmapData.title || mindmapData.name);
                    
                    // Use filename (without extension) as key
                    const key = file.replace('.json', '');
                    this.mindmaps.set(key, mindmapData);
                    
                    return { key, title: mindmapData.title || mindmapData.name, file };
                } catch (error) {
                    console.error(`✗ Error loading mindmap ${file}:`, error);
                    return null;
                }
            });

            const results = await Promise.all(loadPromises);
            const validResults = results.filter(result => result !== null);
            console.log('Successfully loaded mindmaps:', validResults);
            
            return validResults;
        } catch (error) {
            console.error('Error in loadMindmaps:', error);
            return [];
        }
    }

    async getMindmapFiles() {
        // Since we can't directly list directory contents in a browser,
        // we'll try to load a predefined list of files or use a discovery method
        const knownFiles = [
            'technology-trends.json',
            'learning-path.json',
            'business-strategy.json',
            'personal-development.json'
        ];

        // First, try to load an index file that lists all available mindmaps
        try {
            const cacheBuster = new Date().getTime();
            const response = await fetch(`./mindmaps/index.json?v=${cacheBuster}`, {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            // Accept both 200 and 304 status codes
            if (response.ok || response.status === 304) {
                const indexData = await response.json();
                console.log('Loaded index.json successfully:', indexData);
                return indexData.files || knownFiles;
            }
        } catch (error) {
            console.log('No index.json found or error loading it:', error.message);
        }

        // Fallback: Try each known file to see which ones exist
        console.log('Falling back to checking known files...');
        const availableFiles = [];
        
        for (const file of knownFiles) {
            try {
                console.log(`Checking for file: ${file}`);
                const cacheBuster = new Date().getTime();
                const response = await fetch(`./mindmaps/${file}?v=${cacheBuster}`, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                
                // Accept both 200 (OK) and 304 (Not Modified) as successful
                if (response.ok || response.status === 304) {
                    console.log(`✓ Found: ${file} (Status: ${response.status})`);
                    availableFiles.push(file);
                } else {
                    console.log(`✗ Not found: ${file} (${response.status})`);
                }
            } catch (error) {
                console.log(`✗ Error checking ${file}:`, error.message);
            }
        }

        console.log('Available files:', availableFiles);
        return availableFiles;
    }

    getMindmap(key) {
        return this.mindmaps.get(key);
    }

    getAllMindmaps() {
        return Array.from(this.mindmaps.entries()).map(([key, data]) => ({
            key,
            title: data.title || data.name,
            data
        }));
    }

    // Helper method to create a properly formatted filename from a title
    static createFilename(title) {
        return title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .trim() + '.json';
    }

    // Helper method to validate mindmap JSON structure
    static validateMindmapStructure(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Check for required fields
        if (!data.name && !data.title) {
            return false;
        }

        // Recursively validate children structure
        const validateNode = (node) => {
            if (!node.name) return false;
            
            if (node.children) {
                if (!Array.isArray(node.children)) return false;
                return node.children.every(validateNode);
            }
            
            return true;
        };

        return validateNode(data);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindmapLoader;
}
