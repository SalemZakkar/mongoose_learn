import mongoose, { Model, model, Schema } from "mongoose";
import { User } from "./user-model";

interface IPost {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | User;
  comments: [
    {
      content: string;
      createdAt: Date | null;
      author: mongoose.Types.ObjectId | User;
    }
  ];
}

interface IpostInstanceMethods {
  addComment: (user: mongoose.Types.ObjectId, content: string) => void;
}

let postSchema = new Schema<IPost, {}, IpostInstanceMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        content: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        author: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  console.log("Saving Post");
  next();
});
postSchema.methods.addComment = function (
  user: mongoose.Types.ObjectId,
  content: string
) {
  this.comments.push({
    content: content,
    author: user,
    createdAt: null,
  });
};

postSchema.pre("find", function (next) {
  this.populate(["author", "comments.author"]);
  next();
});

let PostModel = model<IPost, Model<IPost, {}, IpostInstanceMethods>>(
  "Post",
  postSchema
);

export default PostModel;
