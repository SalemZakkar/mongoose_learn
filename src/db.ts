import mongoose, { Schema, SchemaTypeOptions } from "mongoose";

function plugin(schema: mongoose.Schema) {
  console.log("Plugonm");
  schema.pre("find", function (next) {
    console.log("finding");
    next();
  });
  
}

mongoose.plugin(plugin);

export default mongoose;