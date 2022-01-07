import { Icon } from '@iconify/react'
import { Typography } from '@material-ui/core'
import briefcaseFill from '@iconify/icons-eva/briefcase-fill'

import { fShortenNumber } from '../../../utils/formatNumber'
import { CustomCard, IconWrapper } from '../../../theme/cards'

const TOTAL = 1723315;

const colorCard = 'success'

const Card = CustomCard(colorCard)

const IconContainer = IconWrapper(colorCard)

export default function AppUsuariosReportes() {
  return (
    <Card>
      <IconContainer>
        <Icon icon={briefcaseFill} width={24} height={24} />
      </IconContainer>
      <Typography variant='h3'>{fShortenNumber(TOTAL)}</Typography>
      <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
        Usuarios
      </Typography>
    </Card>
  )
}
