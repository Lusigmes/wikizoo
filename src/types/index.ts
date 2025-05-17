export interface Especie{
    id: number,
    nome_comum: string,
    nome_cientifico: string,
    autoridade_taxonomica: string,
    reino: string[],
    status_conservacao: string[],
    descricao: string
    continente_localizado: string[],
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