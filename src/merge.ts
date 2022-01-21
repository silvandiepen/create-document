interface MergeObject {
  [key: string]: any;
  length?: never;
}
interface MergeOptions {
  mergeArrays: boolean;
}

type TUnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

const defaultOptions: MergeOptions = {
  mergeArrays: true,
};

const isObject = (obj: any) => {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }

    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  return false;
};

export const merge = <T extends MergeObject[]>(
  ...objects: T
): TUnionToIntersection<T[number]> =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays
          ? Array.from(new Set((result[key] as unknown[]).concat(current[key])))
          : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(
          result[key] as MergeObject,
          current[key] as MergeObject
        );
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {}) as any;

merge.options = defaultOptions;

merge.withOptions = <T extends MergeObject[]>(
  options: Partial<MergeOptions>,
  ...objects: T
) => {
  merge.options = {
    mergeArrays: true,
    ...options,
  };

  const result = merge(...objects);

  merge.options = defaultOptions;

  return result;
};

export default merge;
