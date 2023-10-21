<script setup lang="ts">
import { getById } from '@/api/EspecieService';
import { Especie } from '@/types';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const idR = route.params.id

const state = reactive({
    especie: {} as Especie
})

    const itensBreadcrumb = reactive([
        {
            title: 'Home',
            disabled: false,
            href: '/home',
        },
        {
            title: 'Wiki',
            disabled: false,
            href: '/wiki/catalogo',
        },
        {
            title: '',
            disabled: true,
            href: '#',
        },
    ]);

async function getEspecieID(id: number) {
  try {
    const response = await getById(id);
    state.especie = response
    
    itensBreadcrumb[itensBreadcrumb.length - 1].title = state.especie.nome_comum;
    
    //console.log("[ESPECIE_DETALHES DEBUG].:", state.especie)
    } catch (error) { 
        console.error(error)
        throw error;
    }
}

onMounted(() => {  
    const idAsNumber = parseInt(idR as string, 10); 
    getEspecieID(idAsNumber); 
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
    <h1>{{ state.especie.nome_cientifico }}</h1>
</template>