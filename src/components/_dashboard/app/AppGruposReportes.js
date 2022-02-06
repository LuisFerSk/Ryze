import { Icon } from '@iconify/react'
import { Typography } from '@material-ui/core'
import peopleFill from '@iconify/icons-eva/people-fill'

import { fShortenNumber } from '../../../utils/formatNumber'
import { CustomCard, IconWrapper } from '../../../theme/cards'

const TOTAL = 234;

const colorCard = 'error'

const Card = CustomCard(colorCard)

const IconContainer = IconWrapper(colorCard)

export default function AppGruposReportes() {
    return (
        <Card>
            <IconContainer>
                <Icon icon={peopleFill} width={24} height={24} />
            </IconContainer>
            <Typography variant='h3'>{fShortenNumber(TOTAL)}</Typography>
            <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
                Grupos
            </Typography>
        </Card>
    )
}
