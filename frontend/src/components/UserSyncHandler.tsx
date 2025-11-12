import { baseURL } from "@/config/config";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserSyncHandler() {
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) return;
      try {
        const token = await getToken();
        const userData = {
          clerkId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName,
          photoURL: user?.imageUrl
        }
        await axios.post(`${baseURL}/users`, userData, { headers: { Authorization: `Bearer ${token}` } })
        setSynced(true);
      } catch (err) {
        const error = err as Error;
        toast.error(error.message)
      }
    }
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced])
  return null;
}

export default UserSyncHandler