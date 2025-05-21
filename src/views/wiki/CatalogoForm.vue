<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { Especie } from '@/types/index'
import { Reino, Conservacao, Continentes} from '@/types/enums'
import { useEspecieStore } from '@/store/EspecieStore';

const especieStore = useEspecieStore();
// recebendo valores da especie selecinada
const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
  (e: 'especie-atualizada', especie: Especie): void;
  (e: 'fechar'): void;
}>();

type Modo = 'cadastrar' | 'atualizar';
const props = defineProps<{
  especieEdicao?: Especie | null,
  dialog?: boolean,
  modo? : Modo | string
}>();

const dialog = ref(props.dialog || false);

const state= reactive ({
  especie: {} as Especie,
  maxDescricao: 255,
  reinoSelecionado: null as Reino | null,
  statusSelecionado: null as Conservacao | null,
  continenteSelecionado: [] as Continentes[],

  opcoesReino: Object.values(Reino),
  opcoesStatus: Object.values(Conservacao),
  opcoesContinentes : Object.values(Continentes),
});

const preencherEdicao = (especie: Especie) => {
  state.especie = {...especie};
  state.reinoSelecionado = especie.reino ?? null;
  state.statusSelecionado = especie.status_conservacao ?? null;
  state.continenteSelecionado = especie.continente_localizado as Continentes[] ?? [];
};

const limitarDescricao = () => {                                                                                 
  if(state.especie.descricao.length > state.maxDescricao){
    state.especie.descricao = state.especie.descricao.slice(0, state.maxDescricao);
  }
};

const closeDialog = () => {
  resetDialog();
  dialog.value = false;
  emit('fechar')
};

