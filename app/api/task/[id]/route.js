import { connectToDB } from "@utils/database";
import Task from "@models/task";
//two methods used for params context and params object
export const GET = async (req, context) => {
  const { params } = context;

  try {
    await connectToDB();
    const task = await Task.findById(params.id);
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to retrieve task", { status: 500 });
  }
};
//update
export const PATCH = async (req, { params }) => {
  //The parameter expected is the task id and not the creator as in GET
  const { userId, task, do_at } = await req.json();
  console.log(params.id);
  try {
    await connectToDB();
    const existingTask = await Task.findById(params.id);
    if (!existingTask) return new Response("Task not found", { status: 404 });

    existingTask.task = task;
    existingTask.do_at = do_at;
    await existingTask.save();

    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update task", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  //The parameter expected is the task id and not the creator as in GET
  try {
    await connectToDB();
    await Task.findByIdAndDelete(params.id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete task", { status: 500 });
  }
};
