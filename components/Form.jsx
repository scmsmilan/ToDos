import Link from "next/link";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar, IconName } from "react-icons/fc";
import moment from "moment";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span> Task
      </h1>
      <p className="desc text-left max-w-md"></p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your task
          </span>
          <textarea
            value={post.task}
            onChange={(e) => setPost({ ...post, task: e.target.value })}
            placeholder="Add your task here..."
            required
            className="form_textarea"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Scheduled For
          </span>

          <DatePicker
            selected={post.do_at}
            onChange={(date) => {
              setPost({ ...post, do_at: date });
            }}
            className="date_time"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            showIcon
            icon=<FcCalendar className="mt-2 p-3" />
          />
          {console.log(post.do_at)}
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
