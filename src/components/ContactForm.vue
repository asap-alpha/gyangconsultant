<script setup lang="ts">
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue'
import {
  emptyEnquiry,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from '@/composables/contactForm'
import { services } from '@/content/services'

const props = defineProps<{ initialService?: string }>()

const form = reactive<Enquiry>({ ...emptyEnquiry(), service: props.initialService ?? '' })
const errors = ref<EnquiryErrors>({})
const status = ref<'idle' | 'sending' | 'sent' | 'mail-client' | 'unavailable' | 'error'>('idle')
const summary = useTemplateRef<HTMLDivElement>('summary')

const errorList = computed(() =>
  (Object.entries(errors.value) as [keyof Enquiry, string][]).filter(([, msg]) => msg),
)

const describedBy = (field: keyof Enquiry, hint?: string) =>
  [hint, errors.value[field] ? `${field}-error` : null].filter(Boolean).join(' ') || undefined

function revalidate(field: keyof Enquiry) {
  // Only re-check fields that already show an error, so we don't nag while typing.
  if (!errors.value[field]) return
  const next = validateEnquiry(form)
  errors.value = { ...errors.value, [field]: next[field] }
}

async function onSubmit() {
  errors.value = validateEnquiry(form)
  if (errorList.value.length) {
    status.value = 'idle'
    await nextTick()
    summary.value?.focus()
    return
  }
  status.value = 'sending'
  try {
    status.value = await submitEnquiry(form)
    if (status.value === 'sent') Object.assign(form, emptyEnquiry())
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="onSubmit">
    <div
      v-if="errorList.length"
      ref="summary"
      class="contact-form__summary"
      role="alert"
      tabindex="-1"
    >
      <h2>Please correct the following</h2>
      <ul>
        <li v-for="[field, msg] in errorList" :key="field">
          <a :href="`#f-${field}`">{{ msg }}</a>
        </li>
      </ul>
    </div>

    <div class="contact-form__row">
      <div class="field">
        <label for="f-name">Full name <span aria-hidden="true">*</span></label>
        <input
          id="f-name"
          v-model="form.name"
          name="name"
          type="text"
          autocomplete="name"
          required
          :aria-invalid="!!errors.name"
          :aria-describedby="describedBy('name')"
          @input="revalidate('name')"
        />
        <p v-if="errors.name" id="name-error" class="field__error">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="f-organisation">Organisation</label>
        <input
          id="f-organisation"
          v-model="form.organisation"
          name="organisation"
          type="text"
          autocomplete="organization"
        />
      </div>
    </div>

    <div class="contact-form__row">
      <div class="field">
        <label for="f-email">Email address <span aria-hidden="true">*</span></label>
        <input
          id="f-email"
          v-model="form.email"
          name="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          required
          :aria-invalid="!!errors.email"
          :aria-describedby="describedBy('email')"
          @input="revalidate('email')"
        />
        <p v-if="errors.email" id="email-error" class="field__error">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label for="f-phone">Phone number</label>
        <input
          id="f-phone"
          v-model="form.phone"
          name="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          :aria-invalid="!!errors.phone"
          :aria-describedby="describedBy('phone')"
          @input="revalidate('phone')"
        />
        <p v-if="errors.phone" id="phone-error" class="field__error">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="field">
      <label for="f-service">Service of interest</label>
      <select id="f-service" v-model="form.service" name="service">
        <option value="">Not sure yet / general enquiry</option>
        <option v-for="s in services" :key="s.slug" :value="s.title">{{ s.title }}</option>
      </select>
    </div>

    <div class="field">
      <label for="f-message">How can we help? <span aria-hidden="true">*</span></label>
      <textarea
        id="f-message"
        v-model="form.message"
        name="message"
        rows="6"
        required
        :aria-invalid="!!errors.message"
        :aria-describedby="describedBy('message', 'message-hint')"
        @input="revalidate('message')"
      />
      <p id="message-hint" class="field__hint">
        Please share only a general outline. Sensitive details can be discussed in confidence once
        we are in contact.
      </p>
      <p v-if="errors.message" id="message-error" class="field__error">{{ errors.message }}</p>
    </div>

    <!-- Honeypot: hidden from people and assistive technology. -->
    <div class="contact-form__hp" aria-hidden="true">
      <label for="f-website">Leave this field empty</label>
      <input
        id="f-website"
        v-model="form.website"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <p class="field__hint"><span aria-hidden="true">*</span> Required field</p>

    <button type="submit" class="btn btn--dark" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Sending…' : 'Send enquiry' }}
    </button>

    <div class="contact-form__status" role="status" aria-live="polite">
      <p v-if="status === 'sent'" class="is-success">
        Thank you. Your enquiry has been received and we will be in touch shortly.
      </p>
      <p v-else-if="status === 'mail-client'" class="is-success">
        Your email app should now open with your enquiry pre-filled. Please press send to complete
        it.
      </p>
      <p v-else-if="status === 'unavailable'" class="is-error">
        Online enquiries are not yet available. Please contact us using the details on this page.
      </p>
      <p v-else-if="status === 'error'" class="is-error">
        Sorry, something went wrong sending your enquiry. Please try again, or contact us directly.
      </p>
    </div>
  </form>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: 1.25rem;
}

.contact-form__row {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
}

.field {
  display: grid;
  gap: 0.4rem;
}

label {
  font-weight: 600;
  font-size: var(--step--1);
  color: var(--navy-900);
}

input,
select,
textarea {
  width: 100%;
  min-height: 48px;
  padding: 0.7rem 0.9rem;
  font: inherit;
  color: var(--ink);
  background: var(--surface);
  border: 1.5px solid #8a96a5;
  border-radius: var(--radius);
}

textarea {
  resize: vertical;
  min-height: 150px;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  border-color: var(--navy-700);
  box-shadow: 0 0 0 3px rgb(29 58 120 / 0.25);
  border-radius: var(--radius);
}

[aria-invalid='true'] {
  border-color: #b42318;
}

.field__hint {
  margin: 0;
  font-size: var(--step--1);
  color: var(--ink-muted);
}

.field__error {
  margin: 0;
  font-size: var(--step--1);
  font-weight: 600;
  color: #b42318;
}

.contact-form__summary {
  padding: 1rem 1.25rem;
  border: 2px solid #b42318;
  border-radius: var(--radius);
  background: #fef3f2;
}

.contact-form__summary h2 {
  font-family: var(--font-sans);
  font-size: var(--step-0);
  color: #7a271a;
  margin-bottom: 0.4rem;
}

.contact-form__summary ul {
  padding-left: 1.2rem;
}

.contact-form__summary a {
  color: #b42318;
  font-weight: 600;
}

.contact-form__hp {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.contact-form .btn {
  justify-self: start;
}

.contact-form__status p {
  margin: 0;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius);
  font-weight: 550;
}

.is-success {
  background: #ecfdf3;
  color: #05603a;
  border: 1px solid #a6f4c5;
}

.is-error {
  background: #fef3f2;
  color: #912018;
  border: 1px solid #fecdca;
}
</style>
