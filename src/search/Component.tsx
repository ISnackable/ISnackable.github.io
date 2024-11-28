'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
// import { useDebounce } from '@/utilities/useDebounce'
// import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'

export const Search: React.FC = () => {
  const [value, setValue] = useQueryState('q', { shallow: false, throttleMs: 1000 })
  // const router = useRouter()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
