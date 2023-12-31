import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ContextValue } from '../apollo';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AccountNumber: { input: any; output: any };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any };
  Byte: { input: any; output: any };
  CountryCode: { input: any; output: any };
  Cuid: { input: any; output: any };
  Currency: { input: any; output: any };
  DID: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  DateTimeISO: { input: any; output: any };
  DeweyDecimal: { input: any; output: any };
  Duration: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  GUID: { input: any; output: any };
  HSL: { input: any; output: any };
  HSLA: { input: any; output: any };
  HexColorCode: { input: any; output: any };
  Hexadecimal: { input: any; output: any };
  IBAN: { input: any; output: any };
  IP: { input: any; output: any };
  IPCPatent: { input: any; output: any };
  IPv4: { input: any; output: any };
  IPv6: { input: any; output: any };
  ISBN: { input: any; output: any };
  ISO8601Duration: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
  JWT: { input: any; output: any };
  LCCSubclass: { input: any; output: any };
  Latitude: { input: any; output: any };
  LocalDate: { input: any; output: any };
  LocalDateTime: { input: any; output: any };
  LocalEndTime: { input: any; output: any };
  LocalTime: { input: any; output: any };
  Locale: { input: any; output: any };
  Long: { input: any; output: any };
  Longitude: { input: any; output: any };
  MAC: { input: any; output: any };
  NegativeFloat: { input: any; output: any };
  NegativeInt: { input: any; output: any };
  NonEmptyString: { input: any; output: any };
  NonNegativeFloat: { input: any; output: any };
  NonNegativeInt: { input: any; output: any };
  NonPositiveFloat: { input: any; output: any };
  NonPositiveInt: { input: any; output: any };
  ObjectID: { input: any; output: any };
  PhoneNumber: { input: any; output: any };
  Port: { input: any; output: any };
  PositiveFloat: { input: any; output: any };
  PositiveInt: { input: any; output: any };
  PostalCode: { input: any; output: any };
  RGB: { input: any; output: any };
  RGBA: { input: any; output: any };
  RoutingNumber: { input: any; output: any };
  SafeInt: { input: any; output: any };
  SemVer: { input: any; output: any };
  Time: { input: any; output: any };
  TimeZone: { input: any; output: any };
  Timestamp: { input: any; output: any };
  URL: { input: any; output: any };
  USCurrency: { input: any; output: any };
  UUID: { input: any; output: any };
  UnsignedFloat: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
  UtcOffset: { input: any; output: any };
  Void: { input: any; output: any };
};

export type ApiResponse = {
  __typename?: 'ApiResponse';
  code?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 쿠키를 굽는다. */
  bakeCookie?: Maybe<Scalars['Void']['output']>;
  /**
   * Deletes a pet
   *
   * Equivalent to DELETE /pet/{petId}
   */
  deletePet?: Maybe<Scalars['String']['output']>;
  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
   *
   * Equivalent to DELETE /store/order/{orderId}
   */
  deleteStoreOrder?: Maybe<Scalars['String']['output']>;
  /**
   * This can only be done by the logged in user.
   *
   * Equivalent to DELETE /user/{username}
   */
  deleteUser?: Maybe<Scalars['String']['output']>;
  /**
   * Add a new pet to the store
   *
   * Equivalent to POST /pet
   */
  postPet?: Maybe<Scalars['String']['output']>;
  /**
   * uploads an image
   *
   * Equivalent to POST /pet/{petId}/uploadImage
   */
  postPetUploadImage?: Maybe<ApiResponse>;
  /**
   * Place an order for a pet
   *
   * Equivalent to POST /store/order
   */
  postStoreOrder?: Maybe<Order>;
  /**
   * This can only be done by the logged in user.
   *
   * Equivalent to POST /user
   */
  postUser?: Maybe<Scalars['String']['output']>;
  /**
   * Creates list of users with given input array
   *
   * Equivalent to POST /user/createWithArray
   */
  postUserCreateWithArray?: Maybe<Scalars['String']['output']>;
  /**
   * Creates list of users with given input array
   *
   * Equivalent to POST /user/createWithList
   */
  postUserCreateWithList?: Maybe<Scalars['String']['output']>;
  /**
   * Update an existing pet
   *
   * Equivalent to PUT /pet
   */
  putPet?: Maybe<Scalars['String']['output']>;
  /**
   * This can only be done by the logged in user.
   *
   * Equivalent to PUT /user/{username}
   */
  putUser?: Maybe<Scalars['String']['output']>;
};

export type MutationBakeCookieArgs = {
  key?: InputMaybe<Scalars['NonEmptyString']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeletePetArgs = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  petId: Scalars['BigInt']['input'];
};

export type MutationDeleteStoreOrderArgs = {
  orderId: Scalars['BigInt']['input'];
};

export type MutationDeleteUserArgs = {
  username: Scalars['String']['input'];
};

export type MutationPostPetArgs = {
  requestBody: PetInput;
};

