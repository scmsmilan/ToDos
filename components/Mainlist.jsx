"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskCard from "./TaskCard";
import User from "@models/user";

const TaskCardList = ({ data, setTasks, searchText }) => {
  const filtTasks =
    searchText.length > 2
      ? data.filter(
          (s) => s.task.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        )
      : data;

  const handleEdit = (task) => {
    router.push(`/edit-task?id=${task._id}`);
  };
  const handleDelete = async (task) => {
    const okToDelete = confirm("Are you sure you want to delete this task?");
    if (okToDelete) {
      try {
        const response = await fetch(`api/task/${task._id.toString()}`, {
          method: "DELETE",
        });
        const filteredTasks = data.filter((t) => t._id !== task._id);
        setTasks(filteredTasks);
      } catch (error) {
        console.log("Error in deletion.");
      }
    }
  };
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col">
      {filtTasks.map((tsk) => (
        <TaskCard
          key={tsk._id}
          task={tsk}
          handleEdit={() => {
            handleEdit && handleEdit(tsk);
          }}
          handleDelete={() => {
            handleDelete && handleDelete(tsk);
          }}
        />
      ))}
    </div>
  );
};
const Mainlist = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const handleInputChange = (e) => {};
  useEffect(() => {
    const fetchTasks = async () => {
      if (!session?.user.name) return;
      const urlpath = `api/usertasks/${session?.user.id}`;

      const response = await fetch(urlpath);

      const data = await response.json();

      setTasks(data);
    };
    fetchTasks();
  }, [session]);

  return (
    <section className="w-full mt-5">
      {session?.user.name ? (
        <div>
          <form className="relative w-full flex-center">
            <input
              id="searchtext"
              placeholder="Search for tasks"
              className="search_input peer"
              onInput={handleInputChange}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </form>
          <div className="mt-5 text-center font-bold">
            List Of Scheduled Tasks
          </div>
          <TaskCardList
            data={tasks}
            setTasks={setTasks}
            searchText={searchText}
          />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Mainlist;
