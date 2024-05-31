import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import TableTwo from "../../../components/Tables/ViewProducts";

export const metadata = {
  title: "Next.js Tables | Rocco - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for Rocco - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10"> 
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
