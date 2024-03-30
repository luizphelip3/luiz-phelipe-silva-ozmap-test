export function removeUndefinedParams(params: Object): any {
  const result: any = {};

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      result[key] = params[key];
    }
  });
  return result;
}

export function removeNullAndUndefinedParams(params: Object): any {
  const result: any = {};

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      result[key] = params[key];
    }
  });
  return result;
}
