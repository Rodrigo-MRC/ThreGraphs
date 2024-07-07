
import Vertex from "./graphs/Vertex";
import Edge from "./graphs/Edge";

export function initGraph() {
    const v1 = new Vertex('v1');
    const v2 = new Vertex('v2');
    const v3 = new Vertex('v3');
    const v4 = new Vertex('v4');
    const v5 = new Vertex('v5');
    const v6 = new Vertex('v6');
    const v7 = new Vertex('v7');

    const e1 = v1.addNeighbor(v2, 2);
    const e2 = v1.addNeighbor(v3, 3);
    const e3 = v1.addNeighbor(v4, 5); 
    const e4 = v3.addNeighbor(v7, 4);  
    const e5 = v4.addNeighbor(v7, 2); 
    const e6 = v5.addNeighbor(v2, 1); 
    const e7 = v5.addNeighbor(v1, 2);  
    const e8 = v5.addNeighbor(v6, 3); 
    const e9 = v7.addNeighbor(v1, 1);  
    const e10 = v6.addNeighbor(v3, 2); 
    const e11 = v6.addNeighbor(v4, 3);
    const e12 = v6.addNeighbor(v7, 4); 

    return { vertex: [v1, v2, v3, v4, v5, v6, v7], edges: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12] };
}