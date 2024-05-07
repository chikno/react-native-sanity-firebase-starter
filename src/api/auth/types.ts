export type AuthStatus = {
  success: boolean;
  err: {
    message: string;
  };
  user: CurrentUser;
  _tokenResponse: {
    idToken: string;
    refreshToken: string;
  };
};

export type CurrentUser = {
  uid: string;
  _redirectEventId: string | undefined;
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string | undefined;
  photoURL: string | undefined;
  providerData: [];
  stsTokenManager: {
    accessToken: string;
    refreshToken: string;
    uid: string;
  };
};
