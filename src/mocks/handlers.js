// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers  = [
      rest.get('/tasklist', (req, res, ctx) => {
        const data = require("./data/taskList.json")
        return res(
          ctx.status(200),
          ctx.json(data),
        )
      }),
      rest.post('/tasklist', (req, res, ctx) => {
        const data = req.json()
        return res(
          ctx.status(200),
          ctx.json(data),
        )
      }),
      rest.get('/users', (req, res, ctx) => {
        const data = require("./data/users.json")
        return res(
          ctx.status(200),
          ctx.json(data),
        )
      })
]