'use client'

import { logoutUserAction } from "@/lib/actions"

export default function LinkHeader() {
  return (
    <>
      <button onClick={() => {logoutUserAction()}}>logout</button>
    </>
  )
}