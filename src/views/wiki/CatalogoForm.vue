<script setup lang="ts">
import { ref } from 'vue';
import { Especie } from '@/types/index'
import  {create, getAll}  from '@/api/EspecieService'
import { Reino, Conservacao, Continentes} from '@/types/enums'
import { reactive } from 'vue';
import { onMounted } from 'vue';



onMounted(() => {  
  getEspecie(); 
});
  

let dialog = ref(false);

const maxDescricao = 255;

const state = reactive ({
  especie: {} as Especie

})


const listaEspecies = ref<Array<Especie>>([]);

state.especie.descricao = "Descreva características gerais necessárias.";

state.especie.reino = Object.values(Reino).map((value) => value.toString());
const reinoSelecionado = ref<Reino | null>(null); 

state.especie.status_conservacao = Object.values(Conservacao).map((value) => value.toString()); 
const statusSelecionado = ref<Conservacao | null>(null); 

state.especie.continente_localizado = Object.values(Continentes).map((value) => value.toString());
const continenteSelecionado = ref<Continentes[] | null>(null); 


const limitarDescricao = () => {                                                                                 
  if(state.especie.descricao.length > maxDescricao){
    state.especie.descricao = state.especie.descricao.slice(0, maxDescricao);
  }
}

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  resetDialog();
  dialog.value = false;
};

const resetDialog = () => {
  state.especie.nome_comum = "";
  state.especie.nome_cientifico = ""; 
  state.especie.autoridade_taxonomica = "";
  reinoSelecionado.value = null;
  statusSelecionado.value = null;
  continenteSelecionado.value = null;
  state.especie.tamanho_medio = 0;
  state.especie.descricao = "Descreva características gerais necessárias.";
  dialog.value = false;

}


async function getEspecie() {
  try {
        const response = await getAll();
        listaEspecies.value = response;
       // console.log("[CATALOGO DEBUG].:", listaEspecies)
    } catch (error) { 
        console.error(error)
        throw error;
    }
}

const postEspecie = async () => {

  try {
    const nomeComum = state.especie.nome_comum.trim();
    const nomeCientifico = state.especie.nome_cientifico.trim();
    const autoridadeTaxonomica = state.especie.autoridade_taxonomica.trim();
    const reino = reinoSelecionado.value;
    const statusConservacao = statusSelecionado.value;

    if (!nomeComum || !nomeCientifico || !autoridadeTaxonomica || !reino || !statusConservacao) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const idGerado = Date.now();

    const inputEspecie = {
      id: idGerado,
      nome_comum: state.especie.nome_comum,
      nome_cientifico: state.especie.nome_cientifico,
      autoridade_taxonomica: state.especie.autoridade_taxonomica,
      reino: reinoSelecionado.value,
      status_conservacao: statusSelecionado.value,
      continente_localizado: continenteSelecionado.value,
      tamanho_medio:state.especie.tamanho_medio,
      descricao: state.especie.descricao 
    }

    
    const response = await create(inputEspecie);
    await getEspecie();
    resetDialog();
    
    } catch (error) {
        console.error(error);
    }
}


</script>


<template>
    <v-card-text>
          <v-row justify="end" class="mr-4">
              <v-dialog  transition="dialog-bottom-transition"
              v-model="dialog"
              persistent
              width="1024"
              >
            <template v-slot:activator="{ props }">
              <v-btn color="green-lighten-1" :="props"> 
                <v-icon class="mr-2"> mdi-plus </v-icon>
                Cadastrar Especie
              </v-btn>


            </template>
            
            <v-card>
              <v-row class="mt-2 ml-5 mr-5">

                <v-col cols="6">
                  <v-card-title>
                    <span class="text-h5">CADASTRE UMA ESPÉCIE</span>
                  </v-card-title>
                </v-col>
                
                <v-col cols="6">
                  <v-card-actions>

                    <v-spacer></v-spacer>

              
                    <v-btn
                      class="ma-2"
                      color="red-darken-1"
                      variant="text"
                      @click="closeDialog"
                    >
                      Fechar
                      <v-icon
                        end
                        icon="mdi-cancel"
                      ></v-icon>
                    </v-btn>

                    <v-btn
                      color="green-darken-1"
                      variant="text"
                      @click="postEspecie"
                    >
                      Salvar
                      <v-icon
                        end
                        icon="mdi-checkbox-marked-circle"
                      ></v-icon>
                  </v-btn>

                  </v-card-actions>
                </v-col>
              </v-row>
              <small class="ml-12">*Campos Obrigatórios*</small>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                            label="Nome Comum*"
                            v-model="state.especie.nome_comum"
                            required
                            ></v-text-field>
                          </v-col>
                          
                          <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          >
                            <v-text-field
                              label="Nome Científico*"
                              v-model="state.especie.nome_cientifico"
                              hint="Qual o nome científico desta espécie?"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="4" sm="6" md="4">
                            <v-text-field
                              label="Autoridade Taxonomica"
                              v-model="state.especie.autoridade_taxonomica"
                              hint="Quem descreveu a espécie?"
                              persistent-hint
                              ></v-text-field>
                          </v-col>

                          <v-col cols="3" md="4" sm="4">
                              <v-text-field
                              v-model="state.especie.tamanho_medio"
                              label="Tamanho Médio ( cm )"
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                          <v-select
                              label="Reino*"
                              hint="Qual o reino desta espécie?"
                              v-model="reinoSelecionado"
                              :items="state.especie.reino"
                              persistent-hint
                              required
                            ></v-select>
                          </v-col>
                          
                          <v-col
                            cols="4"
                          
                          >
                          <v-select
                              label="Status Conservação*"
                              hint="Qual a situação de conservação da espécie?"
                              v-model="statusSelecionado"
                              :items="state.especie.status_conservacao"
                              persistent-hint
                              required
                            ></v-select>
                          </v-col>

                         

                        
                          
                          <v-col
                            cols="12"
                         
                            
                            >
                            <v-select
                              v-model="continenteSelecionado"
                              :items="state.especie.continente_localizado"
                              label="Continente(s) Localizado(s)"
                              multiple
                              chips
                              closable-chips
                            ></v-select>
                          </v-col>

                          
                         <v-col cols="12" >
                            <v-textarea
                              name="Descricao"
                              variant="filled"
                              label="Descrição Geral"
                              v-model="state.especie.descricao"
                              min="1" max="255"
                              @input="limitarDescricao"
                            ></v-textarea>
                          </v-col>

                          
                          


                  </v-row>
                </v-container>

                

                </v-card-text>
             
            </v-card>
        </v-dialog>
        
      </v-row>
    </v-card-text>

    
</template>