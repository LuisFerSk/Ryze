import { useState } from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
    Grid,
    Accordion as MaterialAccordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core'

import useStyles from '../../theme/useStylesAccordion'
const Accordion = ({ accordions, indexOpen }) => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(indexOpen >= 0 ? indexOpen : false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            {accordions.map((element, index) => (
                <MaterialAccordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${index}bh-content`}
                        id={`${index}bh-header`}
                    >
                        {element.icon}
                        <Typography className={classes.heading}>
                            {element.title}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {element.subtitle}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                {element.content}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </MaterialAccordion>
            ))}
        </>
    )
}

Accordion.prototype = {
    indexOpen: PropTypes.number,
    accordions: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Accordion;
