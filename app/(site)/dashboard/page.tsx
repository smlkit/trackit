"use client";

import React from "react";

import useGetTasks from "@/hooks/useGetTasks";
import TaskCard from "@/components/TaskCard";

export const revalidate = 0;

const Dashboard = () => {
  const { tasks } = useGetTasks();

  return (
    <div className="w-full">
      <h1 className="header-1">Dashboard</h1>
      <p className="p pb-8">Mange your project tasks.</p>
      <div className="w-fit grid grid-cols-3 gap-5">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default Dashboard;
