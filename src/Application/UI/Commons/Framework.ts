import VNode from "./VNode";

type TProp = {
    type?: Function | Function[];
    default?: any,
    validator?: Function;
    value: null;
};

export const defineProps = (props: TProps, propsValue: TProps): TProps => {

    Object.keys(props).forEach((propKey: string) => {
        if (["__observers", "__observe", "__notify"].includes(propKey)) {
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

    props.__observers = [];

    props.__observe = (propName: String, callback: Function) =>
        props.__observers.push({ propName, callback });

    props.__notify = (propName: string) =>
        props.__observers.forEach((observer: { propName: String, callback: Function; }) =>
            observer.propName === propName && observer.callback());

    return props;
};


export const defineRefs = (ctx?: any): any => {

    const refs: { [name: string]: any; } = ctx || {};

    const proxy = new Proxy(refs, {

        get: (_, key: string) => refs[key],
        set: (obj: {}, prop: string, value: any): boolean => {
            // Neither reaffect var nor trigger render if value is the same
            if (value !== refs[prop]) {
                Reflect.set(obj, prop, value);
            }
            return value !== undefined && value !== null;
        }
    });

    return proxy;
};

export const h = (element: string | VNode, props?: TProps, children?: VNode[]) => {
    let node = element instanceof VNode ? element : new VNode();
    if (props) {
        node.props = props;
    }
    if (children) {
        node.children = children;
    }
    node.setup();
    return node;
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

// TODO
// export function computed() { };
// export function watch() { };