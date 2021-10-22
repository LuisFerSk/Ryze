import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../database/auth";

const useUser = (init) => {
    const [user, setUser] = useState(init);

    onAuthStateChanged(auth, (result) => {
        setUser(result);
    });

    return user;
}

export default useUser