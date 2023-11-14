import { connectToDB } from "@utils/database";
import Task from "@models/task";
export const POST = async (req) => {
  const { userId, task, do_at } = await req.json();
  try {
    await connectToDB();
    const newTask = new Task({
      creator: userId,
      task,
      do_at,
    });
    await newTask.save();
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response("Failed to add task", { status: 500 });
  }
};
