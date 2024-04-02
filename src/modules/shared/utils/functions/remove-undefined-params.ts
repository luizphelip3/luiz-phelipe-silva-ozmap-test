export function removeNullAndUndefinedParams(params: Object): any {
  const result: any = {};

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      result[key] = params[key];
    }
  });
  return result;
}
