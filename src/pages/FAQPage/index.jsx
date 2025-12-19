import { useState } from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/layouts';

export const FAQPage = () => {
  const { t } = useTranslation('faq');
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const questions = t('questions', { returnObjects: true });

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('subtitle')}
        </Typography>

        <Box>
          {questions.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: theme =>
                  expanded === `panel${index}`
                    ? `0 4px 20px 0 ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`
                    : 'none',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: '8px !important',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </PageContainer>
  );
};

export default FAQPage;
