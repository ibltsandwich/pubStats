const isEmpty = value => {
  value === undefined ||
  value === null ||
  (typeOf(value) === 'object' && Object.keys(value).length === 0) ||
  (typeOf(value) === 'string' && value.trim().length === 0)
}

module.exports = isEmpty;