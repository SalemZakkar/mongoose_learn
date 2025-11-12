import mongoose, { Model, model, Schema } from "mongoose";
import { User } from "../user-model";

interface Booking {
  user: mongoose.Types.ObjectId | User;
  products: Array<string>;
  createdAt: Date | null | undefined;
}

let schema = new Schema<Booking>({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
},{
    timestamps: true,
});

schema.pre(["find" , "findOne"] , function(next) {
    this.populate(["user" , "products"]);
    next();
    
});

let BookingModel = model<Booking, Model<Booking>>("Booking", schema);

export default BookingModel;
