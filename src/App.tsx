import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ReaderSignUp from './pages/ReaderSignUp'

import { OAuthContextProvider } from './contexts/OAuthContext'
import AccountSelection from './pages/AccountSelection'

const App: VFC = () => {
  return (
    <OAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountSelection />} />
          <Route path="/reader_signup" element={<ReaderSignUp />} />
        </Routes>
      </BrowserRouter>
    </OAuthContextProvider>
  )
}

export default App
