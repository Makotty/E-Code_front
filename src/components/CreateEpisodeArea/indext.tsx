import type { VFC, ChangeEventHandler } from 'react'
import EpisodeTextArea from './styled'

type CreateEpisodeAreaProps = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

const CreateEpisodeArea: VFC<CreateEpisodeAreaProps> = (props) => {
  const { onChange } = props

  return <EpisodeTextArea onChange={onChange} />
}

export default CreateEpisodeArea
