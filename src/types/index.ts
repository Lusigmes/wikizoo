import { Conservacao, Continentes, Reino } from "./enums"

export interface Especie{
    id: number,
    nome_comum: string,
    nome_cientifico: string,
    autoridade_taxonomica: string,
    reino: Reino,
    status_conservacao: Conservacao,
    descricao: string
    continente_localizado: Continentes[],
    tamanho_medio: Number
    imagem_url?: string | null | undefined
    /* filo: string,
    classe: string,
    ordem: string,
    familia: string,
    genero: string,
    especie: string,
    subespecie: string */
}
export interface DataTableHeader {
    text: string,
    value: string
};