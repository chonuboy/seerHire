import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import SearchCandidates from "@/components/Forms/searchCandidates";

export default function Search() {
  return (
    <MainLayout>
      <ContentHeader title="Search Candidates" />
      <SearchCandidates />
    </MainLayout>
  );
}
