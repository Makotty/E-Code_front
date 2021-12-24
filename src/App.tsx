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

import EpisodeList from '@pages/EpisodeList'
import EpisodeDetail from '@pages/EpisodeDetail'
import EpisodeCreate from '@pages/EpisodeCreate'
import EpisodeEdit from '@pages/EpisodeEdit'

// Styles
import theme from '@styles/theme'
import UserEpisodeList from '@pages/UserEpisodeList'

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
              <Route path="/episode_list" element={<EpisodeList />} />
              <Route path="/episode_list/:id" element={<EpisodeDetail />} />
              <Route path="/episode_create" element={<EpisodeCreate />} />
              <Route path="/episode_edit/:id" element={<EpisodeEdit />} />
              <Route path="/user/episodes" element={<UserEpisodeList />} />
            </Routes>
          </BrowserRouter>
        </OAuthContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
