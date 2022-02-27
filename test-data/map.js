const map = {
  name: ['sirName', 'name', 'officialName'],
  status: 'data.status',
  species: 'data.species',
  type: 'data.type',
  location: ['location'],
  'origin.name': 'locations[]',
  'location.name': 'locations[]',
  id: 'id',
  'episode[0][0].link': 'episode',
  gender: {
    key: 'gender.biological',
    transform: (value) => value,
    getter: (sourceObj) => sourceObj.gender,
    includeIf: (value) => value === 'Male',
  },
  '*': (_, sourceObj) => [
    { 'nested.name': sourceObj.name },
    { 'nested.nameTwo': sourceObj.name },
  ],
  array: 'array',
};

module.exports = map;