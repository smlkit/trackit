import { User } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchUsers = async () => {
      const { data, error } = await supabaseClient.from("users").select("*");

      if (error) {
        // TODO: add toast
        setIsLoading(false);
      }

      setUsers(data as User[]);
      setIsLoading(false);
    };

    fetchUsers();
  }, [supabaseClient]);

  return useMemo(() => ({ isLoading, users }), [isLoading, users]);
};

export default useGetUsers;
