import mongoose from "mongoose";
import UserModel from "./user-model";
import PostModel from "./post-model";
import { add } from "lodash";

mongoose.connect("mongodb://localhost:27017/mongooseLearning").then((v) => {
  console.log("Connected");
});

// async function foo() {
//   let users = await UserModel.find();
//   await new PostModel({
//     title: "Title",
//     content: "Fuck Fuck",
//     author: users[0]?._id,
//   }).save();
// }

// foo();

// async function get() {
//   let post = await PostModel.find();
//   console.log(post);
// }

// get();

// async function addComment() {
//   let post = await PostModel.findOne();
//   let user = await UserModel.findOne();
//   post?.addComment(user!._id , "Comment test test test");
//   post?.save();
// }

// addComment();

// async function editPost() {
// let x = await PostModel.findByIdAndUpdate("6913be0c23ce3a71b37f3de2" , {
//   $set : {
//     title: "Edited Titlkkke"
//   }
// });

// console.log(x);
// }

// editPost();
// async function deletePost() {
//   await PostModel.findByIdAndDelete("6913be0c23ce3a71b37f3de2");
// }

// deletePost();