import type { ChangeEvent, ReactNode, VFC } from 'react'

// MUI
import { Button } from '@mui/material'

import UpLoadInput from './styled'

type FileUpProps = {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  disableElevation: boolean
}

const BaseUpLoadImgButton: VFC<FileUpProps> = (props) => {
  const { label, onChange, children, disableElevation } = props
  return (
    <label htmlFor={label}>
      <UpLoadInput
        type="file"
        accept=".jpg,.png,.svg"
        id={label}
        name={label}
        onChange={onChange}
      />

      <Button
        variant="contained"
        component="span"
        {...props}
        disableElevation={disableElevation}
      >
        {children}
      </Button>
    </label>
  )
}

export default BaseUpLoadImgButton
