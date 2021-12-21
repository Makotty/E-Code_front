import type { VFC } from 'react'
import SignUp from './pages/SignUp'

import { OAuthContextProvider } from './contexts/OAuthContext'

const App: VFC = () => {
  return (
    <OAuthContextProvider>
      <SignUp />
    </OAuthContextProvider>
  )
}

export default App
