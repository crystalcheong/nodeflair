import { Navigate } from '@/router'

const IndexPage = () => {
  return (
    <Navigate
      to={'/interviews'}
      unstable_viewTransition
    />
  )
}
export default IndexPage
