type TProp = {
    type?: Function | Function[];
    default?: any,
    validator?: Function;
    value: null;
};


export const defineProps = (props: TProps, propsValue: TProps): TProps => {
    Object.keys(props).forEach((propKey: string) => {
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
    return props;
};

export const ref = () => {

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