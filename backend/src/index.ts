import express, { json, urlencoded } from "express"
import productsRoutes from "./routes/products/index"

const app = express()
const port = 3000

// Middleware to parse incoming JSON requests
app.use(json())
app.use(urlencoded({extended:false}))

//Products api
app.use("/products",productsRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
   