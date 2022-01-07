import { Icon } from '@iconify/react'
import { Typography } from '@material-ui/core'
import peopleFill from '@iconify/icons-eva/people-fill'

import { fShortenNumber } from '../../../utils/formatNumber'
import { CustomCard, IconWrapper } from '../../../theme/cards'


const AppReportes = ({ value, color }) => {
	const Card = CustomCard(color)
	const IconContainer = IconWrapper(color)

	return (
		<Card>
			<IconContainer>
				<Icon icon={peopleFill} width={24} height={24} />
			</IconContainer>
			<Typography variant='h3'>{fShortenNumber(value)}</Typography>
			<Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
				Grupos
			</Typography>
		</Card>
	)
}

export default AppReportes