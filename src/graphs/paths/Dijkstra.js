import delay from '../../shapes/utils/delay';

const dijkstra = async (graph, startVertex) => {
    const distances = new Map();
    const costs = new Map(); // Mapa para almacenar costos adicionales
    const previousVertices = new Map();
    const visitedVertices = new Set();
    const pq = new PriorityQueue();

    graph.vertex.forEach(vertex => {
        distances.set(vertex, Infinity);
        costs.set(vertex, Infinity); // Inicializar costos como infinito
        previousVertices.set(vertex, null);
    });

    distances.set(startVertex, 0);
    costs.set(startVertex, 0); // Costo inicial desde el nodo fuente
    pq.enqueue([startVertex, 0]);

    while (!pq.isEmpty()) {
        const [currentVertex, currentDistance] = pq.dequeue();

        if (visitedVertices.has(currentVertex)) continue;
        visitedVertices.add(currentVertex);

        currentVertex.setColor(0x00ff00);
        await delay();

        currentVertex.getVertexList().forEach(neighbor => {
            const edge = currentVertex.getEdgesList().find(e => e.getDestination() === neighbor);
            const distance = currentDistance + edge.getWeight();
            const cost = currentDistance + edge.getCost(); // Calcula el costo adicional

            if (distance < distances.get(neighbor)) {
                distances.set(neighbor, distance);
                costs.set(neighbor, cost); // Actualiza el costo adicional
                previousVertices.set(neighbor, currentVertex);
                pq.enqueue([neighbor, distance]);
            }
        });
    }

    return { distances, costs, previousVertices };
};

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (element[1] < this.collection[i][1]) {
                    this.collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

export default dijkstra;
