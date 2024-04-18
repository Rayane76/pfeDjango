import SideBarAdmin from "@/app/components/doctor/sideBarAdmin/SideBarAdmin"


export default function AdminLayout({ children }) {
    return <section>
    <SideBarAdmin />
    {children}
    </section>
  }