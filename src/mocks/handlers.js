// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers  = [
  // TODO: パスを環境によって切り替えられるように
    rest.post('/login', (req, res, ctx) => {
        // Persist user's authentication in the session
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
          // Respond with a 200 status code
          ctx.status(200),
        )
      }),
      rest.get('/users', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        // const isAuthenticated = sessionStorage.getItem('is-authenticated')
        // if (!isAuthenticated) {
        //   // If not authenticated, respond with a 403 error
        //   return res(
        //     ctx.status(403),
        //     ctx.json({
        //       errorMessage: 'Not authorized',
        //     }),
        //   )
        // }
        // If authenticated, return a mocked user details
        const data = require("./data/users.json")
        return res(
          ctx.status(200),
          ctx.json(data),
        )
      })
]