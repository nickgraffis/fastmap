import { getRandomInt } from './getRandomInt';

export function dotNotationToObject(path: string, value?: any) {
  const result = {};
  const parts = path.split('.');
  if (parts.length === 1) {
    let part = parts[0];
    if (part.includes('[]'))
      part = part.replace(/\[\]/, `[${getRandomInt(50000)}]`);
    return { [part]: value || undefined };
  }
  // Create sub-objects along path as needed
  let target = result;
  while (parts.length > 1) {
    let part = parts.shift();
    if (part) {
      if (part.includes('[]'))
        part = part.replace(/\[\]/, `[${getRandomInt(50000)}]`);
      target = (target as any)[part] =
        (target as any)[part] ||
        (parts.length === 1 ? { [parts[parts.length - 1]]: value } : {});
    }
  }

  return result;
}

export default dotNotationToObject;
