class CellModel{
    constructor(x, y, value, state, adjacentCells){
        this.x = x;
        this.y = y;
        this.value = value;
        this.state = state;
        this.adjacentCells = adjacentCells;
    }
}

export default CellModel;