import { useEspecieStore } from "./EspecieStore";
import { Especie } from "@/types";

type Modo = "teste1" | "teste2";

export function useEspecie(modo: "teste1"): {
    carregar: () => Promise<void>;
    buscar: (id: number) => Promise<Especie>;
    atualizar: (id: number, dadosAtualizados: Partial<Especie>) => Promise<Especie>;
};

export function useEspecie(modo: "teste2"): {
    adicionar : (especie: Especie) => Promise<Especie>;
    remover: (id: number) => Promise<void>;
};

export function useEspecie(modo: Modo): any{
    const store = useEspecieStore();

    if( modo === "teste1"){
        return {
            carregar: store.carregarEspecies,
            buscar: store.buscarEspeciePorId,
            atualizar: store.atualizarEspeciePorId
        }
    }
    if( modo === "teste2"){
        return {
            adicionar: store.adicionarEspecie,
            remover: store.deletarEspeciesPorId
        }
    }
    throw new Error(`Modo inválido: ${modo}`);
};