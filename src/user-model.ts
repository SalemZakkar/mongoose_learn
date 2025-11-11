import { extend } from "lodash";
import mongoose, { Model, Query } from "mongoose";

export interface User {
  name: string;
  age: number;
  password: string;
  email: string;
}

interface IUserInstaceMethods {
  isAdult(): boolean;
}

type IUserDocument = User & Document & IUserInstaceMethods;

interface IUserQueryHelpers {
  getAdults(): Query<any, IUserDocument>;
}

// dto - Queries - Instance Method
interface IUserStaticsInterface
  extends Model<User, IUserQueryHelpers, IUserInstaceMethods> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

let userSchema = new mongoose.Schema<
  User,
  IUserStaticsInterface,
  IUserInstaceMethods,
  IUserQueryHelpers
>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
},
{
  toJSON: {virtuals: true,},
  toObject: {virtuals: true}
});

userSchema.methods.isAdult = function () {
  return this.age > 18;
};

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email });
};

userSchema.query.getAdults = function (this: Query<any, IUserDocument>) {
  return this.where("age").gte(18);
};

userSchema.virtual("isOld").get(function () {
  return this.age > 30;
});

const UserModel = mongoose.model<
  User,
  IUserStaticsInterface,
  IUserQueryHelpers
>("User", userSchema);

export default UserModel;
