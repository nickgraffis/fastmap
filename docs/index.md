# ⚡️💨 Fast Map
### Fast Map is a javascript library for transforming an object from one structure to another.

## Getting Started
### Installation
```bash
npm install @nickgraffish/fast-map
```

## Basic Usage
The map is an object of key value pairs. The key of the map is the key of the source object and the value is the key of the destination object. For example:

```js
const source = {
  name: 'Nick Graffish',
  age: '32',
  location: 'San Francisco',
};

const map = {
  name: 'fullName',
  age: 'currentAge',
  location: 'city',
};

const result = {
  fullName: 'Nick Graffish',
  currentAge: 32,
  city: 'San Francisco',
}
```

## The Source Key
The source key can be a string that represents the path through the source object to find the value. This can be a dot separated string. For example: `'name.first'` would find the key `first` in the source object's `name` property. Or `name[1]` would find the second item in an array in the source object's `name` property.

::: tip
If you want to add some piece of logic to the destination object, but don't have a source key, you can use any key that you want. If the source object cannot find the key, it will not return a value, but if you use the object or function destination value, you can set this manually.
:::

## The Destination Value
The destination value can be either a `string`, an `array`, an `object`, or a `function`.

### String
When the destination value is a string it will represent the path on the destination object to set the value. 
* `name` will set the value of the destination object's `name` property.
* `name.first` will set the value of the destination object's `name.first` property.
* `name[]` will set the value of the destination object's `name` property to an array and push the value to the array.

::: tip
Strings in this format can always be used to set the key of the destination object. Weather you are using the key property of the object or using a function.
:::

### Object
When the destination value is an object you can pass in the following properties:
* `key`: The key of the destination object to set the value. This is a string.
* `includeIf`: Is a function that accepts the source value and the source object and returns a boolean. If the function returns true the value will be set on the destination object. Defaults to `() => true`.
* `transform`: Is a function that accepts the source value and the source object and returns the value to set on the destination object. Defaults to `(value, source) => value`.
* `mergeStrategy`: Is a function that accepts the destination object, and any number of additional objects and returns the destination object. Defaults to `mergeDeep` which can be imported: `import { mergeDeep } from '@nickgraffish/fast-map/mergeDeep'`.

### Function
When the destination value is a function it will be called with the source value and the source object. The function then returns either an array of key value pairs or an object with a single key value pair. The key value pair will use the key as the destination object key and the value as the destination object value.

### Array
When the destination value is an array, the value from the source will be set in each of the destination paths presented in the array. 

Each item in the array can be a string, object, or function.

::: tip
This can be extreamly useful when you would like to use the value of a key from the source object to set more than one value on the destination object.

You cannot have two keys of the same name in an object, so this is how you would perform such a task.
:::


## Cookbook

#### Get a nested value from the source, and add it to the destination object.

```js
const source = {
  name: {
    first: 'Nick',
    last: 'Graffish',
  },
};
const map = {
  'name.first': firstName,
  'name.last': lastName,
}
const result = {
  firstName: 'Nick',
  lastName: 'Graffish',
}
```

#### Get values from the source and add then to nested objects in the destination object.

```js
const source = {
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
  address: '123 Main St',
  zip: '94110',
};
const map = {
  city: 'address.city',
  state: 'address.state',
  country: 'address.country',
  zip: 'address.zip',
  address: 'address.street',
}
const result = {
  address: {
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    zip: '94110',
    street: '123 Main St',
  }
}
```

#### Get a value from the source and transform it before adding it to the destination object.

```js
const source = {
  name: 'Nick Graffish',
};
const map = {
  name: {
    key: 'name',
    transform: (value) => value.toLowerCase()
  },
}
const result = {
  name: 'nick graffish',
}
```

#### Get a value from the source and transform it before adding it to multiple keys in the destination object.

```js
const source = {
  name: 'Nick Graffish',
};
const map = {
  name: (value) => ([
    { 'firstName': value.split(' ')[0] },
    { 'lastName': value.split(' ')[1] },
  ]),
}
const result = {
  firstName: 'Nick',
  lastName: 'Graffish',
}
```

#### Don't include nullish values in the destination object.

```js
const source = {
  name: 'Nick Graffish',
  age: null,
  location: 'San Francisco',
};
const map = {
  name: 'fullName',
  age: {
    key: 'currentAge',
    includeIf: (value) => value !== null && value !== 'NULL',
  }
  location: 'city',
}
const result = {
  fullName: 'Nick Graffish',
  city: 'San Francisco',
}
```

#### Create an array of objects based on many source keys

```js
const source = {
  name: 'Nick Graffish',
  homePhone: '555-555-5555',
  workPhone: '555-555-5555',
  mobilePhone: '555-555-5555'
};
const map = {
  name: 'fullName',
  homePhone: [
    'phones[0].number', {
      key: 'phones[0].type',
      transform: () => 'home',
    }
  ],
  workPhone: [
    'phones[1].number', {
      key: 'phones[1].type',
      transform: () => 'work',
    }
  ],
  mobilePhone: [
    'phones[2].number', {
      key: 'phones[2].type',
      transform: () => 'mobile',
    }
  ]
}
const result = {
  fullName: 'Nick Graffish',
  phones: [
    {
      number: '555-555-5555',
      type: 'home',
    },
    {
      number: '555-555-5555',
      type: 'work',
    },
    {
      number: '555-555-5555',
      type: 'mobile',
    },
  ]
}
```

::: info
The reason we use numbers inside of our `[0]` notation is to signify that we should be grouping the keys together. Otherwise our result would look like this:
:::

```js
const result = {
  fullName: 'Nick Graffish',
  phones: [
    {
      number: '555-555-5555',
    },
    {
      type: 'home',
    },
    {
      number: '555-555-5555',
    },
    {
      type: 'work',
    },
    {
      number: '555-555-5555',
    },
    {
      type: 'mobile',
    }
  ]
}
```