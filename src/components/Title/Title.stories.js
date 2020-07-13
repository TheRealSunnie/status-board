import React from "react";
import Title from "./";

export default {
  component: Title,
  title: "Title"
};

export const withText = () => <Title>This is a title</Title>;
