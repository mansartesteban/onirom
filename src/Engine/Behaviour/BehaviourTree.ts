import SequenceAction from "./SequenceAction";

class BehaviourTree {

    steps: SequenceAction[];

    constructor() {
        this.steps = [];
    }

    conditional(condition: Boolean, callbackSuccess: Function, callbackOnFail: Function) {

    }

    next() {

    }
}

export default BehaviourTree;