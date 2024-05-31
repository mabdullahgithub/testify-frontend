import DefaultLayout from "@components/Layouts/DefaultLayout";
import CreateProduct from "@components/Product/CreateProduct";
import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <CreateProduct />
    </DefaultLayout>
  );
};

export default page;
