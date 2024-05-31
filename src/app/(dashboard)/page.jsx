import DefaultLayout from "../../components/Layouts/DefaultLayout";
import ECommerce from "../../components/Dashboard/E-commerce";

export const metadata = {
  title: "Arozeen Store",
  description: "This is Rocco Ecommerce Website",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
