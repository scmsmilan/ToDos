import { connectToDB } from "@utils/database";
import Task from "@models/task";
//two methods used for params context and params object
export const GET = async (req, context) => {
  const { params } = context;

  try {
    await connectToDB();
    const tasks = await Task.find({ creator: params.id })
      .sort({ do_at: "ascending" })
      .exec();

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to retrieve tasks", { status: 500 });
  }
};
