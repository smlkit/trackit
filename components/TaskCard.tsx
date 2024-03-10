import React from "react";

import { Task } from "@/types";
import { formatDate } from "@/shared/formatDate";
import { HiOutlineCalendarDays as DateIcon } from "react-icons/hi2";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  let statusColor;

  switch (task.status) {
    case "done":
      statusColor = "bg-status-green";
      break;
    case "blocked":
      statusColor = "bg-status-red";
      break;
    case "in process":
      statusColor = "bg-status-yellow";
      break;
    // case "idle":
    default:
      statusColor = "bg-status-grey";
      break;
  }

  return (
    <div className="task-card">
      <div>
        <div className="flex justify-between">
          <div>
            <h3 className="task-card__title">{task.title}</h3>
            <div className="task-card__date">
              <DateIcon /> {formatDate(task.created_at)}
            </div>
          </div>
          <div className={`task-card__status ${statusColor}`}></div>
        </div>
        <p className="task-card__description">
          {task.description.length > 100
            ? task.description.substring(0, 99) + "..."
            : task.description}
        </p>
      </div>
      <div>
        {/* <p>{task.assignee}</p> */}
        <p className="task-card__tag">#{task.tag}</p>
      </div>
    </div>
  );
};

export default TaskCard;
