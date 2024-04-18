import SideBarAdmin from "@/app/components/sideBarAdmin/SideBarAdmin"


export default function AdminLayout({ children }) {
    return <section>
    <SideBarAdmin />
    {children}
    </section>
  }