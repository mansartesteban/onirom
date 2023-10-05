import MathUtils from "@core/Utils/Math";

class ArrayUtils {

    static findIndexMultiple(array: any[], callbackCondition: Function) {
        let indexes: any[] = [];
        array.forEach((v, k) => {
            if (callbackCondition(v)) {
                indexes.push(k);
            }
        });
        return indexes;
    }

    static removeMultiple(array: any[] = [], indexes: number[] = []) {
        for (let i = indexes.length - 1;i >= 0;i--) {
            array.splice(indexes[i], 1);
        }
    }

    static pickRandom(array: [] = [], count: number = 1) {
        let ret: any[] = [];
        for (let i = 0;i < count;i++) {
            ret.push(array[MathUtils.random(0, array.length - 1)]);
        }

        return count === 1 ? ret[0] : ret;
    }
}

export default ArrayUtils;