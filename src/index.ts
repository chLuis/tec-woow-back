import express from "express";
import cors from "cors";
import routesProducts from '@/modules/products/products.routes.js';
import routesSuppliers from '@/modules/suppliers/suppliers.routes.js';
import routesAuth from '@/modules/auth/auth.routes.js';
import { errorHandler } from "@/middleware/app-error.js";
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
