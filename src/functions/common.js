import _ from 'lodash';

export const parseQuery = (query) => {
  return _.chain(query)
    .replace('?', '')
    .split('&')
    .map(_.partial(_.split, _, '=', 2))
    .fromPairs()
    .value();
};
