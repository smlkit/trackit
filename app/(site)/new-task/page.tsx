"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";

import Input from "@/components/Input";
import { useUserContext } from "@/hooks/useUserContext";

const NewTask = () => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      console.log("press submit");
      const imageFile = values.attachment?.[0];

      if (!imageFile) {
        console.log("Load image!");
        return;
      }
      console.log(imageFile);

      const uniqueID = uniqid();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("attachments")
          .upload(`attachement-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      console.log("img uploaded");

      if (imageError) {
        setIsLoading(false);
        console.log("Failed image upload!!!!!!!!!!!!!!!!!!");
      }

      const { error: supabaseError } = await supabaseClient
        .from("tasks")
        .insert({
          title: values.title,
          description: values.description,
          attachment_url: imageData.path,
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
    },
  });

  return (
    <div>
      <div>NewTask</div>
      <form
        onSubmit={handleSubmit((values) => {
          console.log("handleSubmit called");
          onSubmit(values);
        })}
      >
        <input
          placeholder="Title"
          type="text"
          {...register("title", { required: true })}
        />
        <input
          placeholder="Description"
          type="textarea"
          {...register("description", { required: true })}
        />
        <input
          id="attachment"
          type="file"
          {...register("attachment", { required: true })}
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTask;
