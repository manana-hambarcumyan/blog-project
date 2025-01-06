import { Storage } from '../utils/storage.js';
import { BaseApi } from "./base.js";

export class UserApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }


  async getUser() {
    try {
      const token = Storage.getItem('token')

      const response = await fetch(this.getFullUrl('/users'));
     
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      
      const user = await response.json();

      return user
    } catch (error) {
      console.error(error);
    }
  }


  getFullUrl(endpoint) {
    // Issue with endpoint
    return `${this.baseUrl}${endpoint}`
  }

}