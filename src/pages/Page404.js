import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { styled } from '@material-ui/core/styles'
import { Box, Button, Typography, Container } from '@material-ui/core'

import Page from '../components/Page'
import { MotionContainer, varBounceIn } from '../components/animate'

const RootStyle = styled(Page)(({ theme }) => ({
	display: 'flex',
	minHeight: '100%',
	alignItems: 'center',
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
}))

export default function Page404() {
	return (
		<RootStyle title='404 Pagina no encontrada | Ryze'>
			<Container>
				<MotionContainer initial='initial' open>
					<Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
						<motion.div variants={varBounceIn}>
							<Typography variant='h3' paragraph>
								¡Lo sentimos, no encontramos la pagina!
							</Typography>
						</motion.div>
						<Typography sx={{ color: 'text.secondary' }}>
							Lo sentimos, no hemos podido encontrar la página que estás buscando. ¿Tal vez has
							escrito mal la URL? Asegúrese de revisar su ortografía.
						</Typography>

						<motion.div variants={varBounceIn}>
							<Box
								component='img'
								src='/static/illustrations/illustration_404.svg'
								sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
							/>
						</motion.div>

						<Button to='/' size='large' variant='contained' component={Link}>
							Volver al inicio
						</Button>
					</Box>
				</MotionContainer>
			</Container>
		</RootStyle>
	)
}
