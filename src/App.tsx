import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { OAuthContextProvider } from './contexts/OAuthContext'

// Pages
import AccountSelection from './pages/AccountSelection'
import ReaderSignUp from './pages/ReaderSignUp'
import TimeLine from './pages/TimeLine'

const App: VFC = () => {
  return (
    <OAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountSelection />} />
          <Route path="/reader_signup" element={<ReaderSignUp />} />
          <Route path="/timeline" element={<TimeLine />} />
        </Routes>
      </BrowserRouter>
    </OAuthContextProvider>
  )
}

export default App
