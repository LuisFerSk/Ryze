import { useState } from "react";

import {
	Grid,
	Accordion,
	Typography,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "../../theme/accordion";

export default function PeriodoAcademico({ accordions }) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div >
			{accordions.map((element, index) => (
				<Accordion
					expanded={expanded === index}
					onChange={handleChange(index)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${index}bh-content`}
						id={`${index}bh-header`}
					>
						{element.icon}
						<Typography className={classes.heading}>{element.title}</Typography>
						<Typography className={classes.secondaryHeading}>
							{element.subtitle}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12} sm={12} lg={12}>
								<Typography>{element.content}</Typography>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};
