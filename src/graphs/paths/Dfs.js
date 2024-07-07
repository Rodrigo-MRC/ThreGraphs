// Homework, this presentation will be on fridays
// in lab.
import delay from '../../shapes/utils/delay';

const dfs = async (source) => {
    await dfsVisit(source);
};

const dfsVisit = async (vertex) => {
    vertex.setVisited(true);
    vertex.setColor(0xff0000);
    await delay();
    vertex.print();

    for (const neighbor of vertex.getVertexList()) {
        if (!neighbor.getVisited()) {
            await dfsVisit(neighbor);
        }
    }
};

export default dfs;
