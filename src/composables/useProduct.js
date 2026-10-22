import { computed, ref } from 'vue'

const product = ref('weft')

export function currentProduct() {
  return 'weft'
}

export function setProduct() {
  product.value = 'weft'
}

export function productHome() {
  return '/weft/people'
}

export function useProduct() {
  return {
    product,
    isWeftApp: computed(() => true),
  }
}