const resetDialog = () => {
  state.especie = {
    id: 0,
    nome_comum: '',
    nome_cientifico: '',
    autoridade_taxonomica: '',
    reino: state.opcoesReino[5],
    status_conservacao: state.opcoesStatus[5],
    continente_localizado: [] as Continentes[],
    tamanho_medio: 0,
    descricao: '',
    imagem_url: ''
  };

  state.statusSelecionado = null;
  state.reinoSelecionado = null;
  state.continenteSelecionado = [];
  imgSelecionada.value = undefined;
}

  const isSave = ref(false);
  
  const salvarEspecie = async () => {
    if(isSave.value) return
    isSave.value = true;
    try {

      const nomeComumEspecie = state.especie.nome_comum.trim();
      const nomeCientificoEspecie = state.especie.nome_cientifico.trim();
      const autoridadeTaxonomicaEspecie = state.especie.autoridade_taxonomica.trim();
      const reinoEspecie = state.reinoSelecionado;
      const statusConservacaoEspecie = state.statusSelecionado;
      const continenteLocalizadoEspecie = state.continenteSelecionado;
      const tamanhoEspecie = state.especie.tamanho_medio;
      const descricaoEspecie = state.especie.descricao;

      if (!nomeComumEspecie || !nomeCientificoEspecie || !autoridadeTaxonomicaEspecie || !reinoEspecie || !statusConservacaoEspecie) {
        alert('Preencha todos os campos obrigatórios.');
        isSave.value = false;
        return;
      }
         
      
        const inputEspecie: Especie = {
          id: props.modo === 'atualizar' ? state.especie.id : Date.now(),
          nome_comum: nomeComumEspecie,
          nome_cientifico: nomeCientificoEspecie,
          autoridade_taxonomica: autoridadeTaxonomicaEspecie,
          reino: reinoEspecie,
          status_conservacao: statusConservacaoEspecie,
          continente_localizado: continenteLocalizadoEspecie,
          tamanho_medio: tamanhoEspecie,
          descricao: descricaoEspecie,
          imagem_url: state.especie.imagem_url ?? ""
        };
        
      
      if(props.modo === 'atualizar' && state.especie.id){
  
        await especieStore.atualizarEspeciePorId(state.especie.id, inputEspecie);
        emit('especie-atualizada', inputEspecie)
        emit('fechar')
        // alert("ATUALIZADO COM SUCESSO!")
      }else{

        await  especieStore.adicionarEspecie(inputEspecie)
        // alert("ADICIONADO COM SUCESSO!")
      }
      closeDialog();
      
      } catch (error) {
          console.error(error);
      }finally{
        isSave.value = false;
      }
  }

  const imgSelecionada = ref<File[] |  undefined>(undefined);

  const carregarImg = async () => {
    if (imgSelecionada.value && imgSelecionada.value.length > 0) {
      const file = imgSelecionada.value[0];
      const reader = new FileReader();
      reader.onload = () => {
        state.especie.imagem_url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removerImagem = () => {
    state.especie.imagem_url = '';
    imgSelecionada.value = undefined;
  }

  watch(() => props.especieEdicao, (novaEspecie) => {
    if (novaEspecie) {
      preencherEdicao(novaEspecie);
    }
  });
    // executa quando abre ou fecha o dialog(cadastrar/editar especie)
  watch(dialog, (val) =>{
    emit('update:dialog', val);
    console.log("abriu ou fechou")
  });

  watch(
    () => props.dialog,
    (aberto) => {
      if (aberto && props.especieEdicao) {
        preencherEdicao(props.especieEdicao);
      }
      emit('update:dialog', aberto);
    }
  );


onMounted(async () => {
  if(props.especieEdicao){
    resetDialog();
    preencherEdicao(props.especieEdicao)
    console.log(state.opcoesReino[5])
    console.log(state.opcoesStatus[5])
  }
});


</script>


<template>
    <v-card-text>
          <v-row justify="end" class="mr-4">
              <v-dialog  transition="dialog-bottom-transition"
              v-model="dialog"
              persistent
              width="1024"
              >
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              color="green-lighten-1"
              v-bind="activatorProps"
            >
              {{ props.modo === 'atualizar' ? 'Editar' : 'Cadastrar Espécie' }}
            </v-btn>
          </template>
            
            <v-card>
              <v-row class="mt-2 ml-5 mr-5">

                <v-col cols="6">
                  <v-card-title>
                    <span class="text-h5">{{ props.modo === 'atualizar' ? 'ATUALIZAR ESPÉCIE' : 'CADASTRE UMA ESPÉCIE' }}</span>
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
                      :loading="isSave"
                      @click="salvarEspecie"
                    >
                       {{ props.modo === 'atualizar' ? 'Atualizar' : 'Salvar' }}
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
                              type="number"
                              min="0"
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
                              v-model="state.reinoSelecionado"
                              :items="state.opcoesReino"
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
                              v-model="state.statusSelecionado"
                              :items="state.opcoesStatus"
                              persistent-hint
                              required
                            ></v-select>
                          </v-col>

                          <v-col
                            cols="12"
                            >
                            <v-select
                              v-model="state.continenteSelecionado"
                              :items="state.opcoesContinentes"
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
                            @input="limitarDescricao"
                            ></v-textarea>
                          </v-col>
                          
                          <v-col cols="6">
                            <v-file-input
                              label="Imagem da Espécie"
                              accept="image/*"
                              v-model="imgSelecionada"
                              @change="carregarImg"
                              prepend-icon="mdi-image"
                            ></v-file-input>
                          </v-col>
                          
                        <v-row style="border: 1px black; ">
                          <v-col cols="12" v-if="state.especie.imagem_url">
                            <div class="text-center image-container">
                              <v-img
                                :src="state.especie.imagem_url"
                                max-width="400"
                                max-height="200"
                                class="mx-auto"
                                contain
                              >   
                                 <template v-slot:placeholder>
                                  <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                  </v-row>
                                </template> 
                                <v-btn 
                                  icon
                                  color="red" 
                                  @click="removerImagem"
                                  class="close-bt"
                                  style="position: absolute; right: 15px; transform: translateX(30%);"
                                  size="small"
                                >
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-img>
                            </div>
                          </v-col>
                        </v-row>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
        </v-dialog>
        
      </v-row>
    </v-card-text>

    
</template>
