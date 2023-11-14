import React from "react";
import moment from "moment";
import {
  FcDeleteColumn,
  FcEditImage,
  FcRemoveImage,
  IconName,
} from "react-icons/fc";
const TaskCard = ({ task, handleEdit, handleDelete }) => {
  return (
    <div className="w-full flex flex-1 flex-row mb-2 border-2 border-cyan-500 rounded">
      <div className="flex flex-col w-3/4 px-20 py-2">
        <div className="flex-1 flex justify-start items-center gap-1 cursor-pointer">
          <p className="font-satoshitext-gray-700 text-3xl ">{task.task}</p>
        </div>
        <div className="flex-1 flex justify-start items-center gap-1 cursor-pointer">
          <p className="font-satoshi text-sm text-gray-700 ">
            {moment(task.do_at).format("LLLL")}
          </p>
        </div>
      </div>
      <div className="mt-5 flex-center gap-4 pt-3">
        <p
          className="font-inter text-sm green_gradient cursor-pointer flex flex-row font-bold"
          onClick={handleEdit}
        >
          <FcEditImage className="pt-1" size={25} />
          <span className="pt-1">Edit </span>
        </p>
        <p
          className="font-inter text-sm orange_gradient cursor-pointer flex flex-row font-bold"
          onClick={handleDelete}
        >
          <FcRemoveImage className="pt-1" size={25} />
          <span className="pt-1">Delete</span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
