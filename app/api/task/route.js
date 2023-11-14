import { connectToDB } from "@utils/database";
import Task from "@models/task";
export const GET = async (req) => {
  try {
    await connectToDB();
    const tasks = await Task.find({});

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to retrieve tasks", { status: 500 });
  }
  return;
};
