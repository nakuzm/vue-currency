<script setup lang="ts">
import { useCurrencyListStore } from '@/stores/currency.ts'

const store = useCurrencyListStore()
</script>

<template>
  <div class="box">
    <div class="grid">
      <div
        class="currency-selected"
        data-testid="currency-selected"
        v-for="currency in store.selectedCurrencyList"
        :key="currency.id"
      >
        {{ currency.name }}
        <span
          data-testid="currency-selected-cross"
          @click="store.toggleSelected(currency, false)"
          class="currency-selected__cross"
        ></span>
      </div>
    </div>
    <div class="grid">
      <div
        class="currency"
        data-testid="currency"
        v-for="currency in store.currencyList"
        :key="currency.id"
        :class="{ 'currency--checked': currency.isSelected }"
        @click="store.toggleSelected(currency, !currency.isSelected)"
      >
        <span class="currency__checkbox"></span><span>{{ currency.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  background-color: var(--vt-c-white);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 6px;
}

.currency-selected {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: var(--vt-c-grey-1);
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 15px;

  &__cross {
    display: inline-block;
    position: absolute;
    top: -5px;
    right: -5px;
    width: 16px;
    height: 16px;
    border: 2px solid var(--vt-c-white);
    border-radius: 20px;
    cursor: pointer;
    background: var(--vt-c-grey-3);
    box-sizing: content-box;

    &:before,
    &:after {
      position: absolute;
      left: 7px;
      top: 3px;
      content: ' ';
      height: 10px;
      width: 2px;
      background-color: var(--vt-c-white);
    }

    &:before {
      transform: rotate(35deg);
    }

    &:after {
      transform: rotate(-35deg);
    }

    &:hover {
      background: var(--vt-c-white);
      border-color: var(--vt-c-grey-3);

      &:before,
      &:after {
        background-color: var(--vt-c-grey-3);
      }
    }
  }
}

.currency {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 40px 0 4px;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  background: var(--vt-c-grey-1);
  cursor: pointer;

  &:hover {
    background: var(--vt-c-grey-2);
  }

  &--checked,
  &--checked:hover {
    background: var(--vt-c-white);
  }

  &__checkbox {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-sizing: content-box;
  }

  &--checked {
    .currency__checkbox {
      &:before,
      &:after {
        position: absolute;
        left: 6px;
        top: 1px;
        content: ' ';
        height: 11px;
        width: 2px;
        background-color: var(--vt-c-red);
      }

      &:before {
        transform: rotate(35deg);
      }

      &:after {
        transform: rotate(-35deg);
      }
    }
  }
}
</style>
