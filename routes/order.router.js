const express = require("express")

const OrderService = require("./../services/order.service")
const validatorHandler = require("./../middlewares/validator.handler")
const { createOrderSchema, getOrderSchema } = require("./../schemas/order.schema")

const router = express.Router()
const service = new OrderService()

router.get(`/:id`,
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  })

  router.post("/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  })


module.exports = router
