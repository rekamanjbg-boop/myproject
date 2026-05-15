import { createHashRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell.jsx';
import { CueDetailPage } from '../pages/CueDetailPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { OperatorPage } from '../pages/OperatorPage.jsx';
import { PrompterPage } from '../pages/PrompterPage.jsx';
import { RehearsalPage } from '../pages/RehearsalPage.jsx';
import { SettingsPage } from '../pages/SettingsPage.jsx';
import { TimelinePage } from '../pages/TimelinePage.jsx';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'operator', element: <OperatorPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'cue/:cueId', element: <CueDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'rehearsal', element: <RehearsalPage /> },
    ],
  },
  { path: '/prompter', element: <PrompterPage /> },
]);
