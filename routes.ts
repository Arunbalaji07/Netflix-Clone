
/**
 * AN ARRAY OF ROUTES THAT ARE ACCESSIBLE TO THE PUBLIC.
 * THESE ROUTES DO NOT REQUIRE AUTHENTICATION
 * @type {string[]}
 * */
// export const publicRoute = [
//     "/",
// ]

/**
 * AN ARRAY OF ROUTES THAT ARE USED FOR AUTHENTICATION.
 * THESE ROUTES WILL REDIRECT LOGGED-IN USERS TO /settings.
 * @type {string[]}
 * */
export const authRoutes = [
    "/auth",
]

/**
 * THE PREFIX FOR API AUTHENTICATION ROUTES.
 * ROUTES THAT STARTS WITH THIS PREFIX ARE USED FOR API AUTHENTICATION PURPOSES.
 * @type {string[]}
 * */

export const apiAuthPrefix = [
    "/api/auth",
    "/api/current",
    "/api/movies",
    "/api/random",
    "/api/favorites",
    "/api/favorite"
]

/**
 * THE DEFAULT REDIRECT PATH AFTER LOGGING-IN.
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT="/profiles"

export const protectedRoutes = [
    "/",
    "/watch"
]
