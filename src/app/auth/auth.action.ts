import { Action } from '@ngrx/store';
export const AUTHORIZED = "[AUTH] Authorized user";
export const UNAUTHORIZED = "[AUTH] Unauthorized user";

export class AuthorizedUser implements Action {
    readonly type = AUTHORIZED;
}

export class UnauthorizedUser implements Action {
    readonly type = UNAUTHORIZED;
}
export type AuthAction = AuthorizedUser | UnauthorizedUser;