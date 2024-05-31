import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Layouts/DefaultLayout";
import TableTwo from "@components/Tables/ViewProducts";

import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default page;
