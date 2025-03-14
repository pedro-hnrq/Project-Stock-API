const express = require("express")
const database = require("./src/db/database")
const user = require("./src/model/user")

const userRouter = require("./src/routes/user")
const organizationRouter = require("./src/routes/organization")
const InventoryRouter = require("./src/routes/inventory")
const InventoryMovementRouter = require("./src/routes/inventoryMovement")
const productRouter = require("./src/routes/product")
const apiLogin = require("./src/controllers/user")

const port = 3000
const app = express()


app.use(express.json())

app.use('/api/v1/login', apiLogin.Login)

app.use('/api/v1/organization',organizationRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/inventory',InventoryRouter)
app.use('/api/v1/inventoryMovement',InventoryMovementRouter)
app.use('/api/v1/product',productRouter)

database.db
    .sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((e) => {
        console.err(`Err connecting to database ${e}`)
    })