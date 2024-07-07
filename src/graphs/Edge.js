import EdgeGraphs from "../shapes/Edge";
import * as THREE from 'three';

class Edge extends EdgeGraphs {
    constructor(source, destination, weight = 1, cost = 0) {
        super(source, destination, new THREE.LineBasicMaterial({color: 0xffffff}));
        this.source = source;
        this.destination = destination;
        this.weight = weight; // Peso como distancia
        this.cost = cost;     // Nuevo atributo para costo adicional
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }

    setCost(cost) {
        this.cost = cost;
    }

    getCost() {
        return this.cost;
    }

    getSource() {
        return this.source;
    }

    getDestination() {
        return this.destination;
    }
}

export default Edge;
