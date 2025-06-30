import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import CurrencyList from '@/components/CurrencyList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useCurrencyListStore } from '@/stores/currency.ts'
import { CURRENCY_LIST } from '@/constants/currency.ts'

describe('CurrencyList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('handles currency selection and deselection in store', () => {
    const store = useCurrencyListStore()
    expect(store.selectedCurrencyList).toHaveLength(0)
    const selectedCurrency = CURRENCY_LIST[0]
    store.toggleSelected(selectedCurrency, true)
    expect(store.selectedCurrencyList).toHaveLength(1)
    expect(store.selectedCurrencyList[0]).toMatchObject({
      id: selectedCurrency.id,
      name: selectedCurrency.name,
    })
    expect(store.currencyList.filter((c) => c.isSelected)).toEqual([
      expect.objectContaining({ id: selectedCurrency.id }),
    ])
    store.toggleSelected(selectedCurrency, false)
    expect(store.selectedCurrencyList).toHaveLength(0)
    expect(store.currencyList.filter((c) => c.isSelected)).toHaveLength(0)
  })

  it('displays and hides selected currency in UI', async () => {
    const wrapper = mount(CurrencyList)
    const selectorCurrencySelected = '[data-testid="currency-selected"]'
    const el = wrapper.find('[data-testid="currency"]')

    await el.trigger('click')
    expect(wrapper.find(selectorCurrencySelected).exists()).toBe(true)
    expect(el.text()).toContain(wrapper.find(selectorCurrencySelected).text())
    await el.trigger('click')
    expect(wrapper.find(selectorCurrencySelected).exists()).toBe(false)

    await el.trigger('click')
    expect(wrapper.find(selectorCurrencySelected).exists()).toBe(true)
    await wrapper.find('[data-testid="currency-selected-cross"]').trigger('click')
    expect(wrapper.find(selectorCurrencySelected).exists()).toBe(false)
  })
})
