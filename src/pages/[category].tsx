import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import GridContainer from "@/components/GridContainer/GridContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface CategoryTypes {
  name: string;
  url: string;
}

const Category = () => {
  const { query, push } = useRouter();
  const { data } = useFetch<any>(
    query.category ? `${_Urls.root}/${query.category}` : ""
  );
  const [types, setTypes] = useState<CategoryTypes[]>([]);
  const [clickedUrl, setClickedUrl] = useState("");

  const penultimateCar = (url: string) => {
    const parts = url.split("/");
    const number = parts[parts.length - 2];
    push(`./${query.category}/${number}`);
  };

  useEffect(() => {
    if (data) {
      setTypes(data.results);
    }
  }, [data]);

  return (
    <GridContainer>
      {types?.map((item) => {
        return (
          // <Link href={`./${query.category}/${item.name}`}>
          <div onClick={() => penultimateCar(item.url)}>
            <Card>{item.name}</Card>
          </div>
          // </Link>
        );
      })}
    </GridContainer>
  );
};

export default Category;
