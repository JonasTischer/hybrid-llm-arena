import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { ContentLayout } from '@/components/admin-panel/content-layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
