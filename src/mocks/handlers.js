// src/mocks/handlers.js
import { rest } from 'msw'
import { cloneDeep } from 'lodash'

export const handlers  = [
      rest.get('/tasklist', (req, res, ctx) => {
        const data = require("./data/taskList.json")
        return res(
          ctx.status(200),
          ctx.json(data),
        )
      }),
      rest.post('/tasklist', async (req, res, ctx) => {
        const data = require("./data/taskList.json")
        const test = await req.json()
        const resData = cloneDeep(data)
        resData.task.push(test)
        return res(
          ctx.status(200),
          ctx.json(resData),
        )
      }),
      rest.put('/tasklist', async(req, res, ctx) => {
        const reqData = await req.json()
        return res(
          ctx.status(200),
          ctx.json(reqData),
        )
      }),
      rest.delete('/tasklist', (req, res, ctx) => {
        return res(
          ctx.status(200),
        )
      }),
]