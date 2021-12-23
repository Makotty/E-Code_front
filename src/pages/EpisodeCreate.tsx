// React
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

import BaseLayout from '@components/BaseLayout'
import BaseInput from '@components/BaseInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { createEpisode } from '@lib/api/episode'
import { IFormValues } from '../types/FormValues'

const EpisodeCreate: VFC = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { episode } = data
    try {
      const response = await createEpisode({ content: episode })
      console.log(response)
      navigate('/episode_list')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <BaseLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.episode?.type === 'required' && <p>エピソードが入力されていません</p>}
        <BaseInput fieldLabel="Episode" label="episode" register={register} requiredFlag />
        <Button variant="contained" type="submit" disableElevation>
          投稿する
        </Button>
      </form>
    </BaseLayout>
  )
}

export default EpisodeCreate
