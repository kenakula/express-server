import { ObjectLiteral } from 'typeorm';

export const omitProperty = <T extends ObjectLiteral>(object: T, property: keyof T | (keyof T)[]): Partial<T> => {
  const objectCopy = { ...object };

  if (Array.isArray(property)) {
    property.forEach(property => {
      delete objectCopy[property];
    });

    return objectCopy;
  }

  delete objectCopy[property];

  return objectCopy;
};