export type MutationPostPetUploadImageArgs = {
  petId: Scalars['BigInt']['input'];
  requestBody?: InputMaybe<PetUploadImageInput>;
};

export type MutationPostStoreOrderArgs = {
  requestBody: OrderInput;
};

export type MutationPostUserArgs = {
  requestBody: UserInput;
};

export type MutationPostUserCreateWithArrayArgs = {
  requestBody: Array<InputMaybe<UserInput>>;
};

export type MutationPostUserCreateWithListArgs = {
  requestBody: Array<InputMaybe<UserInput>>;
};

export type MutationPutPetArgs = {
  requestBody: PetInput;
};

export type MutationPutUserArgs = {
  requestBody: UserInput;
  username: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  complete?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  petId?: Maybe<Scalars['BigInt']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  shipDate?: Maybe<Scalars['String']['output']>;
  /** Order Status */
  status?: Maybe<Status2>;
};

export type OrderInput = {
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  petId?: InputMaybe<Scalars['BigInt']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  shipDate?: InputMaybe<Scalars['String']['input']>;
  /** Order Status */
  status?: InputMaybe<Status2>;
};

export type Pet = {
  __typename?: 'Pet';
  category?: Maybe<Category>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name: Scalars['String']['output'];
  photoUrls: Array<Maybe<Scalars['String']['output']>>;
  /** pet status in the store */
  status?: Maybe<Status>;
};

export type PetInput = {
  category?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  photoUrls: Array<InputMaybe<Scalars['String']['input']>>;
  /** pet status in the store */
  status?: InputMaybe<Status>;
};

export type PetUploadImageInput = {
  /** Additional data to pass to server */
  additionalMetadata?: InputMaybe<Scalars['String']['input']>;
  /** file to upload */
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Returns a single pet
   *
   * Equivalent to GET /pet/{petId}
   */
  pet?: Maybe<Pet>;
  /**
   * Multiple status values can be provided with comma separated strings
   *
   * Equivalent to GET /pet/findByStatus
   */
  petFindByStatus?: Maybe<Array<Maybe<Pet>>>;
  /**
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * Equivalent to GET /pet/findByTags
   * @deprecated Field no longer supported
   */
  petFindByTags?: Maybe<Array<Maybe<Pet>>>;
  /**
   * Returns a map of status codes to quantities
   *
   * Equivalent to GET /store/inventory
   */
  storeInventory?: Maybe<Scalars['JSON']['output']>;
  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * Equivalent to GET /store/order/{orderId}
   */
  storeOrder?: Maybe<Order>;
  /**
   * Get user by user name
   *
   * Equivalent to GET /user/{username}
   */
  user?: Maybe<User>;
  /**
   * Logs user into the system
   *
   * Equivalent to GET /user/login
   */
  userLogin?: Maybe<Scalars['String']['output']>;
  /**
   * Logs out current logged in user session
   *
   * Equivalent to GET /user/logout
   */
  userLogout?: Maybe<Scalars['String']['output']>;
};

export type QueryPetArgs = {
  petId: Scalars['BigInt']['input'];
};

export type QueryPetFindByStatusArgs = {
  status: Array<InputMaybe<Status3ListItem>>;
};

export type QueryPetFindByTagsArgs = {
  tags: Array<InputMaybe<Scalars['String']['input']>>;
};

export type QueryStoreOrderArgs = {
  orderId: Scalars['BigInt']['input'];
};

export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type QueryUserLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum Status {
  Available = 'available',
  Pending = 'pending',
  Sold = 'sold',
}

export enum Status2 {
  Approved = 'approved',
  Delivered = 'delivered',
  Placed = 'placed',
}

