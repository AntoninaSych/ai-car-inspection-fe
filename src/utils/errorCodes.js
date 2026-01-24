export const INTERNAL_CODE_MAP = {
  UNPAID_TASK_LIMIT_REACHED: 'errors.internal.unpaidLimitReached',
  TOO_MANY_REQUESTS: 'errors.internal.tooManyRequests',

  // Authentication & Authorization
  AUTH_NOT_AUTHORIZED: 'errors.internal.authNotAuthorized',
  AUTH_INVALID_TOKEN: 'errors.internal.authInvalidToken',
  AUTH_OUTDATED_TOKEN: 'errors.internal.authOutdatedToken',
  AUTH_EMAIL_OR_PASSWORD_WRONG: 'errors.internal.authEmailOrPasswordWrong',
  AUTH_EMAIL_IN_USE: 'errors.internal.authEmailInUse',
  AUTH_TOKEN_EXPIRED: 'errors.internal.authTokenExpired',
  AUTH_TOKEN_INVALID: 'errors.internal.authTokenInvalid',
  AUTH_TOKEN_USED: 'errors.internal.authTokenUsed',
  AUTH_EMAIL_NOT_VERIFIED: 'errors.internal.authEmailNotVerified',
  AUTH_EMAIL_ALREADY_VERIFIED: 'errors.internal.authEmailAlreadyVerified',

  // Validation
  VALIDATION_FAILED: 'errors.internal.validationFailed',
  VALIDATION_INVALID_INPUT: 'errors.internal.validationInvalidInput',
  VALIDATION_REQUIRED_FIELD: 'errors.internal.validationRequiredField',
  VALIDATION_INVALID_YEAR: 'errors.internal.validationInvalidYear',
  VALIDATION_YEAR_OUT_OF_RANGE: 'errors.internal.validationYearOutOfRange',
  VALIDATION_INVALID_AMOUNT: 'errors.internal.validationInvalidAmount',

  // Resource
  RESOURCE_NOT_FOUND: 'errors.internal.resourceNotFound',
  RESOURCE_BRAND_NOT_FOUND: 'errors.internal.resourceBrandNotFound',
  RESOURCE_MODEL_NOT_FOUND: 'errors.internal.resourceModelNotFound',
  RESOURCE_TASK_NOT_FOUND: 'errors.internal.resourceTaskNotFound',
  RESOURCE_REPORT_NOT_FOUND: 'errors.internal.resourceReportNotFound',
  RESOURCE_USER_NOT_FOUND: 'errors.internal.resourceUserNotFound',
  RESOURCE_IMAGE_NOT_FOUND: 'errors.internal.resourceImageNotFound',
  RESOURCE_SESSION_NOT_FOUND: 'errors.internal.resourceSessionNotFound',
  RESOURCE_ACCESS_DENIED: 'errors.internal.resourceAccessDenied',

  // Task
  TASK_CREATION_FAILED: 'errors.internal.taskCreationFailed',
  TASK_PROCESSING_FAILED: 'errors.internal.taskProcessingFailed',
  TASK_IMAGES_REQUIRED: 'errors.internal.taskImagesRequired',
  TASK_ALREADY_PAID: 'errors.internal.taskAlreadyPaid',
  TASK_NOT_PAID: 'errors.internal.taskNotPaid',
  TASK_ANALYSIS_FAILED: 'errors.internal.taskAnalysisFailed',

  // Payment
  PAYMENT_STRIPE_NOT_CONFIGURED: 'errors.internal.paymentStripeNotConfigured',
  PAYMENT_WEBHOOK_FAILED: 'errors.internal.paymentWebhookFailed',
  PAYMENT_SESSION_CREATION_FAILED: 'errors.internal.paymentSessionCreationFailed',
  PAYMENT_INVALID_CURRENCY: 'errors.internal.paymentInvalidCurrency',

  // User
  USER_UPDATE_FAILED: 'errors.internal.userUpdateFailed',
  USER_AVATAR_UPLOAD_FAILED: 'errors.internal.userAvatarUploadFailed',

  // Email
  EMAIL_SEND_FAILED: 'errors.internal.emailSendFailed',
  EMAIL_VERIFICATION_FAILED: 'errors.internal.emailVerificationFailed',

  // Rate limit
  RATE_LIMIT_EXCEEDED: 'errors.internal.rateLimitExceeded',
  RATE_LIMIT_PASSWORD_RESET: 'errors.internal.rateLimitPasswordReset',
  RATE_LIMIT_TASK_RETRY: 'errors.internal.rateLimitTaskRetry',
  RATE_LIMIT_EMAIL_VERIFICATION: 'errors.internal.rateLimitEmailVerification',

  // Server
  SERVER_ERROR: 'errors.internal.serverError',
  SERVER_DATABASE_ERROR: 'errors.internal.serverDatabaseError',
  SERVER_EXTERNAL_API_ERROR: 'errors.internal.serverExternalApiError',
};
