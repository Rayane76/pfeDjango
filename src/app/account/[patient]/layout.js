import SideBarAdmin from "@/app/components/doctor/sideBarAdmin/SideBarAdmin"


export default function AccountLayout({ children }) {
    return <section>
    <SideBarAdmin qrCodeSection={true} isAdmin={false} />
    {children}
    </section>
  }