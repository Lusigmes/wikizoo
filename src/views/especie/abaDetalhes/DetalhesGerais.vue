<!-- src/components/especie/tabs/InformacoesGerais.vue -->
<script setup lang="ts">
  import { Especie } from '@/types';
  import { ref, watch } from 'vue';
  import CatalogoForm from '@/views/wiki/CatalogoForm.vue';

  const props = defineProps<{
    especie: Especie
  }>();
  
  const especieVisivel = ref({ ...props.especie });

  const dialog = ref(false);

  const especieAtualSelecionada = ref<Especie | null>(null);

  const carregarDadosEspeciesNoForm = () => { //carregar dados da especie atual via emit
    especieAtualSelecionada.value = {...especieVisivel.value};
    dialog.value = true
  }
  const atualizarEspecie = (especieAtualizada: Especie) => {
    especieVisivel.value = { ...especieAtualizada };
  };

  watch(()=> props.especie, (nova) => {
    especieVisivel.value = {...nova}
  }, {immediate: true})
  
</script>

<template>
  <v-card class="ma-4 pa-4">
    <v-row>
            <v-col cols="3" md="4">
        <h3>Nome Comum:</h3>
        <p>{{ especieVisivel.nome_comum }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Nome Científico:</h3>
        <p>{{ especieVisivel.nome_cientifico }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Reino:</h3>
        <p>{{ especieVisivel.reino  }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Continente Localizado:</h3>
        <p>{{ Array.isArray(especieVisivel.continente_localizado) ? especieVisivel.continente_localizado.join(', ') : especieVisivel.continente_localizado }}</p>
      </v-col>
      
      
      <v-col cols="3" md="4">
        <h3>Autoridade Taxonomica:</h3>
        <p>{{ especieVisivel.autoridade_taxonomica  }}</p>
        
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Status Conservação:</h3>
        <p>{{ especieVisivel.status_conservacao  }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Tamanho:</h3>
        <p>{{ especieVisivel.tamanho_medio  }} cm</p>
      </v-col>
            
      <v-col cols="3" md="4">
        <h3>Descrição:</h3>
        <p>{{ especieVisivel.descricao || 'Informação não disponível' }}</p>
      </v-col>
<!-- dentro da aba detalhes gerais -->
      <v-col cols="12" md="4">
        <h3>Imagem de Capa:</h3>
        <v-img
          v-if="especieVisivel.imagem_url"
          :src="especieVisivel.imagem_url"
          max-width="300"
          max-height="200"
          class="rounded mx-auto"
          contain
          ></v-img>
        <p v-else>Não possui imagem</p>
      </v-col>
    </v-row>
  </v-card>
    <CatalogoForm
    v-model:dialog="dialog"
    :especie-edicao="especieAtualSelecionada"
    @especie-atualizada="atualizarEspecie"
    @update:dialog="carregarDadosEspeciesNoForm"
    modo="atualizar"
  />
</template>
