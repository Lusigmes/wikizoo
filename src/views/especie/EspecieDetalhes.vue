<script setup lang="ts">
    import { itemListaEspecieDetalhes } from '@/api/ItemService';
    // import { useEspecieStore } from '@/store/EspecieStore';
    import { useEspecie } from '@/store/StoreTeste';
    import { Especie } from '@/types';
    import { onMounted, reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import DetalhesGerais from './abaDetalhes/DetalhesGeraisView.vue';
    import Habitat from './abaDetalhes/HabitatView.vue';

    const route = useRoute()
    const idR = route.params.id
    // const especieStore = useEspecieStore()
    const teste1EspecieStore = useEspecie("teste1");
    const teste2EspecieStore = useEspecie("teste2");
    const itensBreadcrumb = reactive(itemListaEspecieDetalhes())
    const tab = ref('aba-detalhes-gerais')
    
    const state = reactive({
        especie: {} as Especie
    })
    
    const carregarEspecie = async (id:number) => {
       try {
        // const response = await especieStore.buscarEspeciePorId(id);
        const response = await teste1EspecieStore.buscar(id);
        state.especie = response  
        itensBreadcrumb[itensBreadcrumb.length - 1].title = state.especie.nome_comum
        } catch (error) { 
            console.error("Erro ao encontrar espécie por id: ", error)

        }
    }

  onMounted(async () => {
    const idAsNumber = parseInt(idR as string, 10); 
    await carregarEspecie(idAsNumber);
  });
  
</script>

<template>
     <v-card elevation="0" >
        <v-breadcrumbs class="ml-4 mt-0" :items="itensBreadcrumb">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-home"></v-icon>
                    </template>
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
        </v-breadcrumbs>

    </v-card>
     <v-tabs v-model="tab" class="bg-light-green-darken-2" dark>
        <v-tab value="aba-detalhes-gerais">Detalhes Gerais</v-tab>
        <v-tab value="habitat">Localização</v-tab>
        <v-tab value="galeria">Galeria</v-tab>
        <v-tab value="historia">História</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item  value="aba-detalhes-gerais">
        <v-card class="ma-4 pa-4 bg-light-green-darken-1">
          <DetalhesGerais v-if="state.especie.id" :especie="state.especie" />
        </v-card>
      </v-window-item>

      <v-window-item value="habitat">
        <v-card class="ma-4 pa-4 ">
          <Habitat v-if="state.especie.id" :especie ="state.especie" />
        </v-card>
      </v-window-item>

      <v-window-item value="galeria">
        <v-card class="ma-4 pa-4 bg-light-green-darken-1">
          <h3>Galeria</h3>        
          <p>{{ (Array.isArray(state.especie.continente_localizado) ? state.especie.continente_localizado.join(', ') : state.especie.continente_localizado ) || 'Informação não disponível'}}</p>

        </v-card>
      </v-window-item>

      <v-window-item value="historia">
        <v-card class="ma-4 pa-4 bg-light-green-darken-1">
          <h3>Historia da Especie</h3>
          <p>{{ state.especie.status_conservacao || 'Informação não disponível' }}</p>
        </v-card>
      </v-window-item>
    </v-window>
</template>