import { mapper } from './dist';

const source = {
  name: 'Nick Graffish',
  city: 'San Francisco',
  state: 'CA',
  address: '123 Main St',
  zip: '94105',
  phone: '123-456-7890',
}

type ResponseType = {
  first_name: string,
  last_name: string,
  address: {
    city: string,
    state: string,
    street: string,
    zip: string,
  }
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

const response = mapper<ResponseType>(source, mapTwo);