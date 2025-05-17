<script setup lang="ts">
  import { Especie } from '@/types';
  import Mundo from '@/views/distribuicao/continenteSVG/world.svg'
  const props = defineProps<{
      especie: Especie
    }>();
</script>

<template>
  <Mundo/>
</template>
