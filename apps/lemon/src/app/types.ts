import firebase from 'firebase/compat';

export type Children = {
  children?: JSX.Element | boolean | null;
};

export type isLoading = {
  isLoading: boolean;
};

export type Api<T> = {
  isLoading: boolean;
  data?: T;
  error: string;
  request: (requestHandler: Function) => void;
};

export type LazyApi<T> = Omit<Api<T>, 'request'> & {
  load: (options?: any) => void;
};

export type Post = {
  _id: string;
  text: string;
  createdBy: UserRecord;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserRecord = {
  /**
   * The user's `uid`.
   */
  readonly uid: string;
  /**
   * The user's primary email, if set.
   */
  readonly email?: string;
  /**
   * Whether or not the user's primary email is verified.
   */
  readonly emailVerified: boolean;
  /**
   * The user's display name.
   */
  readonly displayName?: string;
  /**
   * The user's photo URL.
   */
  readonly photoURL?: string;
  /**
   * The user's primary phone number, if set.
   */
  readonly phoneNumber?: string;
  /**
   * Whether or not the user is disabled: `true` for disabled; `false` for
   * enabled.
   */
  readonly disabled: boolean;
  /**
   * Additional metadata about the user.
   */
  readonly metadata: firebase.auth.UserMetadata;
  /**
   * An array of providers (for example, Google, Facebook) linked to the user.
   */
  readonly providerData: firebase.UserInfo[];
  /**
   * The date the user's tokens are valid after, formatted as a UTC string.
   * This is updated every time the user's refresh token are revoked either
   * from the {@link BaseAuth.revokeRefreshTokens}
   * API or from the Firebase Auth backend on big account changes (password
   * resets, password or email updates, etc).
   */
  readonly tokensValidAfterTime?: string;
};
