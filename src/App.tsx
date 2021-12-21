import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Contexts
import { OAuthContextProvider } from './contexts/OAuthContext'

// Pages
import AccountSelection from './pages/AccountSelection'
import ReaderLogin from './pages/ReaderLogin'
import ReaderSignUp from './pages/ReaderSignUp'
import TimeLine from './pages/TimeLine'

const App: VFC = () => {
  return (
    <OAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountSelection />} />
          <Route path="/reader_signup" element={<ReaderSignUp />} />
          <Route path="/reader_login" element={<ReaderLogin />} />
          <Route path="/timeline" element={<TimeLine />} />
        </Routes>
      </BrowserRouter>
    </OAuthContextProvider>
  )
}

export default App
