import {NextPageWithLayout} from "@/pages/_app";
import AdminPanelLayout from "@/app/components/adminPanelLayout";

const AdminPanel: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                Admin Dashboard
            </h1>
        </div>
    )
}

AdminPanel.getLayout = (page) => <AdminPanelLayout>{page}</AdminPanelLayout>

export default AdminPanel