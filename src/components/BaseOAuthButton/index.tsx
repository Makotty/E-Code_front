import type { MouseEventHandler, VFC } from 'react'

// Styled
import { OAuthButton, SvgBox } from './styled'

type BaseOAuthButtonProps = {
  serviceAuth: MouseEventHandler<HTMLButtonElement>
  oAuthIcon: string
  oAuthAlt: string
}

const BaseOAuthButton: VFC<BaseOAuthButtonProps> = (props) => {
  const { serviceAuth, oAuthIcon, oAuthAlt } = props
  return (
    <OAuthButton variant="outlined" onClick={serviceAuth}>
      <SvgBox>
        <img src={oAuthIcon} alt={oAuthAlt} />
      </SvgBox>
    </OAuthButton>
  )
}

export default BaseOAuthButton
