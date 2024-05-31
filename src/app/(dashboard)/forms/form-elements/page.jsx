import React from "react";
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import FormElements from "../../../../components/FormElements";



export const metadata = {
  title: "Next.js Form Elements | Rocco - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for Rocco - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
