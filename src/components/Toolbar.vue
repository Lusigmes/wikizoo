<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Home from '@/views/Home.vue'
import { reactive} from 'vue';
 
const items = ref([
        {title: 'Catálogo', link:'/wiki/catalogo'},
        {title: 'Distribuícao Geográfica',  link:''}
    ]);

    const mergeProps = (menu:any , tooltip:any) => ({
        ...menu,
        ...tooltip,
    });

    const router = useRouter();


    
</script>

<template>

<v-card class="bg-grey-lighten-1 align-start" flat height="100px"  rounded="0">
            
            <v-toolbar  dense class="bg-grey-lighten-3 mt-3" elevation="2"
                        extended extension-height="10" >
                
               <RouterLink :to="'/home'">
                <v-avatar class="ml-6 mt-2" rounded="0" size="50">
                    <v-img src="@/assets/img/biodiversidade.png" />
                </v-avatar>
               </RouterLink>

                <v-toolbar-title class="text-h4 ml-2 mt-2 font-weight-bold text-green">WikiZoo</v-toolbar-title>
              
                                        <!-- MENU DE ROTAS ? -->
                <div class="text-center">
                    <v-menu>
                        <template v-slot:activator="{ props: menu }">
                                            
                            <v-tooltip location="left">
                                <template v-slot:activator="{ props: tooltip }">
                                    <v-btn  class="bg-blue-accent-3 mr-6 mt-2" color="black-accent-3" elevation="1"
                                        :="mergeProps(menu, tooltip)" >
                                        Navegar em WikiZoo
                                     </v-btn>
                                </template>
                                            
                                <span>BEM VINDO</span>
                            </v-tooltip>
                        </template>
                                        
                        <v-list>

                            <v-list-item v-for="(item, index) in items" :key="index">

                                                    <v-list-item-title> 
                                                        <RouterLink :to="item.link">
                                                            <v-btn class="text-blue-accent-3" elevation="0" > 
                                                                {{ item.title }}
                                                            </v-btn> 
                                                        </RouterLink>
                                                    </v-list-item-title>

                            </v-list-item>

                        </v-list>
                    </v-menu>
                </div>                            
                    
                  
                
            </v-toolbar>
        </v-card>


</template>