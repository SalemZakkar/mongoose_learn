import mongoose from "mongoose";
import UserModel from "./user-model";
import PostModel from "./post-model";

// Simple random helper
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Dummy name/email generator
const randomName = () => `User${Math.floor(Math.random() * 1000)}`;
const randomEmail = () => `user${Math.floor(Math.random() * 1000)}@mail.com`;
const randomContent = () =>
  ["Hello world", "My first post", "Random thoughts", "Lorem Ipsum", "Another comment"][
    getRandomInt(0, 4)
  ];

// Seed function
export const seedDatabase = async () => {
  // 1️⃣ Clear existing data
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});

  // 2️⃣ Create 10 users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new UserModel({
      name: randomName(),
      age: getRandomInt(18, 50),
      password: "password123",
      email: randomEmail(),
    });
    await user.save();
    users.push(user);
  }

  // 3️⃣ Create 10 posts
  const posts = [];
  for (let i = 0; i < 10; i++) {
    const author = users[getRandomInt(0, users.length - 1)];
    const post = new PostModel({
      title: `Post ${i + 1}`,
      content: randomContent(),
      author: author?._id,
    });

    // 4️⃣ Add random comments (1–5 per post)
    const numComments = getRandomInt(1, 5);
    for (let j = 0; j < numComments; j++) {
      const commentAuthor = users[getRandomInt(0, users.length - 1)];
      post.addComment(new mongoose.Types.ObjectId(commentAuthor!._id), 'conteny');
    }

    await post.save();
    posts.push(post);
  }

  console.log("Seeding completed!");
  console.log(`${users.length} users created`);
  console.log(`${posts.length} posts created`);
};

