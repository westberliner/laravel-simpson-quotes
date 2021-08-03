declare module "*/Auth.gql" {
  import { TypedDocumentNode } from "apollo-typed-documents";
  import { GetAuthorizedUserQuery, GetAuthorizedUserQueryVariables } from "@codegen-types";
  export const getAuthorizedUser: TypedDocumentNode<GetAuthorizedUserQueryVariables, GetAuthorizedUserQuery>;
  import { LoginMutation, LoginMutationVariables } from "@codegen-types";
  export const login: TypedDocumentNode<LoginMutationVariables, LoginMutation>;
  import { LogoutMutation, LogoutMutationVariables } from "@codegen-types";
  export const logout: TypedDocumentNode<LogoutMutationVariables, LogoutMutation>;
}

declare module "*/User.gql" {
  import { TypedDocumentNode } from "apollo-typed-documents";
  import { GetUsersQuery, GetUsersQueryVariables } from "@codegen-types";
  export const getUsers: TypedDocumentNode<GetUsersQueryVariables, GetUsersQuery>;
  import { GetUserQuery, GetUserQueryVariables } from "@codegen-types";
  export const getUser: TypedDocumentNode<GetUserQueryVariables, GetUserQuery>;
  import { CreateUserMutation, CreateUserMutationVariables } from "@codegen-types";
  export const createUser: TypedDocumentNode<CreateUserMutationVariables, CreateUserMutation>;
  import { UpdateUserMutation, UpdateUserMutationVariables } from "@codegen-types";
  export const updateUser: TypedDocumentNode<UpdateUserMutationVariables, UpdateUserMutation>;
  import { DeleteUserMutation, DeleteUserMutationVariables } from "@codegen-types";
  export const deleteUser: TypedDocumentNode<DeleteUserMutationVariables, DeleteUserMutation>;
}