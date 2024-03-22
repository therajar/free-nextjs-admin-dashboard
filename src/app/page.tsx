import ECommerce from "@/components/Dashboard/E-commerce";
import WalletInputPage from "@/components/Dashboard/WalletInputPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
  title:
    "UniFI | Your MultiversX Portfolio",
  description: "This is UniFIs Home for Tracking MultiversX activity",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <WalletInputPage />
      </DefaultLayout>
    </>
  );
}
