"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";

import { useUserContext } from "@/hooks/useUserContext";
import useGetUsers from "@/hooks/useGetUsers";
import Input from "@/components/Input";
import Button from "@/components/Botton";
import Select from "@/components/Select";
import { tags } from "../../../shared/tags";

const NewTask = () => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { users } = useGetUsers();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      console.log("press submit");
      const imageFile = values.attachment?.[0];

      if (!imageFile) {
        console.log("Load image!");
        return;
      }

      const uniqueID = uniqid();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("attachments")
          .upload(`attachement-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        console.log("Failed image upload!");
      }

      const { error: supabaseError } = await supabaseClient
        .from("tasks")
        .insert({
          title: values.title,
          description: values.description,
          assignee: values.assignee,
          tag: values.tag,
          attachment_url: imageData?.path,
        });

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
      title: "",
      description: "",
      assignee: "cb689f5f-b1de-4334-893e-3842499bdda0",
      attachment: null,
      tag: "dev",
    },
  });

  return (
    <div className="w-full">
      <div className="pb-8">
        <h1 className="header-1">New Task</h1>
        <p className="p">Enter task details below.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          className="input"
          placeholder="Title"
          type="text"
          {...register("title", { required: true })}
        />
        {/* TODO: fix texterea */}
        <Input
          className="input"
          placeholder="Description"
          type="textarea"
          {...register("description", { required: true })}
        />
        <Input
          className="input"
          id="attachment"
          type="file"
          {...register("attachment")}
        />

        <Select options={tags} {...register("tag")} />

        {users && (
          <Select
            options={users.map((user) => ({
              id: user.id,
              value: user.id,
              label: user.id,
            }))}
            {...register("assignee")}
          />
        )}

        <Button
          type="submit"
          className="main-btn"
          disabled={isLoading}
          text="Submit"
        />
      </form>
    </div>
  );
};

export default NewTask;
