import { Model, model, Schema } from "mongoose";

interface Product {
    title: string,
    price: number,
}

let productSchema = new Schema<Product>({
    title: String,
    price: Number,
});


let ProductModel = model<Product , Model<Product>>("Product" , productSchema);

export default ProductModel;