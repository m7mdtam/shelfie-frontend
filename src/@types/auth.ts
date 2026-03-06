export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: PayloadUser
  exp: number
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface RegisterResponse {
  doc: PayloadUser
  message: string
}

export interface RefreshTokenResponse {
  refreshedToken: string
  exp: number
  message: string
}

export interface GetMeResponse {
  user: PayloadUser
}

export interface LogoutResponse {
  message: string
}

export interface PayloadUser {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt?: string
  _verified?: boolean
  avatar?: {
    id: string
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
    sizes?: Array<{
      size?: string
      filename: string
      width: number
      height: number
      mimeType: string
      filesize: number
    }>
  }
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface VerifyEmailResponse {
  message: string
}

export interface DecodedToken {
  id: string
  email: string
  exp: number
  iat: number
}
