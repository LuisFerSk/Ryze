import { Icon } from '@iconify/react';
import schoolIcon from '@iconify/icons-mdi/school';
// material
import { Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { CustomCard, IconWrapper } from '../../../theme/cards';

// ----------------------------------------------------------------------

const TOTAL = 714000;

const colorCard = 'warning';

const Card = CustomCard(colorCard);

const IconContainer = IconWrapper(colorCard);

export default function AppEstudiantesReportes() {
  return (
    <Card>
      <IconContainer>
        <Icon icon={schoolIcon} width={24} height={24} />
      </IconContainer>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Estudiantes
      </Typography>
    </Card>
  );
}
