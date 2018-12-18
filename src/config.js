/**
 * Defines the API route we are using.
 */
let apiUrl = ''
let appUrl = ''
let tencentMapsJsApiKey = 'IHQBZ-ABORU-5RSVR-BZMAU-64DY7-IOBOK'

switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = 'http://roast.com/api/v1'
    appUrl = 'http://roast.com'
    break
  case 'production':
    apiUrl = 'http://roast.demo.laravelacademy.org/api/v1'
    appUrl = 'http://roast.demo.laravelacademy.org'
    break
}

export const FLY_CONFIG = {
  API_URL: apiUrl,
  TENCENT_MAPS_JS_API_KEY: tencentMapsJsApiKey,
  APP_URL: appUrl
}
