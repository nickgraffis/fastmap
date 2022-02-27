import mapper from '../src/index';
import input from '../test-data/input';
import map from '../test-data/map';
import output from '../test-data/output';

const source = {
  name: 'Nick Graffish',
  city: 'San Francisco',
  state: 'CA',
  address: '123 Main St',
  zip: '94105',
  phone: '123-456-7890',
}

// Map
const mapTwo = {
  name: (_, obj) => ([
    { first_name: obj.name.split(' ')[0] },
    { last_name: obj.name.split(' ')[1] || '' },
  ]),
  city: 'address.city',
  state: 'address.state',
  address: 'address.street',
  zip: 'address.zip',
}

const responseTwo = {
  first_name: 'Nick',
  last_name: 'Graffish',
  address: {
    city: 'San Francisco',
    state: 'CA',
    street: '123 Main St',
    zip: '94105',
  }
}

test('should map properly', () => {
  expect(mapper(input, map)).toStrictEqual(output);
});

test('should map properly two', () => {
  expect(mapper(source, mapTwo)).toStrictEqual(responseTwo);
});
