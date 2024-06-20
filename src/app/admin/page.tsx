import { COOKIE_ID } from "@/const/cookie";
import { ROUTES } from "@/const/route";
import { createClient } from "@/libs/hono"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AdminPage = async () => {
    const client = createClient()
    const res = await client.api.admin.me.$get({}, {
        headers: {
          Authorization: `Bearer ${cookies().get(COOKIE_ID.accessToken)?.value}`
        }
      })

    if (res.status !== 200) {
      const data = await res.json();
      alert(data.message)
      return redirect(ROUTES.adminLogin)
    }

    const {me} = await res.json();
    return (
        <>Hi, {me.name}!<br/>Your id is {me.userId}</>
    )
}

export default AdminPage