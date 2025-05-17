import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { ResultCard } from "@/components/Elements/cards/resultCard";
import { useEffect, useState } from "react";
import { store } from "@/Features/Store";
import { searchCandidates } from "@/api/candidates/candidates";
import { Candidate } from "@/lib/definitions";
export default function SearchResults(){

    const [results,setResults] = useState();

    useEffect(() => {
        const currentQueries = store.getState().search;
        console.log(currentQueries);
        try{
            searchCandidates(currentQueries).then((data)=>{
                setResults(data.content);
            }).catch((err)=>{
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    },[]);

    return (
        <MainLayout>
            <ContentHeader title="Search Results"/>
            <ResultCard candidateData={results}></ResultCard>
        </MainLayout>
        
    );
};