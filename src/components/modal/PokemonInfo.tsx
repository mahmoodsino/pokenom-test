import { useFetch } from "@/api/hooks/useFetch";
import { PokemonInfoType } from "@/types";
import React, { FC, useState, useEffect } from "react";
import Modal from "./Modal";
import ReactApexChart from "react-apexcharts";
import Loading from "../loader/Loading";
import styled from "styled-components";


const Title = styled.h2`
text-align: center;
font-weight: 600;
font-size: 20px;
`;

const Div = styled.div`
font-weight: 600;
display: flex;
gap: 5px;
margin-top: 10px;
font-size: 14px;
`

interface Props {
  url: string;
  setSelectedUrl: (item: string) => void;
}

const PokemonInformation: FC<Props> = ({ url, setSelectedUrl }) => {
  const { data: pokemonData, isLoading } = useFetch<any>(url ? url : "");
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [chartData, setChartData] = useState<any>();

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

  return (
    <Modal isOpen={openModal} setOpen={setOpenModal}>
      <Title>Pokemon Information</Title>
      <Div>name:{pokemonInfo?.name}</Div>
      <Div>species:{pokemonInfo?.species.name}</Div>
      <Div>
        abilities:
        {pokemonInfo?.abilities.map((item,i) => {
          return <span key={i}>{item.ability.name}{i !== pokemonInfo?.abilities.length - 1 && <span>,</span>}</span>;
        })}
      </Div>
      <div>
        <ReactApexChart
          options={chartData?.options}
          series={chartData?.series}
          type="bar"
          height={350}
        />
      </div>
    </Modal>
  );
};

export default PokemonInformation;
