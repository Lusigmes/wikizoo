<script setup lang="ts">
    import { itemListaHome } from '@/api/ItemService';
    import { reactive} from 'vue';


    const itensBreadcrumb = reactive(itemListaHome())
        
</script>

<template>
    <v-card elevation="0">
        <v-breadcrumbs class="ml-4 mt-0" :items="itensBreadcrumb">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-home"></v-icon>
                    </template>
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
        </v-breadcrumbs>

    </v-card>
    
    <v-card>
        <h1>CONTEUDO HOME</h1>
    </v-card>
</template>