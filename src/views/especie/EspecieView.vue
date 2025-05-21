<script setup lang="ts">
  import { useEspecieStore } from '@/store/EspecieStore';
  import { Especie } from '@/types';
  import { storeToRefs } from 'pinia';
  import {onMounted, ref} from 'vue'
  import CatalogoForm from '../wiki/CatalogoForm.vue';


  const especieStore = useEspecieStore();
  const {listaEspeciesOrdenada } = storeToRefs(especieStore); 
  const especieSelecionada = ref<Especie | null >(null);
  const dialogAberto = ref(false);
  const carregarEspecies = async() => {
    try {
      await especieStore.carregarEspecies();
    } catch (error) {
      console.error("Erro ao carregar espécie: ", error)
    }
  }
  
  const deleteEspecie = async (id:number) => {
    try {
        await especieStore.deletarEspeciesPorId(id);       
        alert("REMOVIDO COM SUCESSO!")
      }catch (error) { 
        console.error("Erro ao remover espécie: ", error)
    }
  }

  const editarEspecieLista = (especie: Especie) => {
    especieSelecionada.value = especie;
    dialogAberto.value = true;

  }
  
  const fecharDialog = () => {
    especieSelecionada.value = null;
    dialogAberto.value = false;

  }
  

  onMounted(async () => {
    await carregarEspecies();
  });

</script>

<template>
  <v-card class="pa-4" >
        <v-table>
          <thead  class="bg-light-green-darken-3"
          style="position: sticky; top: 0;">
          <tr  >
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
      v-for="item in listaEspeciesOrdenada"
        :key="item.id"
        >
        <!-- dentro da lista de especies -->
        <td>
          <v-img
            v-if="item.imagem_url"
            :src="item.imagem_url"
            max-width="160"
            max-height="90"
            width="160"
            height="90"
            class="rounded mx-auto"
            cover
          ></v-img>
          <p v-else>Não possui imagem</p>
        </td>
        <td>{{ item.nome_comum }}</td>
        <td>{{ item.nome_cientifico }}</td>
        <td>{{ item.autoridade_taxonomica }}</td>
        <td>{{ item.status_conservacao }}</td>
        <td>{{ item.reino }}</td>
        
    <td>
      <v-row justify="center"  dense>
        <v-btn @click="editarEspecieLista(item)" class="mx-1" color="blue-accent-1" size="small" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="mx-1" color="green-accent-1" size="small" icon @click="$router.push({path: `/wiki/especie/${item.id}`})">
          <v-icon>mdi-information</v-icon> 
        </v-btn>
        
        <v-btn class="mx-1" color="red-accent-1" size="small" icon @click="deleteEspecie(item.id)">   
          <v-icon>mdi-delete</v-icon> 
        </v-btn>
      </v-row>
    </td>

      </tr>
    </tbody>
    
  </v-table>
    </v-card>
    <v-dialog v-model="dialogAberto" width="1000">
      <CatalogoForm   modo="atualizar" :especie-edicao="especieSelecionada" @fechar="fecharDialog"/>
    </v-dialog>
</template>

