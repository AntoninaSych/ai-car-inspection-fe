import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/layouts';

export const PrivacyPolicyPage = () => {
  const { t } = useTranslation('privacyPolicy');

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          {t('title')}
        </Typography>

        {/* 1. Introduction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.introduction.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.introduction.content')}
          </Typography>
        </Box>

        {/* 2. What Data We Collect */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.dataCollection.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.dataCollection.intro')}
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataCollection.items.identification')}</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataCollection.items.vehicle')}</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataCollection.items.visual')}</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataCollection.items.technical')}</Typography>
            </ListItem>
          </List>
        </Box>

        {/* 3. Legal Basis and Purposes */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.legalBasis.title')}
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme => theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    {t('sections.legalBasis.table.headers.purpose')}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    {t('sections.legalBasis.table.headers.legalBasis')}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    {t('sections.legalBasis.table.headers.explanation')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {t('sections.legalBasis.table.rows', { returnObjects: true }).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell>{row.legalBasis}</TableCell>
                    <TableCell>{row.explanation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* 4. Visual Data Processing */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.visualData.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.visualData.intro')}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{t('sections.visualData.anonymization').split(':')[0]}:</strong>{' '}
            {t('sections.visualData.anonymization').split(':').slice(1).join(':')}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{t('sections.visualData.aiTraining').split(':')[0]}:</strong>{' '}
            {t('sections.visualData.aiTraining').split(':').slice(1).join(':')}
          </Typography>
        </Box>

        {/* 5. Data Transfer */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.dataTransfer.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.dataTransfer.intro')}
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataTransfer.items.cloud')}</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataTransfer.items.partners')}</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <Typography variant="body1">{t('sections.dataTransfer.items.payment')}</Typography>
            </ListItem>
          </List>
        </Box>

        {/* 6. Data Retention */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.dataRetention.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.dataRetention.content')}
          </Typography>
        </Box>

        {/* 7. Your Rights */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.rights.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.rights.content')}
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};
