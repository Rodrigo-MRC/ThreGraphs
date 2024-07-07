import delay from '../../shapes/utils/delay';

class Floyd {
    constructor(vertices) {
        this.vertices = vertices;
    }

    async floyd() {
        const n = this.vertices.length;
        const dis = [];
        const sig = [];

        for (let i = 0; i < n; i++) {
            dis[i] = [];
            sig[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    dis[i][j] = 0;
                    sig[i][j] = null;
                } else {
                    const edge = this.vertices[i].getEdgesList().find(e => e.getDestination() === this.vertices[j]);
                    dis[i][j] = edge ? edge.getWeight() : Infinity;
                    sig[i][j] = edge ? j : null;
                }
            }
        }

        console.log("Matriz inicial: ");
        console.table(dis);

        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (dis[i][j] > dis[i][k] + dis[k][j]) {
                        dis[i][j] = dis[i][k] + dis[k][j];
                        sig[i][j] = sig[i][k];
                        this.vertices[i].setColor(0x00ff00);
                        this.vertices[j].setColor(0x00ff00);
                        await delay();
                    }
                }
            }
        }

        console.log("Matriz final: ");
        console.table(dis);

        console.log("Sig matriz: ");
        console.table(sig);
        
        return dis;
    }
}

export default Floyd;