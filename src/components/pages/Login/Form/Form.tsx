'use client'

import { ROUTES } from '@/const/route'
import { client } from '@/libs/hono'
import { useRouter } from 'next/navigation'
import { FormEventHandler } from 'react'

export const Form = () => {
  const router = useRouter()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      const form = new FormData(e.currentTarget)
      const email = (form.get('email') as string) || ''
      const password = (form.get('password') as string) || ''
      const res = await client.api.admin.login.$post({
        json: {
          email,
          password
        }
      })

      switch (res.status) {
        case 200: {
          const { message } = await res.json()
          alert(message)
          router.replace(ROUTES.admin)
          return
        }
        case 401: {
          alert('invalid email or password')
          return
        }
      }
    } catch (e) {
      alert('unexpected error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        email:
        <input type={'email'} name={'email'} defaultValue={''} />
      </label>
      <label>
        password:
        <input type={'password'} name={'password'} defaultValue={''} />
      </label>
      <button type={'submit'}>login</button>
    </form>
  )
}
