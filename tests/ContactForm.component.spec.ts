import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContactForm from '@/components/ContactForm.vue'

describe('ContactForm', () => {
  it('shows an error summary and marks invalid fields on empty submit', async () => {
    const wrapper = mount(ContactForm, { attachTo: document.body })
    await wrapper.find('form').trigger('submit')

    const summary = wrapper.find('[role="alert"]')
    expect(summary.exists()).toBe(true)
    expect(summary.findAll('li')).toHaveLength(3)
    expect(wrapper.find('#f-name').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('#f-name').attributes('aria-describedby')).toBe('name-error')
    expect(document.activeElement).toBe(summary.element)
    wrapper.unmount()
  })

  it('associates every visible control with a label', () => {
    const wrapper = mount(ContactForm)
    wrapper.findAll('input:not([tabindex="-1"]), select, textarea').forEach((el) => {
      const id = el.attributes('id')
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
    })
  })

  it('pre-selects a service passed in from a service page', () => {
    const wrapper = mount(ContactForm, { props: { initialService: 'Asset Tracing' } })
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('Asset Tracing')
  })
})
