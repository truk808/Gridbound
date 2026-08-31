export type DeepFieldsOnly<T> = T extends Function
    ? never
    : T extends Array<infer U>
        ? Array<DeepFieldsOnly<U>>
        : T extends object
            ? { [K in keyof T as T[K] extends Function ? never : K]: DeepFieldsOnly<T[K]> }
            : T;

