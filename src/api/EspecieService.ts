import { Especie } from "@/types";
import httpClient from "./endpoint";
import EspecieDetalhesVue from "@/views/especie/EspecieDetalhes.vue";

export const create = async (especie: any) : Promise<Especie> => {
  try {

    const response = await fetch(httpClient, {
           method: 'post', headers: {'Content-type': 'application/json'},
           body: JSON.stringify(especie)
         });
         
         if (!response.ok) {
          throw new Error(`Erro ao criar uma espécie: ${response.status}`);
        }
        
        const data = await response.json();
       // console.log("EspecieService: post:", data)
        return data

  } catch (error) {
    console.error("Erro ao cadastrar especie",error);
    throw error;
  }
}
export const getById = async (id: number): Promise<Especie | any> => {
//1697906249975
  try {
    const response = await fetch(`${httpClient}/${id}`)
    return response.json();
  } catch (error) {
    console.error("Erro ao obter especie",error);
    console.error(error)
  }

}

export const getAll = async (): Promise<Especie | any> => {

  try {

    const response = await fetch(httpClient);
         
         if (!response.ok) {
          throw new Error(`Erro ao obter uma espécie: ${response.status}`);
        }
        return response.json();

  } catch (error) {
    console.error("Erro ao obter especie",error);
    throw error;
  }
}

export const deletes = async (id: number): Promise<Especie | any> => {
  try{
    const response = await fetch(`${httpClient}/${id}`,{
      method: 'delete'
    })
    if (!response.ok) {
      throw new Error(`Erro ao deletar uma espécie: ${response.status}`);
    }
  } catch (error) {
      console.error("Erro ao excluir espécie", error);
    throw error;
}

}

