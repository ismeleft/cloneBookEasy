import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("請在 .env 文件中添加 MONGODB_URI 環境變量");
}

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // 在開發環境中使用全局變量來避免重複連接
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 在生產環境中創建新的連接
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
