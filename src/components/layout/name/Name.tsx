import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import Modal from "@/components/modal/Modal";
import { PokemonInfoType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

interface PokemonTypes {
  pokemon: { name: string; url: string };
  slot: number;
}

interface chartDataType {
  options: {};
  series: number[];
  labels: string[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  padding: 20px;
`;

const NamePage = () => {
  const { query } = useRouter();
  const [pokemon, setPokemon] = useState<PokemonTypes[]>([]);
  const { data } = useFetch<any>(
    query.name ? `${_Urls.root}/${query.category}/${query.name}` : ""
  );
  const [selectedUrl, setSelectedUrl] = useState("");
  const { data: pokemonData } = useFetch<any>(selectedUrl ? selectedUrl : "");
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [chartData, setChartData] = useState<any>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (data) {
      setPokemon(data?.pokemon);
    }
  }, [data]);

  useEffect(() => {
    if (pokemonData) {
      setPokemonInfo(pokemonData);
    }
  }, [pokemonData]);

  useEffect(() => {
    if (pokemonInfo) {
      setOpenModal(true);
      let categories: string[][] = [];
      let base_stat: number[] = [];
      pokemonInfo?.stats.map((item) => {
        categories.push([item.stat.name]);
        base_stat.push(item.base_stat);
      });
      const chart = {
        series: [
          {
            data: base_stat,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
        },
      };
      setChartData(chart);
    }
  }, [pokemonInfo]);

  useEffect(() => {
    if (openModal) {
      setSelectedUrl("");
    }
  }, [openModal]);

  if (pokemon?.length == 0) {
    return <div>No Pokemon </div>;
  }
  if (isClient) {
    return (
      <>
        <Modal isOpen={openModal} setOpen={setOpenModal}>
          <div>name:{pokemonInfo?.name}</div>
          <div>species:{pokemonInfo?.species.name}</div>
          <div>
            abilities:
            {pokemonInfo?.abilities.map((item) => {
              return <p>{item.ability.name}</p>;
            })}
          </div>
          {isClient && (
            <div>
              <ReactApexChart
                options={chartData?.options}
                series={chartData?.series}
                type="bar"
                height={350}
              />
            </div>
          )}
        </Modal>
        <GridContainer>
          {pokemon?.map((item) => {
            return (
              <div onClick={() => setSelectedUrl(item.pokemon.url)}>
                <Card>{item.pokemon.name}</Card>
              </div>
            );
          })}
        </GridContainer>
      </>
    );
  }
};

export { NamePage };
