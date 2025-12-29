import { Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import ScheduleIcon from '@mui/icons-material/ScheduleOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import { StatCard } from './StatCard';

export function StatsRow({ totalReports, completed, processing, revenue, t }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          icon={<DescriptionIcon />}
          iconBgColor="#DBEAFE"
          iconColor="#155DFC"
          value={totalReports}
          label={t('stats.totalReports')}
        />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          icon={<CheckCircleIcon />}
          iconBgColor="#DCFCE7"
          iconColor="#00A63E"
          value={completed}
          label={t('stats.completed')}
        />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          icon={<ScheduleIcon />}
          iconBgColor="#FEF3C6"
          iconColor="#E17100"
          value={processing}
          label={t('stats.processing')}
        />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          icon={<AccountBalanceWalletIcon />}
          value={revenue}
          label={t('stats.totalRevenue')}
          variant="gradient"
        />
      </Grid>
    </Grid>
  );
}
