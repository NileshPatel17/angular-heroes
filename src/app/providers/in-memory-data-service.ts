import {
  InMemoryDbService
} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [{
        id: 11,
        name: 'Mr. Nice',
        "canFly": false
      },
      {
        id: 12,
        name: 'Narco',
        "canFly": false
      },
      {
        id: 13,
        name: 'Bombasto',
        "canFly": false
      },
      {
        id: 14,
        name: 'Celeritas',
        "canFly": false
      },
      {
        id: 15,
        name: 'Magneta',
        "canFly": false
      },
      {
        id: 16,
        name: 'RubberMan',
        "canFly": false
      },
      {
        id: 17,
        name: 'Dynama',
        "canFly": false
      },
      {
        id: 18,
        name: 'Dr IQ',
        "canFly": false
      },
      {
        id: 19,
        name: 'Magma',
        "canFly": false
      },
      {
        id: 20,
        name: 'Tornado',
        "canFly": true
      },
      {
        id: 21,
        "name": "Windstorm",
        "canFly": true
      },
      {
        id: 23,
        "name": "Magneto",
        "canFly": false
      }
    ];
    return {
      heroes
    };
  }
}
