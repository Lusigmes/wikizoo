<template>
  
  
  
  <v-app>
    
    <v-col elevation="0">
      <router-view/>

    </v-col>
    
    <v-col>
      <v-footer height="auto" color="grey-lighten-1" class="app--footer pa-3" :app="true"
      style="position: fixed; bottom: 0; width: 100%;">
                <v-row no-gutters class="justify-center mt-0">
                    
                    <span class="caption">
                      Catálogo de espécies.&copy; {{ new Date().getFullYear() }} — WikiZoo.
                    </span>
                  </v-row>
                </v-footer>
    </v-col>
                
    </v-app>
</template>

<script lang="ts" setup>
import Home from '@/views/Home.vue';

 
  
   
 

</script>
