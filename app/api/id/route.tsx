import { NextResponse, NextRequest } from "next/server";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =""
  // "mongodb+srv://admin:Nx953vDh6wVms8Ih@compass-utd.gc5s9o8.mongodb.net/?retryWrites=true&w=majority";

export async function POST(req: NextRequest) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("Compass-UTD").command({ ping: 1 });

      const db = client.db("history");
      const collectionName = "Chat History";
      const collection = db.collection(collectionName);

      // JSON data
      const jsonData = {
        userId: "123",
        userMessage: "Hello!",
        botMessage: "Hi, how can I assist you?",
      };

      // Insert the JSON data into the collection
      await collection.insertOne(jsonData);
      console.log("Data inserted successfully!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  const body = await req.json();
  console.log(body.id);
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  return NextResponse.json({ error: userId }, { status: 200 });
}
