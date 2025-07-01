class InteractiveMindmap {
    constructor() {
        this.svg = null;
        this.width = 0;
        this.height = 0;
        this.root = null;
        this.tree = null;
        this.currentData = null;
        this.zoom = null;
        this.tooltip = null;
        this.nodeIdCounter = 0;
        this.selectedNode = null; // Track the currently selected node
        this.loader = new MindmapLoader(); // Initialize the loader
        this.availableMindmaps = []; // Store available mindmaps
        
        this.init();
    }

    async init() {
        console.log('Initializing mindmap...');
        this.setupSVG();
        this.setupZoom();
        this.setupTooltip();
        this.setupEventListeners();
        
        // Load available mindmaps
        await this.loadAvailableMindmaps();
        
        console.log('Initialization complete');
    }

    setupSVG() {
        console.log('Setting up SVG...');
        const container = d3.select("#mindmap-container");
        const containerRect = container.node().getBoundingClientRect();
        
        this.width = containerRect.width;
        this.height = containerRect.height;
        
        console.log(`SVG dimensions: ${this.width} x ${this.height}`);

        this.svg = d3.select("#mindmap")
            .attr("width", this.width)
            .attr("height", this.height);

        // Create main group for zooming and panning
        this.mainGroup = this.svg.append("g")
            .attr("class", "main-group");

        // Create groups for links and nodes
        this.linkGroup = this.mainGroup.append("g").attr("class", "links");
        this.nodeGroup = this.mainGroup.append("g").attr("class", "nodes");
        
        // Add click handler to clear selection when clicking empty space
        this.svg.on("click", (event) => {
            // Only clear selection if clicking directly on SVG (not on nodes)
            if (event.target === this.svg.node() || event.target === this.mainGroup.node()) {
                this.clearSelection();
                this.updateNodeInfo(null);
            }
        });
        
        console.log('SVG setup complete');
    }

    setupZoom() {
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                this.mainGroup.attr("transform", event.transform);
            });

        this.svg.call(this.zoom);
    }

    setupTooltip() {
        this.tooltip = d3.select("#tooltip");
    }

    async loadAvailableMindmaps() {
        try {
            console.log('Loading available mindmaps...');
            this.availableMindmaps = await this.loader.loadMindmaps();
            this.populateMindmapDropdown();
            
            // Load the first mindmap if available
            if (this.availableMindmaps.length > 0) {
                await this.loadMindmap(this.availableMindmaps[0].key);
            } else {
                console.warn('No mindmaps found, falling back to hardcoded data');
                this.loadFallbackData();
            }
        } catch (error) {
            console.error('Error loading mindmaps:', error);
            this.loadFallbackData();
        }
    }

    populateMindmapDropdown() {
        const select = d3.select("#mindmapSelect");
        
        // Clear existing options
        select.selectAll("option").remove();
        
        // Add options for each mindmap
        select.selectAll("option")
            .data(this.availableMindmaps)
            .enter()
            .append("option")
            .attr("value", d => d.key)
            .text(d => d.title);
            
        // Add change event listener
        select.on("change", (event) => {
            const selectedKey = event.target.value;
            if (selectedKey) {
                this.loadMindmap(selectedKey);
            }
        });
    }

    async loadMindmap(key) {
        try {
            console.log(`Loading mindmap: ${key}`);
            const mindmapData = this.loader.getMindmap(key);
            
            if (mindmapData) {
                console.log('Loading mindmap data:', mindmapData);
                this.currentData = this.processData(mindmapData);
                this.renderMindmap();
                
                // Update dropdown selection
                d3.select("#mindmapSelect").node().value = key;
                
                // Clear selection when loading new mindmap
                this.clearSelection();
                this.updateNodeInfo(null);
            } else {
                console.error(`Mindmap not found: ${key}`);
            }
        } catch (error) {
            console.error('Error loading mindmap:', error);
        }
    }

    loadFallbackData() {
        // Fallback to hardcoded data if loading fails
        if (typeof mindmapData !== 'undefined' && mindmapData.technology) {
            console.log('Using fallback hardcoded data');
            const sampleData = mindmapData.technology;
            this.currentData = this.processData(sampleData);
            this.renderMindmap();
            this.updateNodeInfo(null);
        } else {
            console.error('No fallback data available');
        }
    }

    setupEventListeners() {
        // Control buttons
        d3.select("#resetView").on("click", () => this.resetView());
        d3.select("#expandAll").on("click", () => this.expandAll());
        d3.select("#collapseAll").on("click", () => this.collapseAll());
        d3.select("#refreshMindmaps").on("click", () => this.refreshMindmaps());

        // Window resize
        window.addEventListener("resize", () => this.handleResize());
    }

    processData(data) {
        console.log('Processing data:', data);
        // Create hierarchy from flat data
        const hierarchy = d3.hierarchy(data);
        
        console.log('Hierarchy created:', hierarchy);
        console.log('Total nodes in hierarchy:', hierarchy.descendants().length);
        
        // Add properties for expansion state
        hierarchy.descendants().forEach(d => {
            d._children = d.children;
            if (d.depth > 1) { // Collapse nodes beyond level 1 initially
                d.children = null;
            }
            d.expanded = d.children !== null;
        });

        console.log('Data processing complete');
        return hierarchy;
    }

    renderMindmap() {
        console.log('Starting to render mindmap...');
        
        // Create tree layout
        this.tree = d3.tree()
            .size([this.height - 100, this.width - 300]);

        // Calculate positions
        this.root = this.tree(this.currentData);

        // Set initial positions
        this.root.x0 = this.height / 2;
        this.root.y0 = 100;

        console.log('Tree layout created, starting update...');
        this.update(this.root);
        
        console.log('Update complete, resetting view...');
        this.resetView();
        
        console.log('Mindmap rendering complete');
    }

    update(source) {
        console.log('Starting update with source:', source.data.name);
        const treeData = this.tree(this.root);
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        console.log(`Update: ${nodes.length} nodes, ${links.length} links`);

        // Normalize for fixed-depth
        nodes.forEach(d => {
            d.y = d.depth * 180;
        });

        // Update nodes
        this.updateNodes(nodes, source);
        
        // Update links
        this.updateLinks(links, source);

        // Store the old positions for transition
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
        
        console.log('Update complete');
    }

    updateNodes(nodes, source) {
        const node = this.nodeGroup.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++this.nodeIdCounter));

        // Enter new nodes
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on("click", (event, d) => {
                // Only update info if not clicking expand button
                if (!event.target.classList.contains('expand-btn') && 
                    !event.target.classList.contains('expand-text')) {
                    this.selectNode(d);
                }
            });

        // Add circles for new nodes
        nodeEnter.append("circle")
            .attr("class", "node-circle")
            .attr("r", 1e-6)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");

        // Add text labels for new nodes
        nodeEnter.append("text")
            .attr("class", "node-text")
            .attr("dy", "0.31em")
            .attr("x", d => {
                // Better positioning based on node type and whether it has children
                const hasChildren = d._children || d.children;
                const nodeRadius = d.depth === 0 ? 20 : 10;
                const textOffset = nodeRadius + 8; // Offset from node edge plus padding
                
                if (d.depth === 0) {
                    // Root node: center the text below
                    return 0;
                } else if (hasChildren) {
                    // Nodes with children: text to the left
                    return -(textOffset + 6); // Extra space for expand button
                } else {
                    // Leaf nodes: text to the right
                    return textOffset;
                }
            })
            .attr("y", d => d.depth === 0 ? 35 : 0) // Root text below, others centered
            .style("text-anchor", d => {
                if (d.depth === 0) return "middle";
                return (d._children || d.children) ? "end" : "start";
            })
            .style("font-size", d => d.depth === 0 ? "14px" : "12px")
            .style("font-weight", d => d.depth === 0 ? "bold" : "normal")
            .style("fill", "#333")
            .text(d => d.data.name);

        // Add expand/collapse buttons for nodes with children
        const expandGroup = nodeEnter.filter(d => d._children || d.children)
            .append("g")
            .attr("class", "expand-group")
            .on("click", (event, d) => {
                event.stopPropagation();
                this.toggleNode(event, d);
            });

        expandGroup.append("circle")
            .attr("class", "expand-btn")
            .attr("r", 6)
            .attr("cx", d => d.depth === 0 ? 25 : 15) // Position relative to node size
            .style("fill", d => d.children ? "#ff6b6b" : "#4ecdc4") // Red for collapse, green for expand
            .style("stroke", "#fff")
            .style("stroke-width", "2px")
            .style("cursor", "pointer");

        expandGroup.append("text")
            .attr("class", "expand-text")
            .attr("x", d => d.depth === 0 ? 25 : 15)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("dominant-baseline", "central")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "#fff")
            .style("pointer-events", "none")
            .text(d => d.children ? "−" : "+");

        // Transition nodes to their new position
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(600)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // Update the node attributes and style
        nodeUpdate.select("circle.node-circle")
            .transition()
            .duration(600)
            .attr("r", d => d.depth === 0 ? 20 : 10)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff")
            .attr("cursor", "pointer");

        // Update expand button text and position
        nodeUpdate.select(".expand-text")
            .text(d => d.children ? "−" : "+");

        nodeUpdate.select(".expand-btn")
            .attr("cx", d => d.depth === 0 ? 25 : 15)
            .style("fill", d => d.children ? "#ff6b6b" : "#4ecdc4"); // Red for collapse, green for expand

        nodeUpdate.select(".expand-text")
            .attr("x", d => d.depth === 0 ? 25 : 15)
            .attr("y", 0);

        // Update text positioning
        nodeUpdate.select(".node-text")
            .transition()
            .duration(600)
            .attr("x", d => {
                const hasChildren = d._children || d.children;
                const nodeRadius = d.depth === 0 ? 20 : 10;
                const textOffset = nodeRadius + 8;
                
                if (d.depth === 0) {
                    return 0;
                } else if (hasChildren) {
                    return -(textOffset + 6);
                } else {
                    return textOffset;
                }
            })
            .attr("y", d => d.depth === 0 ? 35 : 0)
            .style("text-anchor", d => {
                if (d.depth === 0) return "middle";
                return (d._children || d.children) ? "end" : "start";
            });

        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
            .duration(600)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle")
            .transition()
            .duration(600)
            .attr("r", 1e-6);

        nodeExit.select("text")
            .transition()
            .duration(600)
            .style("fill-opacity", 1e-6);
            
        // Update selection visual after node updates
        setTimeout(() => this.updateSelectionVisual(), 650); // Slight delay to ensure transitions complete
    }

    updateLinks(links, source) {
        const link = this.linkGroup.selectAll("path.link")
            .data(links, d => d.id);

        // Enter any new links at the parent's previous position
        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o);
            });

        // Transition links to their new position
        linkEnter.merge(link).transition()
            .duration(600)
            .attr("d", d => this.diagonal(d, d.parent));

        // Remove any exiting links
        link.exit().transition()
            .duration(600)
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o);
            })
            .remove();
    }

    diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                     C ${(s.y + d.y) / 2} ${s.x},
                       ${(s.y + d.y) / 2} ${d.x},
                       ${d.y} ${d.x}`;
        return path;
    }

    toggleNode(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
        this.updateNodeInfo(d);
    }

    resetView() {
        const transform = d3.zoomIdentity.translate(80, 100).scale(0.8);
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, transform);
    }

    updateNodeInfo(d) {
        const nodeDetails = d3.select("#node-details");
        
        if (d && d.data && d.data.name) {
            console.log('Node data:', d.data); // Debug log
            let content = `<h4>${d.data.name}</h4>`;
            
            // Add description if available
            if (d.data.description) {
                content += `<div class="node-description">
                    <p><strong>Description:</strong></p>
                    <p>${d.data.description}</p>
                </div>`;
            }
            
            // Add details if available
            if (d.data.details) {
                content += `<div class="node-details">
                    <p><strong>Details:</strong></p>
                    <p>${d.data.details}</p>
                </div>`;
            }
            
            // If no description or details available, show a helpful message
            if (!d.data.description && !d.data.details) {
                content += `<div class="node-info">
                    <p><em>No additional information available for this node.</em></p>
                </div>`;
            }
            
            nodeDetails.html(content);
        } else {
            nodeDetails.html('<p>Click on a node to see details</p>');
        }
    }

    expandAll() {
        this.root.descendants().forEach(d => {
            if (d._children) {
                d.children = d._children;
                d._children = null;
            }
        });
        this.update(this.root);
    }

    collapseAll() {
        this.root.descendants().forEach(d => {
            if (d.children && d.depth > 0) {
                d._children = d.children;
                d.children = null;
            }
        });
        this.update(this.root);
    }

    async refreshMindmaps() {
        try {
            console.log('Refreshing mindmaps...');
            
            // Show loading state
            const select = d3.select("#mindmapSelect");
            select.selectAll("option").remove();
            select.append("option").attr("value", "").text("Refreshing mindmaps...");
            
            // Clear current data
            this.loader.mindmaps.clear();
            this.availableMindmaps = [];
            
            // Reload mindmaps
            await this.loadAvailableMindmaps();
            
            console.log('Mindmaps refreshed successfully');
        } catch (error) {
            console.error('Error refreshing mindmaps:', error);
            const select = d3.select("#mindmapSelect");
            select.selectAll("option").remove();
            select.append("option").attr("value", "").text("Error loading mindmaps");
        }
    }

    handleResize() {
        const container = d3.select("#mindmap-container");
        const containerRect = container.node().getBoundingClientRect();
        
        this.width = containerRect.width;
        this.height = containerRect.height;

        this.svg
            .attr("width", this.width)
            .attr("height", this.height);

        if (this.tree) {
            this.tree.size([this.height - 100, this.width - 200]);
            this.renderMindmap();
        }
    }

    selectNode(d) {
        // Clear previous selection
        this.clearSelection();
        
        // Set new selection
        this.selectedNode = d;
        
        // Update visual feedback
        this.updateSelectionVisual();
        
        // Update node info panel
        this.updateNodeInfo(d);
    }

    clearSelection() {
        // Remove selected class from all nodes
        this.nodeGroup.selectAll(".node-circle")
            .classed("selected", false)
            .style("stroke", "#ffffff")
            .style("stroke-width", "2px")
            .style("filter", null);
            
        this.selectedNode = null;
    }

    updateSelectionVisual() {
        if (this.selectedNode) {
            // Find and highlight the selected node
            this.nodeGroup.selectAll(".node")
                .select(".node-circle")
                .classed("selected", d => d === this.selectedNode)
                .style("stroke", d => d === this.selectedNode ? "#ff6b35" : "#ffffff")
                .style("stroke-width", d => d === this.selectedNode ? "4px" : "2px")
                .style("filter", d => d === this.selectedNode ? "drop-shadow(0 4px 8px rgba(255, 107, 53, 0.4))" : null);
        }
    }
}

// Initialize the mindmap when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveMindmap();
});
