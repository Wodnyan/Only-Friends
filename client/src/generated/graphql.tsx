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
  register: User;
  deletePost: Scalars['Boolean'];
  createPost?: Maybe<Post>;
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
  post: Post;
};


export type QueryPostArgs = {
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

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


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
    query Posts {
  posts {
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