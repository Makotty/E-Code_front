import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// MUI
import { ThemeProvider } from '@mui/material'

// Contexts
import { AuthContextProvider } from '@contexts/AuthContext'
import { OAuthContextProvider } from '@contexts/OAuthContext'

// Pages
import AccountSelection from '@pages/AccountSelection'
import CorderLogin from '@pages/CorderLogIn'
import CorderSignUp from '@pages/CorderSignUp'
import ReaderLogin from '@pages/ReaderLogin'
import ReaderSignUp from '@pages/ReaderSignUp'
import TimeLine from '@pages/TimeLine'

// Styles
import theme from '@styles/theme'

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <OAuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AccountSelection />} />
              <Route path="/reader_signup" element={<ReaderSignUp />} />
              <Route path="/reader_login" element={<ReaderLogin />} />
              <Route path="/corder_signup" element={<CorderSignUp />} />
              <Route path="/corder_login" element={<CorderLogin />} />
              <Route path="/timeline" element={<TimeLine />} />
            </Routes>
          </BrowserRouter>
        </OAuthContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
