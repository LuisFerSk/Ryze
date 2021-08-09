import { Icon } from '@iconify/react';
import openBookFill from '@iconify/icons-eva/book-open-fill';
// material
import { Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { CustomCard, IconWrapper } from '../../../theme/cards';

// ----------------------------------------------------------------------

const TOTAL = 1352831;

const colorCard = 'primary';

const Card = CustomCard(colorCard);

const IconContainer = IconWrapper(colorCard);

export default function AppFacultadesReportes() {
  return (
    <Card>
      <IconContainer>
        <Icon icon={openBookFill} width={24} height={24} />
      </IconContainer>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Facultades
      </Typography>
    </Card>
  );
}
