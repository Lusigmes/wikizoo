<script setup lang="ts">
import CatalogoForm from "./CatalogoForm.vue"
import { reactive, ref} from 'vue';
import Especie from "@/views/especie/Especie.vue"
import { itemListaCatalogo } from "@/api/ItemService";

const itensBreadcrumb = reactive(itemListaCatalogo());
const especieRef = ref();

// function atualizarListaEspecies() {
//   especieRef.value?.carregarEspecies(); // chama o método do componente Especie
// }

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

    <v-card elevation="0">
        <CatalogoForm modo="cadastrar"/>
    </v-card>
    
    <v-card class="mt-5" elevation="1">
        <Especie ref="especieRef"/>
    </v-card>
    
</template>