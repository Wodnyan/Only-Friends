import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type InsertPostInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  logout: Scalars['Boolean'];
  register: User;
  deletePost: Scalars['Boolean'];
  createPost?: Maybe<Post>;
  follow: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  user: LoginUserInput;
};


export type MutationRegisterArgs = {
  user: RegisterUserInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  post: InsertPostInput;
};


export type MutationFollowArgs = {
  followingId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  followingId: Scalars['String'];
};

export type OptionsInput = {
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  users: Array<User>;
  user?: Maybe<User>;
  followers: Array<User>;
  following: Array<User>;
};


export type QueryPostsArgs = {
  userId?: Maybe<Scalars['String']>;
  options?: Maybe<OptionsInput>;
  following?: Maybe<Scalars['Boolean']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  options?: Maybe<OptionsInput>;
  username?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type RegisterUserInput = {
  username: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  isActive: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  posts: Array<Post>;
  following: Array<User>;
};

export type AuthUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'fullName' | 'email' | 'createdAt' | 'updatedAt' | 'isActive' | 'avatar'>
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & AuthUserFragment
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & AuthUserFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & AuthUserFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & AuthUserFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
  options?: Maybe<OptionsInput>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & AuthUserFragment
    ) }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & AuthUserFragment
  )> }
);

export type UsersQueryVariables = Exact<{
  username: Scalars['String'];
  options?: Maybe<OptionsInput>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & AuthUserFragment
  )> }
);

export const AuthUserFragmentDoc = gql`
    fragment authUser on User {
  id
  username
  fullName
  email
  createdAt
  updatedAt
  isActive
  avatar
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $description: String!) {
  createPost(post: {title: $title, description: $description}) {
    id
    title
    description
    createdAt
    updatedAt
    user {
      ...authUser
    }
  }
}
    ${AuthUserFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(user: {username: $username, password: $password}) {
    ...authUser
  }
}
    ${AuthUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $fullName: String!, $password: String!, $email: String!) {
  register(
    user: {fullName: $fullName, username: $username, email: $email, password: $password}
  ) {
    ...authUser
  }
}
    ${AuthUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...authUser
  }
}
    ${AuthUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($userId: String, $options: OptionsInput) {
  posts(userId: $userId, options: $options) {
    id
    title
    description
    createdAt
    updatedAt
    user {
      ...authUser
    }
  }
}
    ${AuthUserFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...authUser
  }
}
    ${AuthUserFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UsersDocument = gql`
    query Users($username: String!, $options: OptionsInput) {
  users(username: $username, options: $options) {
    ...authUser
  }
}
    ${AuthUserFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};