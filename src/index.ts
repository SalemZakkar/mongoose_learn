import mongoose from "./db";
import UserModel from "./user-model";
import ProductModel from "./aggregation/product-model";
import BookingModel from "./aggregation/booking-model";
import PostModel from "./post-model";


mongoose.connect("mongodb://localhost:27017/mongooseLearning").then((v) => {
  console.log("Connected");
});

// seedDatabase();
// PostModel.aggregate([
//   { $project: { title: true, totalComments: { $size: "$comments" } } , },
//   {$sort: {totalComments: -1}}
// ]).then((e) => console.log(e));

// async function foo() {
//   let users = await UserModel.find();
//   await new PostModel({
//     title: "Title",
//     content: "Fuck Fuck",
//     author: users[0]?._id,
//   }).save();
// }

// foo();

async function get() {
  let post = await UserModel.find();
  console.log(post);
}

get();

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

// function getRandomName(): string {
//   const keys = ["Banana", "Title", "KKK", "Hello world", "Fuck Bashar Alassad"];
//   const index = Math.floor(Math.random() * keys.length);
//   return keys[index]!;
// }

// async function start() {
//   let products = await ProductModel.find();
//   let bookings = await BookingModel.find();
//   let users = await UserModel.find();

//   for (let i = 0; i < 20; i++) {
//     console.log(bookings[i]?.toJSON());
//   }
// }

// start();

// async function aggregate() {
//   // let res = await UserModel.aggregate([
//   //   {
//   //     $match : {
//   //       age: {
//   //         $gte: 18,
//   //       },
//   //     },
//   //   },
//   // ]);

//   let res = await BookingModel.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "userdata",
//       },
//     },
//     {
//       $lookup: {
//         from: "products",
//         localField: "products",
//         foreignField: "_id",
//         as: "productdata",
//       },
//     },
//     {
//       $unwind: "$userdata",
//     },
//     {
//       $unwind: "$productdata",
//     },
//     {
//       $group: {
//         _id: { userId: "$userdata._id", productId: "$productdata._id" },
//         user: { $first: "$userdata" },
//         product: {
//           $first: "$productdata",
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $group: {
//         _id: { userId: "$user._id" },
//         user: { $first: "$user" },
//         product: {
//           $push: "$product",
//         },
//         count: { $sum: "$count" },
//         total: { $sum: "$product.price" },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         user: 1,
//         product: 1,
//         count: 1,
//         total: 1,
//       },
//     },
//   ]);

//   console.log(JSON.stringify(res, null, 4));
// }