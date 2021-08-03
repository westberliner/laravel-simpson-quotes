declare module "@codegen-types" {
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  token: Scalars['String'];
  token_type: Scalars['String'];
};



export type Mutation = {
  __typename?: 'Mutation';
  login: AccessToken;
  logout?: Maybe<User>;
  createUser: User;
  updateUser: User;
  deleteUser: User;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  me?: Maybe<User>;
  users?: Maybe<UserPaginator>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of User items. */
  data: Array<User>;
};

export type AuthUserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email'>
);

export type AccessTokenFragment = (
  { __typename?: 'AccessToken' }
  & Pick<AccessToken, 'token' | 'token_type'>
);

export type GetAuthorizedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorizedUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & AuthUserFieldsFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AccessToken' }
    & AccessTokenFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'User' }
    & AuthUserFieldsFragment
  )> }
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'updated_at' | 'created_at'>
);

export type PaginatorFieldsFragment = (
  { __typename?: 'PaginatorInfo' }
  & Pick<PaginatorInfo, 'total' | 'currentPage' | 'perPage'>
);

export type GetUsersQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<(
    { __typename?: 'UserPaginator' }
    & { paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & PaginatorFieldsFragment
    ), data: Array<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )> }
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

}