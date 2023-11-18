import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class CustomTokenCache implements TokenCache {
  tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(tokenStore: TokenStore): void {
    this.tokenStore = tokenStore;
  }

  get(): TokenStore {
    return this.tokenStore;
  }
}
