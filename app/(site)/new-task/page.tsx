import React from "react";

import Input from "@/components/Input";

const NewTask = () => {
  return (
    <div>
      <div>NewTask</div>
      <Input placeholder="Title" type="text" />
      <Input placeholder="Description" type="textarea" />
      <Input type="file" />
    </div>
  );
};

export default NewTask;
