export function combineSimilarKeysDeep(object: any) {
  const keys = Object.keys(object);
  const newObject: any = {};
  if (Array.isArray(object)) return object;
  keys.forEach((key) => {
    const newKey = key.replace(/\[\d+\]/g, '');
    if (newObject[newKey] && key.includes('[')) {
      newObject[newKey].push(object[key]);
    } else if (key.includes('[')) {
      newObject[newKey] = [object[key]];
    } else {
      newObject[key] = object[key];
    }
    if (typeof object[key] === 'object') {
      if (Array.isArray(object[key]) && key.includes('[')) {
        newObject[key] = object[key].map(combineSimilarKeysDeep);
      } else {
        newObject[key] = combineSimilarKeysDeep(object[key]);
      }
    }

    if (key.includes('[')) delete newObject[key];
  });
  return newObject;
}

export default combineSimilarKeysDeep;
