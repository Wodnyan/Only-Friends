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


export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  fullName?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  author: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post: Post;
  hello: Scalars['String'];
  users: Array<User>;
  user?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryPostsArgs = {
  offset?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
  authorId?: Maybe<Scalars['Float']>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  validationErrors?: Maybe<Array<ValidationError>>;
  user?: Maybe<User>;
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, validationErrors?: Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'field' | 'message'>
    )>> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($username: String!, $fullName: String!, $password: String!, $email: String!) {
  register(
    fullName: $fullName
    username: $username
    email: $email
    password: $password
  ) {
    user {
      id
      username
    }
    validationErrors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};