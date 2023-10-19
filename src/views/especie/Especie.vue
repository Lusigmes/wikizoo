<script setup lang="ts">
import { getAll, deletes } from '@/api/EspecieService';
import {Especie}  from '@/types';
import { DeepReadonly } from 'vue';
import {onMounted, reactive, ref} from 'vue'

const page = ref(1);
const itemsPerPage = ref(5);
  
const listaEspecies = ref<Array<Especie>>([]);
// const especies = ref<Especie>({"id":});

type DataTableHeader = DeepReadonly<{ text: string; value: string }[]>;



const headers: DataTableHeader = [
  { text:'Nome Comum', value:'nomeComum' },
  { text:'Nome Cientifico', value:'nomeCientifiico' },
  { text:'Autoridade Taxonomica', value:'autoridadadeTaxonomica' },
  { text:'Tamanho Médio', value:'tamanhoMedio' },
  { text:'Reino', value:'reino' },
  { text:'Status de Conservação', value:'statusConservacao' },
  ]

/*   console.log("headaer:",headers.value) */


const getEspecie = async  () => {
    try {
        const response = await getAll();
        listaEspecies.value = response;
        console.log("[DEBUG].:", listaEspecies)
    } catch (error) { 
        console.error(error)
        throw error;
    }
  }

  const deleteEspecie = async (id:number) => {
    try {
        await deletes(id)        
        getEspecie();
      }catch (error) { 
        console.error(error)
        throw error;
    }
  }






  onMounted(() => {  
   getEspecie(); 
});
  
</script>

<template>
  <v-card class="pa-4" >
        <v-table>
          <thead class="bg-light-green-darken-3"
          style="position: sticky; top: 0;">
          <tr >
        <th class="text-left text-white"></th>
        <th class="text-left text-white">
          Nome Comum
        </th>
        <th class="text-left text-white">
          Nome Cientifico
        </th>
        <th class="text-left text-white">
          Autoridade Taxonomica
        </th>
        <th class="text-left text-white"        
        >
          Status
        </th>
        <th class="text-left text-white">
          Reino
        </th>
        <th class="text-left text-white">
          
        </th>
        
      </tr>
    </thead>
    <tbody >
      <tr
      v-for="item in listaEspecies"
        :key="item.id"
        >
        <td>IMAGEM</td>
        <td>{{ item.nome_comum }}</td>
        <td>{{ item.nome_cientifico }}</td>
        <td>{{ item.autoridade_taxonomica }}</td>
        <td>{{ item.status_conservacao }}</td>
        <td>{{ item.reino }}</td>
        <td >
     <!--      <v-btn color="blue-accent-1">   
            <v-icon>mdi-pencil</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn  color="red-accent-1" @click="deleteEspecie(item.id)">   
            <v-icon>mdi-delete</v-icon> 
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green-accent-1">
            <v-icon>mdi-information</v-icon> 
          </v-btn>
          <v-spacer></v-spacer>
        </td>
      </tr>
    </tbody>
    
  </v-table>
    </v-card>
</template>

