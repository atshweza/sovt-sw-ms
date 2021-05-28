import { RESTDataSource } from 'apollo-datasource-rest'
import camelCaseKeys from 'camelcase-keys'

const API_URL = 'https://swapi.dev/api'

export class PeopleAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = API_URL
  }

  async people(page: number) {
    const data = await this.get('people',{ page});

    return camelCaseKeys(data.results, { deep: true });
  }
  async personByName(name: string) {
    const data = await this.get('people',{search: name});
    let person = {};

    if(data && data.count  === 1){
      person = data.results[0];
    }

    return camelCaseKeys(person, { deep: true });
  }
}

export const dataSources = () => ({ peopleAPI: new PeopleAPI() })
