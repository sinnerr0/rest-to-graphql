import { UPSTREAM_URL } from '../config';
import { BaseDataSource } from './base.datasource';
export class PetstoreBaseDatasource extends BaseDataSource {
  override baseURL = UPSTREAM_URL.PETSTORE.URL;
  basePath = UPSTREAM_URL.PETSTORE.BASE_PATH;
  async pet(params) {
    const _params = this.excludeParams(params, ['petId']);
    return this.get(`${this.basePath}/pet/${params.petId}`, { params: _params });
  }
  async petFindByStatus(params) {
    const _params = this.excludeParams(params, []);
    return this.get(`${this.basePath}/pet/findByStatus`, { params: _params });
  }
  async petFindByTags(params) {
    const _params = this.excludeParams(params, []);
    return this.get(`${this.basePath}/pet/findByTags`, { params: _params });
  }
  async storeInventory(params) {
    const _params = this.excludeParams(params, []);
    return this.get(`${this.basePath}/store/inventory`, { params: _params });
  }
  async storeOrder(params) {
    const _params = this.excludeParams(params, ['orderId']);
    return this.get(`${this.basePath}/store/order/${params.orderId}`, { params: _params });
  }
  async user(params) {
    const _params = this.excludeParams(params, ['username']);
    return this.get(`${this.basePath}/user/${params.username}`, { params: _params });
  }
  async userLogin(params) {
    const _params = this.excludeParams(params, []);
    return this.get(`${this.basePath}/user/login`, { params: _params });
  }
  async userLogout(params) {
    const _params = this.excludeParams(params, []);
    return this.get(`${this.basePath}/user/logout`, { params: _params });
  }
  async deletePet(params) {
    return this.delete(`${this.basePath}/pet/${params.petId}`, { body: params.requestBody });
  }
  async deleteStoreOrder(params) {
    return this.delete(`${this.basePath}/store/order/${params.orderId}`, { body: params.requestBody });
  }
  async deleteUser(params) {
    return this.delete(`${this.basePath}/user/${params.username}`, { body: params.requestBody });
  }
  async postPet(params) {
    return this.post(`${this.basePath}/pet`, { body: params.requestBody });
  }
  async postPetUploadImage(params) {
    return this.post(`${this.basePath}/pet/${params.petId}/uploadImage`, { body: params.requestBody });
  }
  async postStoreOrder(params) {
    return this.post(`${this.basePath}/store/order`, { body: params.requestBody });
  }
  async postUser(params) {
    return this.post(`${this.basePath}/user`, { body: params.requestBody });
  }
  async postUserCreateWithArray(params) {
    return this.post(`${this.basePath}/user/createWithArray`, { body: params.requestBody });
  }
  async postUserCreateWithList(params) {
    return this.post(`${this.basePath}/user/createWithList`, { body: params.requestBody });
  }
  async putPet(params) {
    return this.put(`${this.basePath}/pet`, { body: params.requestBody });
  }
  async putUser(params) {
    return this.put(`${this.basePath}/user/${params.username}`, { body: params.requestBody });
  }
}
