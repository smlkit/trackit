import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Task } from "@/types";

const useGetTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchTasks = async () => {
      const { data, error } = await supabaseClient.from("tasks").select("*");

      if (error) {
        // TODO: add toast
        setIsLoading(false);
      }

      setTasks(data as Task[]);
      setIsLoading(false);
    };

    fetchTasks();
  }, [supabaseClient]);

  return useMemo(() => ({ isLoading, tasks }), [isLoading, tasks]);
};

export default useGetTasks;
