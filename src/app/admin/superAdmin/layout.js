import SuperSideBar from "@/app/components/superAdmin/sideBar/SuperSideBar"


export default function AdminLayout({ children }) {
    return <section>
    <SuperSideBar qrCodeSection={false} isAdmin={false} />
    {children}
    </section>
  }