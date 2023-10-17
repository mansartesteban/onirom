import Reactive from "./Reactive";
import VNode from "./VNode";

type TProp = {
    type?: Function | Function[];
    default?: any,
    validator?: Function;
    value: null;
};


export const defineProps = (props: TProps, propsValue: TProps): TProps => {

    Object.keys(props).forEach((propKey: string) => {
        if (["observers", "observe", "fire"].includes(propKey)) {
            throw `Props cannot be named '${propKey}' as it is a internal reserved method`;
        }
        let prop = props[propKey] as TProp;
        let value = undefined;
        if (propsValue[propKey]) {
            value = propsValue[propKey];
        } else if (prop.default) {
            value = getDefaultValue(prop.default);
        }

        if (prop.validator) {
            isValidValue(value, prop, propKey);
        }

        props[propKey] = value;
    });

    props.observers = [];
    props.observe = (propName: String, callback: Function) => {
        props.observers.push({ propName, callback });
    };
    props.notify = (propName: string) => props.observers.forEach((observer: { propName: String, callback: Function; }) => observer.propName === propName && observer.callback());

    return props;
};

// TODO:
export const h = (element: string, props: TProps, children: VNode[]) => {

};

export const ref = (value?: any) => {
    //TODO:
    // const handler = {
    //     get(cible: any, prop: any, recepteur: any) {
    //         return value.value;
    //     },
    // };
    // let proxy = new Proxy(value, handler);

    // value.prototype.react = function () { };
    const proxy = new Reactive(value);

    return proxy;
};

function isValidValue(value: any, prop: TProp, propKey: string) {

    if (prop.type) {
        prop.type = Array.isArray(prop.type) ? prop.type : [prop.type];
        if (!prop.type.some((typeConstructor: Function) => value.constructor === typeConstructor)) {
            const acceptedTypes = prop.type.map(type => type.name).join(" ,");
            throw `The type of the prop '${propKey}' is not accepted. Received : '${value.constructor.name}'. Expected: '${acceptedTypes}'`;
        }
    }

    if (prop.validator) {
        if (!prop.validator(value)) {
            throw `Validation of prop '${propKey}' failed`;
        }
    }
}

function getDefaultValue(defaultExpression: any) {
    if (typeof defaultExpression === "function") {
        return defaultExpression();
    }

    return defaultExpression;
}