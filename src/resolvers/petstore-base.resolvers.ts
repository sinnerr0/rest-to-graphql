import { Resolvers } from '../generated/graphql';
export const resolvers: Resolvers = {
  Query: {
    pet: async (_, args, { api }) => {
      return api.petstore.base.pet(args);
    },
    petFindByStatus: async (_, args, { api }) => {
      return api.petstore.base.petFindByStatus(args);
    },
    petFindByTags: async (_, args, { api }) => {
      return api.petstore.base.petFindByTags(args);
    },
    storeInventory: async (_, args, { api }) => {
      return api.petstore.base.storeInventory(args);
    },
    storeOrder: async (_, args, { api }) => {
      return api.petstore.base.storeOrder(args);
    },
    user: async (_, args, { api }) => {
      return api.petstore.base.user(args);
    },
    userLogin: async (_, args, { api }) => {
      return api.petstore.base.userLogin(args);
    },
    userLogout: async (_, args, { api }) => {
      return api.petstore.base.userLogout(args);
    },
  },
  Mutation: {
    deletePet: async (_, args, { api }) => {
      return api.petstore.base.deletePet(args);
    },
    deleteStoreOrder: async (_, args, { api }) => {
      return api.petstore.base.deleteStoreOrder(args);
    },
    deleteUser: async (_, args, { api }) => {
      return api.petstore.base.deleteUser(args);
    },
    postPet: async (_, args, { api }) => {
      return api.petstore.base.postPet(args);
    },
    postPetUploadImage: async (_, args, { api }) => {
      return api.petstore.base.postPetUploadImage(args);
    },
    postStoreOrder: async (_, args, { api }) => {
      return api.petstore.base.postStoreOrder(args);
    },
    postUser: async (_, args, { api }) => {
      return api.petstore.base.postUser(args);
    },
    postUserCreateWithArray: async (_, args, { api }) => {
      return api.petstore.base.postUserCreateWithArray(args);
    },
    postUserCreateWithList: async (_, args, { api }) => {
      return api.petstore.base.postUserCreateWithList(args);
    },
    putPet: async (_, args, { api }) => {
      return api.petstore.base.putPet(args);
    },
    putUser: async (_, args, { api }) => {
      return api.petstore.base.putUser(args);
    },
  },
};
