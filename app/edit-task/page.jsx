"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
const EditTask = () => {
  const router = useRouter();

  const searchParams = useSearchParams(); //this helps to go with ? in query parameters

  const taskId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    task: "",
    do_at: null,
  });
  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`api/task/${taskId}`);
      const data = await response.json();

      setPost({
        task: data?.task,
        do_at: new Date(data.do_at),
      });
    };
    if (taskId) getTaskDetails();
  }, [taskId]);

  const editTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!taskId) return alert("Task not found!");
    try {
      const response = await fetch(`api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: post.task,
          do_at: post.do_at,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editTask}
    />
  );
};

export default EditTask;
