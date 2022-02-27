export function getValueFromObject(object: any, key: string) {
  const keys = key.split(/\.|\[/);
  let value = object;
  keys.forEach((key) => {
    if (key.includes(']')) {
      const index = key.match(/(\d+)\]/)?.[1];
      value = index && value[index];
    } else {
      value = value[key];
    }
  });
  return value;
}

export default getValueFromObject;
