<!-- src/components/especie/tabs/InformacoesGerais.vue -->
<script setup lang="ts">
import { Especie } from '@/types';
import { ref } from 'vue';
import CatalogoForm from '@/views/wiki/CatalogoForm.vue';

const props = defineProps<{
  especie: Especie
}>();

const dialog = ref(false);
const especieAtualSelecionada = ref<Especie | null>(null);

const abrirEditarEspecie = () => {
  especieAtualSelecionada.value = {...props.especie};
  dialog.value = true
}
</script>

<template>
  <v-card class="ma-4 pa-4">
    <v-row>
      <v-col cols="3" md="4">
        <h3>Nome Comum:</h3>
        <p>{{ especie.nome_comum }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Nome Científico:</h3>
        <p>{{ especie.nome_cientifico }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Reino:</h3>
        <p>{{ especie.reino  }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Continente Localizado:</h3>
        <p>{{ especie.continente_localizado}}</p>
      </v-col>
      
      
      <v-col cols="3" md="4">
        <h3>Autoridade Taxonomica:</h3>
        <p>{{ especie.autoridade_taxonomica  }}</p>
        
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Status Conservação:</h3>
        <p>{{ especie.status_conservacao  }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Tamanho:</h3>
        <p>{{ especie.tamanho_medio  }} cm</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>IMG:</h3>
        <p>{{ especie.imagem_url || "Não possui imagem" }}</p>
      </v-col>
      
      <v-col cols="3" md="4">
        <h3>Descrição:</h3>
        <p>{{ especie.descricao || 'Informação não disponível' }}</p>
      </v-col>
    </v-row>
    <!-- <v-row justify="end" class="mt-4">
      <v-btn class="mx-1" color="primary" size="small" @click="abrirEditarEspecie">
        <v-icon left >mdi-pencil</v-icon>
      </v-btn>
    </v-row> -->
  </v-card>
    <CatalogoForm
    v-model:dialog="dialog"
    :especie-edicao="especieAtualSelecionada"
    @update:dialog="abrirEditarEspecie"
    modo="atualizar"
  />
</template>
