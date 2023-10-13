import { v4 as uuid } from 'uuid';

class NodeId {
    id: string;

    constructor() {
        this.id = uuid();
    }
}

export default NodeId; 