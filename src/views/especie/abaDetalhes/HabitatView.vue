<script setup lang="ts">
import { Especie } from '@/types';
import mundoUrl from '@/assets/continentes-atualizao.svg?raw' // Adicione ?url para importar como string
import { ref, onMounted, watch, nextTick } from 'vue';
import { Continentes } from '@/types/enums';
// ainda não está atualizando dinamicamente ao atualizar os continentes de uma especie
const props = defineProps<{
  especie: Especie
}>();

const contemIDentrePathSVG2EnumContinentes: Record<string, Continentes> = {
  'asia': Continentes.ASIA,
  'africa': Continentes.AFRICA,
  'america do sul': Continentes.AMERICA_DO_SUL,
  'america do norte': Continentes.AMERICA_DO_NORTE,
  'europa': Continentes.EUROPA,
  'oceania': Continentes.OCEANIA,
  'antartida': Continentes.ANTARTIDA
};

const continentes = [
  { id: 'asia' as Continentes, corPadrao: '#30B995', corHover: '#4caf50' },
  { id: 'africa' as Continentes, corPadrao: '#f77c3e', corHover: '#ff6b6b' },
  { id: 'america do sul' as Continentes, corPadrao: '#5b8823', corHover: '#af7f4c' },
  { id: 'america do norte' as Continentes, corPadrao: '#d6414a', corHover: '#7f4caf' },
  { id: 'europa' as Continentes, corPadrao: '#00447B', corHover: '#4c7faf' },
  { id: 'oceania' as Continentes, corPadrao: '#a0ffd8', corHover: '#4caf7f' },
  { id: 'antartida' as Continentes, corPadrao: '#90cbf9', corHover: '#af4caf' },
];

const svgMap = ref<HTMLObjectElement | null>(null);
const tooltip = document.createElement("div");

const gerarTooltip = () => {
      tooltip.style.position = "fixed";
      tooltip.style.backgroundColor = "black";
      tooltip.style.color = "white";
      tooltip.style.padding = "4px 8px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.pointerEvents = "none";
      tooltip.style.whiteSpace = "nowrap";
      tooltip.style.zIndex = "1000";
      tooltip.style.display = "none";
      document.body.appendChild(tooltip);
};

const colorirContinenteHabitado = () => {
  const svgDoc = svgMap.value?.contentDocument;
  if (!svgDoc) return;

  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            
  const especieContinentes = props.especie.continente_localizado
    .map(nome => normalize(contemIDentrePathSVG2EnumContinentes[nome] || nome));
  console.log("Especies", especieContinentes)
           
  continentes.forEach(continente => {
  const path = svgDoc.getElementById(continente.id);
  console.log("Continente path id:", path?.id)
  if (path) {
    const especieHabitaNoContinente = especieContinentes.includes(normalize(continente.id));
    console.log("path", path.id, "estaAtivo", especieHabitaNoContinente);

    path.style.fill = especieHabitaNoContinente ? continente.corPadrao : "#c1c1c1";
    path.style.cursor = especieHabitaNoContinente ?  "pointer" : "not-allowed";
  
    path.onmouseover = null
    path.onmouseout = null

    path.addEventListener('mouseover', () => {
      if (especieHabitaNoContinente) {
        path.style.fill = continente.corPadrao;
        path.style.opacity = "0.5";

        const rect = path.getBoundingClientRect();

        tooltip.textContent = `${props.especie.nome_cientifico} é originário da ${continente.id.replace(/-/g, " ")}`;
        tooltip.style.display = "block";
        tooltip.style.left = `${rect.left + rect.width }px`;   
        tooltip.style.top = `${rect.top + window.scrollY }px`; 
      }
    });

    path.addEventListener('mouseout', () => {
      if (especieHabitaNoContinente) {
        path.style.fill = continente.corPadrao;
        path.style.opacity = "1";
        tooltip.style.display = "none"; 

      }
    });

    }
  });
};
watch(
  ()=> props.especie.continente_localizado,
  async () => {
    await nextTick();
    colorirContinenteHabitado();
    tooltip.style.display = "none";
  }, { deep: true, immediate: true}
)

onMounted(() => {
  if (svgMap.value) {
    svgMap.value.addEventListener('load', () => {
      gerarTooltip();
      colorirContinenteHabitado();
    });
  }
});

</script>
<template>
  <div class="d-flex flex-column align-center">
    <div style="position: relative; width: 100%; max-width: 800px;">
      <object 
        :data="mundoUrl" 
        type="image/svg+xml"
        class="svg-interactive"
        style="width: 100%; height: auto;"
        ref="svgMap"
      ></object>
      
    </div>
  </div>
</template>
