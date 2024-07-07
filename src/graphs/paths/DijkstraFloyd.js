import Vertex from "../Vertex";  
import Edge from "../Edge";

class DijkstraFloyd {
    constructor() {
        this.vertices = new Map();
        this.edges = [];          
    }

    addVertex(label) {
        const vertex = { label }; 
        this.vertices.set(label, vertex);
        return vertex;                
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        const edge = { srcLabel, destLabel, weight };  
        this.edges.push(edge);       
        return edge;                 
    }

    floydWarshall() {
        const verticesArray = Array.from(this.vertices.keys());  
        const dist = verticesArray.reduce((acc, v1) => {
            acc[v1] = verticesArray.reduce((row, v2) => {
                row[v2] = v1 === v2 ? 0 : Infinity;  
                return row;
            }, {});
            return acc;
        }, {});

        this.edges.forEach(({ srcLabel, destLabel, weight }) => {
            dist[srcLabel][destLabel] = weight;  
        });

        verticesArray.forEach(k => {
            verticesArray.forEach(i => {
                verticesArray.forEach(j => {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];  
                    }
                });
            });
        });

        console.log("Distancias más cortas entre cada par de vértices:");
        verticesArray.forEach(v1 => {
            let row = `${v1}: `;
            verticesArray.forEach(v2 => {
                row += dist[v1][v2] === Infinity ? "INF " : `${dist[v1][v2]} `;
            });
            console.log(row);  
        });
    }

    dijkstra(startLabel) {
        const distances = {};
        Array.from(this.vertices.keys()).forEach(label => {
            distances[label] = label === startLabel ? 0 : Infinity;  
        });

        const pq = [{ label: startLabel, distance: 0 }];

        while (pq.length > 0) {
            const { label, distance } = pq.shift();

            this.edges
                .filter(({ srcLabel }) => srcLabel === label)
                .forEach(({ destLabel, weight }) => {
                    const alt = distance + weight;
                    if (alt < distances[destLabel]) {
                        distances[destLabel] = alt;
                        pq.push({ label: destLabel, distance: alt });  
                    }
                });

            pq.sort((a, b) => a.distance - b.distance);
        }

        console.log("Vértice\tDistancia desde el origen");
        Object.entries(distances).forEach(([label, distance]) => {
            console.log(`${label}\t${distance === Infinity ? 'Infinity' : distance}`);
        });  
    }
}

class MinHeap {
    constructor() {
        this.heap = [];  
    }

    insert(node) {
        this.heap.push(node);  
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent.priority <= element.priority) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;  
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);  
        }
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;  
        }
    }

    isEmpty() {
        return this.heap.length === 0;  
    }
}

export default DijkstraFloyd;  