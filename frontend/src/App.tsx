import React, { useState } from "react";

const App: React.FC = () => {
  const [task, setTask] = useState("");
  
  const handleSubmit = (e:any) => {
    e.preventDefault()

    if(task === ""){
      return
    }
    console.log("task", task)
    // add task
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-200 relative">
      <div className="">
        {/* title */}
        <h1 className="text-5xl mt-20 font-semibold">Task Manager</h1>

        {/* input */}
        <form onSubmit={handleSubmit}>
          <input
            className="mx-auto lg:w-3/4 absolute bottom-5 right-5 left-5  p-4 px-8 outline-none rounded-lg"
            type="text"
            placeholder="Add new task"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
