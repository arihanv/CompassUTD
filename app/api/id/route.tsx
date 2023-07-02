import { NextResponse, NextRequest } from "next/server";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://compass-utd.gc5s9o8.mongodb.net/?retryWrites=true&w=majority";

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
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
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
