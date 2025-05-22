import { defineStore } from "pinia";
import { Especie } from "@/types";
import * as especieService from "@/api/EspecieService";

export const useEspecieStore = defineStore("especie", {
// export const useEspecieStore = defineStore("especie", {
    state:() => ({
        especies: [] as Especie[],
        // especieSelecionada: null as Especie | null,
        // loaded: false
    }),
    getters:{
        listaEspecies(): Especie[]{
            return this.especies;   
        },
        getEspecieById(): (id: number) => Especie | undefined{
            return (id:number) => this.especies.find((e) => e.id === id);
        },
        listaEspeciesOrdenada(): Especie[] {
            return [...this.especies].sort((a, b) => a.nome_cientifico.localeCompare(b.nome_cientifico));
        },

    },
    actions: {
        limparCache() {
        this.especies = [];
        // this.loaded = false;
        // this.especieSelecionada = null;
        },
        async carregarEspecies(): Promise<Especie[]>{
            try {
                const data = await especieService.getAll();
                // console.log("carregar especies", data)
                this.especies = Array.isArray(data) ? data : [];
                // this.loaded = true;
                return this.especies;
            } catch (error) {
                this.limparCache();
                throw new Error("Erro ao carregar espécie.")
                
            }
        },
        async adicionarEspecie(especie: Especie): Promise<Especie>{
            try {
                const novaEspecie = await especieService.create(especie);
                this.especies.push(novaEspecie);
                // console.log("adicionar especie", novaEspecie)
                
                return novaEspecie;
            } catch (error: any) {
                throw new Error(error.message || "Erro ao criar espécie");
            }
        },
        async deletarEspeciesPorId(id: number): Promise<void>{
            try {
                await especieService.deletes(id);
                this.especies = this.especies.filter((e) => e.id !== id);
                // console.log("remover especie por id")
            } catch (error) {
                  this.limparCache();
                throw new Error("Erro ao deletar espécie.")
            }
        },
        async buscarEspeciePorId(id: number): Promise<Especie>{
            try {
                const especie = await especieService.getById(id);
                // console.log("especie[store]", especie)
                const especieExistente = this.getEspecieById(id);
                if(!especieExistente){ this.especies.push(especie);}
                return especie;
            } catch (error) {
                throw new Error("Erro ao buscar espécie por id.")

            }

        },
        async atualizarEspeciePorId(id: number, dadosAtualizados: Partial<Especie>): Promise<Especie> {
            // const especieExiste = this.especies.find((e) => e.id === id);
            const especieExiste = this.getEspecieById(id);
            if(!especieExiste) {throw new Error("Especie não encontrada");}
            
            const especieAtualizada: Especie = {
                ...especieExiste,
                ...dadosAtualizados,
            };
            try {
                const atualizarEspecie = await especieService.atualizar(id, especieAtualizada)

                const idx = this.especies.findIndex((e) => e.id === id);
                if(idx !== -1){
                    Object.assign(this.especies[idx], atualizarEspecie);
                }
                return atualizarEspecie;
            } catch (error: any) {
                throw new Error(error.message || "Erro ao atualizar espécie");  
            }
        }
        
    
    }




})