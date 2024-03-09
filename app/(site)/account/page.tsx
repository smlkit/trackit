"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";

import Input from "@/components/Input";
import Button from "@/components/Botton";
import { useUserContext } from "@/hooks/useUserContext";

const Account = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, userDetails } = useUserContext();
  console.log(userDetails);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.avatar_url?.[0];

      if (!imageFile) {
        console.log("Load image!");
        return;
      }

      const uniqueID = uniqid();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("avatars")
          .upload(`avatar-${values.full_name}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        console.log("Failed image upload!");
      }

      const { error: supabaseError } = await supabaseClient
        .from("users")
        .update({
          full_name: values.full_name,
          avatar_url: imageData?.path,
          updated_at: new Date(),
        })
        .eq("id", user?.id);

      if (supabaseError) {
        setIsLoading(false);
        console.log("Supabase error!");
      }

      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      full_name: userDetails?.full_name,
      avatar_url: "",
    },
  });

  useEffect(() => {
    reset();
  }, [userDetails]);

  return (
    <div className="w-full">
      <div className="pb-8">
        <h1 className="header-1">Account</h1>
        <p className="p">Manage your account settings.</p>
      </div>
      {userDetails && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-1">
            <label className="p" htmlFor="">
              Full name
            </label>
            <Input
              className="input"
              placeholder="Enter full name"
              type="text"
              {...register("full_name", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label className="p" htmlFor="">
              Upload avatar
            </label>
            <Input
              className="input"
              id="avatar_url"
              type="file"
              {...register("avatar_url")}
            />
          </div>

          <Button
            type="submit"
            className="main-btn"
            disabled={isLoading}
            text="Update"
          />
        </form>
      )}
    </div>
  );
};

export default Account;
