/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLError, versionInfo, GraphQLScalarType, print } from 'graphql';

function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

// Taken from https://github.com/graphql/graphql-js/blob/30b446938a9b5afeb25c642d8af1ea33f6c849f3/src/type/scalars.ts#L267
// Support serializing objects with custom valueOf() or toJSON() functions -
// a common way to represent a complex value which can be represented as
// a string (ex: MongoDB id objects).
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === 'function') {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === 'function') {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}

function createGraphQLError(message, options = null) {
  if (versionInfo.major >= 17) {
    return new GraphQLError(message, options);
  }
  return new GraphQLError(
    message,
    options === null || options === void 0 ? void 0 : options.nodes,
    options === null || options === void 0 ? void 0 : options.source,
    options === null || options === void 0 ? void 0 : options.positions,
    options === null || options === void 0 ? void 0 : options.path,
    options === null || options === void 0 ? void 0 : options.originalError,
    options === null || options === void 0 ? void 0 : options.extensions,
  );
}

export const GraphQLBigIntConfig = /*#__PURE__*/ {
  name: 'BigInt',
  description: 'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    let num = coercedValue;
    if (typeof coercedValue === 'object' && coercedValue != null && 'toString' in coercedValue) {
      num = Number(coercedValue.toString());
      if (num.toString() !== coercedValue.toString()) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
    }
    if (typeof coercedValue === 'boolean') {
      num = Number(coercedValue);
    }
    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = Number(coercedValue);
      if (num.toString() !== coercedValue) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
    }
    if (typeof coercedValue === 'number') {
      if (!Number.isInteger(coercedValue)) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
      num = Number(coercedValue);
    }
    return num;
  },
  parseValue(inputValue) {
    if (typeof inputValue !== 'number' || !Number.isInteger(inputValue)) {
      throw createGraphQLError(`BigInt cannot represent non-integer value: ${inputValue}`);
    }
    return inputValue;
  },
  parseLiteral(valueNode) {
    if (!('value' in valueNode)) {
      throw createGraphQLError(`BigInt cannot represent non-integer value: ${print(valueNode)}`, {
        nodes: valueNode,
      });
    }
    const strOrBooleanValue = valueNode.value;
    const bigint = BigInt(strOrBooleanValue);
    if (strOrBooleanValue.toString() !== bigint.toString()) {
      throw createGraphQLError(`BigInt cannot represent value: ${strOrBooleanValue}`);
    }
    const num = Number(strOrBooleanValue);
    return num;
  },
  extensions: {
    codegenScalarType: 'bigint',
    jsonSchema: {
      type: 'integer',
      format: 'int64',
    },
  },
};
export const GraphQLBigInt = /*#__PURE__*/ new GraphQLScalarType(GraphQLBigIntConfig);
