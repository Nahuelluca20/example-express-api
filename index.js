const express = require("express")
const routerApi = require("./routes")
const cors = require("cors")

const { errorHandler, logErrors, BoomErrorHandler} = require("./middlewares/error.handler")

const app = express()
const port = 3000

app.use(express.json())
const whitelist = ["http://localhost:8000", "https://nahuelluca.me"]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("no permitido"))
    }
  }
}
app.use(cors(options))

routerApi(app)

app.get("/", (req, res) => {
  res.send("hola mi server ")
})

app.get("/newroute", (req, res) => {
  res.send("nueba runa")
})

app.use(logErrors)
app.use(BoomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log("ejecutando en puerto ", port)
})



