<script setup lang="ts">
import { Especie } from '@/types';
import mundoUrl from '@/assets/continentes-atualizao.svg?raw' // Adicione ?url para importar como string
import { ref, onMounted } from 'vue';
import { Continentes } from '@/types/enums';

const props = defineProps<{
  especie: Especie
}>();

const idContinentesPersonalizado: Record<string, Continentes> = {
  'america-do-sul': Continentes.AMERICA_DO_SUL,
  'america-do-norte': Continentes.AMERICA_DO_NORTE,
  'asia': Continentes.ASIA,
  'africa': Continentes.AFRICA,
  'europa': Continentes.EUROPA,
  'oceania': Continentes.OCEANIA,
  'antartida': Continentes.ANTARTIDA
};
const continentes = [
  { id: 'asia' as Continentes, corPadrao: '#a0d8b3', corHover: '#4caf50' },
  { id: 'africa' as Continentes, corPadrao: '#ffcccb', corHover: '#ff6b6b' },
  { id: 'europa' as Continentes, corPadrao: '#a0d8ff', corHover: '#4c7faf' },
  { id: 'america-do-sul' as Continentes, corPadrao: '#ffd8a0', corHover: '#af7f4c' },
  { id: 'america-do-norte' as Continentes, corPadrao: '#d8a0ff', corHover: '#7f4caf' },
  { id: 'oceania' as Continentes, corPadrao: '#a0ffd8', corHover: '#4caf7f' },
  { id: 'antartida' as Continentes, corPadrao: '#d8a0d8', corHover: '#af4caf' },
];
// const continenteMapa = ref([
//   'america-do-sul',
//   'america-do-norte',
//   'africa',
//   'asia',
//   'europa',
//   'oceania',
//   'antartida'
// ])

const svgMap = ref<HTMLObjectElement | null>(null);

onMounted(() => {
  // const continen = props.especie.continente_localizado
  // console.log(continen.toString())
  // continen.forEach((regiao: any) => {

  // })
  if (svgMap.value) {
    svgMap.value.addEventListener('load', () => {
      const svgDoc = svgMap.value?.contentDocument;
      if (svgDoc) {
        const especieContinentes = props.especie.continente_localizado
        .map(nome => idContinentesPersonalizado[nome] || nome.toLowerCase().replace(/\s+/g, '-'));
        
        continentes.forEach(continente => {
          const path = svgDoc.getElementById(continente.id);
          
          if (path) {
            path.style.cursor = "pointer";
            const estaAtivo = especieContinentes.includes(continente.id)
            console.log("estaAtivo",estaAtivo)
            console.log("especieContinentes", especieContinentes)
            
            if(estaAtivo){
              path.style.fill = continente.corPadrao
            }else{
              
              path.style.fill = "#c1c1c1"
              path.style.cursor = "not_allowed"
            }
          }
        });
      }
    });
  }
});
</script>
<template>
  <div class="d-flex flex-column align-center">
    <!-- Container do SVG com posição relativa -->
    <div style="position: relative; width: 100%; max-width: 800px;">
      <!-- SVG renderizado como objeto para permitir interação -->
      <object 
        :data="mundoUrl" 
        type="image/svg+xml"
        class="svg-interactive"
        style="width: 100%; height: auto;"
        ref="svgMap"
      ></object>
      
      <!-- Aqui você pode adicionar elementos sobrepostos se necessário -->
    </div>
  </div>
</template>
<!-- 
<style scoped>
.svg-interactive {
  display: block;
  margin: 0 auto;
  border: 1px solid #ddd; /* opcional */
  border-radius: 4px; /* opcional */
}
</style> -->