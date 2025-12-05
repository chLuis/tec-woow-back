import express from "express";
import cors from "cors";
import routesProducts from '../src/modules/products/products.routes'
import routesSuppliers from '../src/modules/suppliers/suppliers.routes'
import routesAuth from '../src/modules/auth/auth.routes'
import { errorHandler } from "./middleware/app-error";
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando");
});

const port = process.env.PORT || 8080;


app.use('/api/products', routesProducts)
app.use('/api/suppliers', routesSuppliers)
app.use('/api/auth', routesAuth)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} !!`);
});
