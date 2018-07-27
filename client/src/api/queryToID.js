import _ from 'lodash';

export default (query, variables) => {
  const keys = _.chain(variables)
    .keys()
    .sort()
    .map(key => `${key}:${variables[key]}`)
    .join(',')
    .value();

  const strippedQuery = query.replace(/\s/g, '');

  return `${strippedQuery}:${keys}`;
};
