import { ReactNode } from 'react'
import Header from '~/components/Common/Header/Header'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      <main className="px-8 py-4">{children}</main>
    </>
  )
}
