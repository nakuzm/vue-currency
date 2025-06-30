import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Currency } from '@/types/currency.ts'
import { CURRENCY_LIST } from '@/constants/currency.ts'
import type { Ref } from 'vue'

export const useCurrencyListStore = defineStore('currencyList', () => {
  const currencyList: Ref<Currency[]> = ref(CURRENCY_LIST)

  const selectedCurrencyList: Ref<Currency[]> = ref([])

  function toggleSelected(selectedItem: Currency, isSelected: boolean) {
    currencyList.value = currencyList.value.map((item) =>
      item.id === selectedItem.id ? { ...item, isSelected } : item,
    )
    if (isSelected) {
      selectedCurrencyList.value.push({ ...selectedItem })
    } else {
      selectedCurrencyList.value = selectedCurrencyList.value.filter(
        (item) => item.id !== selectedItem.id,
      )
    }
  }

  return { currencyList, selectedCurrencyList, toggleSelected }
})
