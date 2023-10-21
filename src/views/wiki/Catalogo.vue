<script setup lang="ts">
import CatalogoForm from "./CatalogoForm.vue"
import { reactive} from 'vue';
import Especie from "@/views/especie/Especie.vue"

    const itensBreadcrumb = reactive([
        {
            title: 'Home',
            disabled: false,
            href: '/home',
        },
        {
            title: 'Wiki',
            disabled: true,
            href: '#',
        },
    ]);
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
        <CatalogoForm/>
    </v-card>
    
    <v-card class="mt-5" elevation="1">
        <Especie/>
    </v-card>
    
</template>