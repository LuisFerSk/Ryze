import { alpha, styled } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

export const CustomCard = (color) =>
  styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette[color].darker,
    backgroundColor: theme.palette[color].lighter
  }))

export const IconWrapper = (color) =>
  styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette[color].dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
      theme.palette[color].dark,
      0.24
    )} 100%)`
  }))
