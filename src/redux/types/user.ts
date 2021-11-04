const ACCESS_TOKEN = 'access_token';
const TOKEN_TYPE = 'token_type';
const EXPIRES_IN = 'expires_in';
const STATE = 'state';

export const ATTEMPT_LOGIN_RESPONSE = [
  ACCESS_TOKEN,
  TOKEN_TYPE,
  EXPIRES_IN,
  STATE,
];

const ERROR = 'error';

export interface AttemptLoginSuccess {
  [ACCESS_TOKEN]: string;
  [TOKEN_TYPE]: string;
  [EXPIRES_IN]: number;
  [STATE]: string;
}

export interface AttemptLoginFailure {
  [ERROR]: string;
  [STATE]?: string;
}

export interface ReadUserProfileSuccess {
  display_name: string;
  id: string;
}