export enum Status3ListItem {
  Available = 'available',
  Pending = 'pending',
  Sold = 'sold',
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  /** User Status */
  userStatus?: Maybe<Scalars['Int']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** User Status */
  userStatus?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
  ApiResponse: ResolverTypeWrapper<ApiResponse>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']['output']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>;
  DID: ResolverTypeWrapper<Scalars['DID']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']['output']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']['output']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']['output']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']['output']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']['output']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']['output']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']['output']>;
  IP: ResolverTypeWrapper<Scalars['IP']['output']>;
  IPCPatent: ResolverTypeWrapper<Scalars['IPCPatent']['output']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']['output']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']['output']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']['output']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']['output']>;
  LCCSubclass: ResolverTypeWrapper<Scalars['LCCSubclass']['output']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']['output']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']['output']>;
  LocalDateTime: ResolverTypeWrapper<Scalars['LocalDateTime']['output']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']['output']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']['output']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']['output']>;
  Long: ResolverTypeWrapper<Scalars['Long']['output']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']['output']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']['output']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  Order: ResolverTypeWrapper<Order>;
  OrderInput: OrderInput;
  Pet: ResolverTypeWrapper<Pet>;
  PetInput: PetInput;
  PetUploadImageInput: PetUploadImageInput;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>;
  Port: ResolverTypeWrapper<Scalars['Port']['output']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']['output']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']['output']>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  Status: Status;
  Status2: Status2;
  Status3ListItem: Status3ListItem;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountNumber: Scalars['AccountNumber']['output'];
  ApiResponse: ApiResponse;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte: Scalars['Byte']['output'];
  Category: Category;
  CategoryInput: CategoryInput;
  CountryCode: Scalars['CountryCode']['output'];
  Cuid: Scalars['Cuid']['output'];
  Currency: Scalars['Currency']['output'];
  DID: Scalars['DID']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DeweyDecimal: Scalars['DeweyDecimal']['output'];
  Duration: Scalars['Duration']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  GUID: Scalars['GUID']['output'];
  HSL: Scalars['HSL']['output'];
  HSLA: Scalars['HSLA']['output'];
  HexColorCode: Scalars['HexColorCode']['output'];
  Hexadecimal: Scalars['Hexadecimal']['output'];
  IBAN: Scalars['IBAN']['output'];
  IP: Scalars['IP']['output'];
  IPCPatent: Scalars['IPCPatent']['output'];
  IPv4: Scalars['IPv4']['output'];
  IPv6: Scalars['IPv6']['output'];
  ISBN: Scalars['ISBN']['output'];
  ISO8601Duration: Scalars['ISO8601Duration']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  JWT: Scalars['JWT']['output'];
  LCCSubclass: Scalars['LCCSubclass']['output'];
  Latitude: Scalars['Latitude']['output'];
  LocalDate: Scalars['LocalDate']['output'];
  LocalDateTime: Scalars['LocalDateTime']['output'];
  LocalEndTime: Scalars['LocalEndTime']['output'];
  LocalTime: Scalars['LocalTime']['output'];
  Locale: Scalars['Locale']['output'];
  Long: Scalars['Long']['output'];
  Longitude: Scalars['Longitude']['output'];
  MAC: Scalars['MAC']['output'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat']['output'];
  NegativeInt: Scalars['NegativeInt']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeFloat: Scalars['NonNegativeFloat']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveFloat: Scalars['NonPositiveFloat']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  ObjectID: Scalars['ObjectID']['output'];
  Order: Order;
  OrderInput: OrderInput;
  Pet: Pet;
  PetInput: PetInput;
  PetUploadImageInput: PetUploadImageInput;
  PhoneNumber: Scalars['PhoneNumber']['output'];
  Port: Scalars['Port']['output'];
  PositiveFloat: Scalars['PositiveFloat']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Query: {};
  RGB: Scalars['RGB']['output'];
  RGBA: Scalars['RGBA']['output'];
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  Upload: Scalars['Upload']['output'];
  User: User;
  UserInput: UserInput;
  UtcOffset: Scalars['UtcOffset']['output'];
  Void: Scalars['Void']['output'];
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type ApiResponseResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ApiResponse'] = ResolversParentTypes['ApiResponse'],
> = {
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type CategoryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export interface DeweyDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DeweyDecimal'], any> {
  name: 'DeweyDecimal';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IpcPatentScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPCPatent'], any> {
  name: 'IPCPatent';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LccSubclassScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LCCSubclass'], any> {
  name: 'LCCSubclass';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDateTime'], any> {
  name: 'LocalDateTime';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  bakeCookie?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, Partial<MutationBakeCookieArgs>>;
  deletePet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeletePetArgs, 'petId'>>;
  deleteStoreOrder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteStoreOrderArgs, 'orderId'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'username'>>;
  postPet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPostPetArgs, 'requestBody'>>;
  postPetUploadImage?: Resolver<
    Maybe<ResolversTypes['ApiResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationPostPetUploadImageArgs, 'petId'>
  >;
  postStoreOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationPostStoreOrderArgs, 'requestBody'>>;
  postUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPostUserArgs, 'requestBody'>>;
  postUserCreateWithArray?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationPostUserCreateWithArrayArgs, 'requestBody'>
  >;
  postUserCreateWithList?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationPostUserCreateWithListArgs, 'requestBody'>
  >;
  putPet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPutPetArgs, 'requestBody'>>;
  putUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPutUserArgs, 'requestBody' | 'username'>>;
};

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OrderResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  petId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status2']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoUrls?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryPetArgs, 'petId'>>;
  petFindByStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QueryPetFindByStatusArgs, 'status'>>;
  petFindByTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QueryPetFindByTagsArgs, 'tags'>>;
  storeInventory?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  storeOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryStoreOrderArgs, 'orderId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'username'>>;
  userLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryUserLoginArgs, 'password' | 'username'>>;
  userLogout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = ContextValue> = {
  AccountNumber?: GraphQLScalarType;
  ApiResponse?: ApiResponseResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  Category?: CategoryResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  DeweyDecimal?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPCPatent?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  LCCSubclass?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalDateTime?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Order?: OrderResolvers<ContextType>;
  Pet?: PetResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};
