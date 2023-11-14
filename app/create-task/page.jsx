"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment/moment";

import Form from "@components/Form";
const CreateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    task: "",
    do_at: new Date(),
  });
  const createTask = async (e) => {
    e.preventDefault();
    // var offset = new Date().getTimezoneOffset();
    // console.log(offset);
    // console.log(post.do_at);
    if (post.do_at < Date.now()) {
      alert("Should be a date/time in future");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("api/task/new", {
        method: "POST",
        body: JSON.stringify({
          task: post.task,
          do_at: moment(post.do_at),
          userId: session?.user.id,
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
      type="Add"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
